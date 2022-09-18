import axios from "axios";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "../../../components/Layouts/Pagination";

import { PAGE_SIZE } from "../../../utils/constants";
import {  GetAllVideoResponse } from "../../../utils/type";
import { ADMIN_GET_ALL_VIDEO } from "../../../utils/url";
import styles from "./styles.module.scss";
const VideoCounting = () => {
  const [getVideo, setGetVideo] = useState<GetAllVideoResponse>({
    success: false,
    message: "",
    videos: [],
    totalCount: 0,
    hasMore: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const getAllVideoAPI = async () => {
      try {
        const result = await axios.post<GetAllVideoResponse>(
          ADMIN_GET_ALL_VIDEO,
          {
            skip: 0,
          }
        );
        if (result.data.success && result.data.videos) {
          setGetVideo(result.data);
        }else{
          toast.error(result.data.message)
        }
      } catch (error) {
        toast.error(JSON.stringify(error))
      }
    };

    getAllVideoAPI();
  }, []);

  const handlePageChange = async (page:number) =>{
    try {
      setCurrentPage(page);
      const result =await axios.post<GetAllVideoResponse>(ADMIN_GET_ALL_VIDEO,{
        skip: PAGE_SIZE * (page - 1)
      })
      if (result.data.success && result.data.videos) {
        setGetVideo(result.data);
      }else{
        toast.error(result.data.message)
      }
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  return (
    <div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className={styles.wrapper}>
              <h2>Xem lượt tải</h2>
              <table className={styles.customers}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên video</th>
                    <th>Video</th>
                    <th>Số lượt tải</th>
                  </tr>
                </thead>
                <tbody>
                  {getVideo.videos &&
                    getVideo.videos.map((item,index) => {
                      return <tr key={item.videoId}>
                        <td>{index}</td>
                        <td>{item.title}</td>
                        <td>
                          <video src={item.url} controls>
                            <source src={item.url}  type="video/mp4" />
                          </video>
                        </td>
                        <td>{item.downloadedCounting}</td>
                      </tr>;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>

      <div className={styles.pagination}>
      <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={getVideo.totalCount || 0}
                pageSize={PAGE_SIZE}
                onPageChange={(page: number) => handlePageChange(page)}
              />
      </div>
    </div>
  );
};

export default VideoCounting;
