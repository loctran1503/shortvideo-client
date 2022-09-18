import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PAGE_SIZE, videoLoadingList } from "../../utils/constants";
import { GetAllVideoResponse } from "../../utils/type";
import { GET_ALL_VIDEO } from "../../utils/url";
import Pagination from "../Layouts/Pagination";
import styles from "./styles.module.scss";

const Video = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [getAllVideo, setGetAllVideo] = useState<GetAllVideoResponse>({
    success: false,
    message: "",
    videos: [],
    totalCount: 0,
  });
  const [topicParams, setTopicParams] = useSearchParams();
  const [isGettingVideo, setIsGettingVideo] = useState(true);
  const [videoResult, setVideoResult] = useState<ReactNode>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getAllVideo = async () => {
      try {
        setIsGettingVideo(true);
        let topicList: string[] = [];
        const topic = topicParams.get("topic");
        const search = topicParams.get("search");
        if (topic) topicList.push(topic);
        const result = await axios.post<GetAllVideoResponse>(GET_ALL_VIDEO, {
          skip: 0,
          topicList,
          search: search || undefined,
        });

        if (result.data.success) {
          setGetAllVideo(result.data);
        }
        setIsGettingVideo(false);
      } catch (error) {
        console.error(error);
        setIsGettingVideo(false);
      }
    };
    getAllVideo();
  }, [topicParams]);

  useEffect(() => {
    if (isGettingVideo) {
      setVideoResult(
        <>
          {videoLoadingList.map((item) => {
            return (
              <div className="col l-3 m-4 c-6">
                <Skeleton height={200} className={styles.loadingItem} />
              </div>
            );
          })}
        </>
      );
    } else {
      setVideoResult(
        <>
          {getAllVideo.videos && getAllVideo.videos.length > 0 ? (
            getAllVideo.videos.map((item, index) => {
              return (
                <div className="col l-3 m-4 c-12" key={index}>
                  <div className={styles.videoItem}>
                    <div className={styles.controls}>
                      <h3
                        className={styles.title}
                        onClick={() => {
                          navigate(`/video/${item.videoId}`);
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <video controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  </div>
                </div>
              );
            })
          ) : (
            <h4 className={styles.noVideo}>Chưa có video</h4>
          )}
        </>
      );
    }
  }, [isGettingVideo]);

  const handlePageChange = async (page: number) => {
    setIsGettingVideo(true);
    setCurrentPage(page);
    let topicList: string[] = [];
    const topic = topicParams.get("topic");
    const search = topicParams.get("search");
    if (topic) topicList.push(topic);
    const result = await axios.post<GetAllVideoResponse>(GET_ALL_VIDEO, {
      skip: PAGE_SIZE * (page - 1),
      topicList,
      search: search || undefined,
    });
    if (result.data.success && result.data.videos) {
      setGetAllVideo(result.data);
    }
    setIsGettingVideo(false);
  };
  return (
    <div className="grid wide">
      <div className="row">{videoResult}</div>
      <div className="row">
        <div className="col l-12 m-12 c-12">
          <div className={styles.pagination}>
            {getAllVideo.videos && getAllVideo.videos.length > 0 && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={getAllVideo.totalCount || 0}
                pageSize={PAGE_SIZE}
                onPageChange={(page: number) => handlePageChange(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Video);
