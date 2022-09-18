import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "../../store/hooks";
import { dataSelector } from "../../store/reducers/dataSlice";
import { GetVideoResponse, IResponse } from "../../utils/type";
import { DELETE_VIDEO, DOWNLOAD_VIDEO, GET_VIDEO } from "../../utils/url";
import styles from "./styles.module.scss";
const VideoDetail = () => {
    Modal.setAppElement("#root")
  const { id } = useParams();
  const navigate = useNavigate();
  const [getVideo, setGetVideo] = useState<GetVideoResponse>({
    success: false,
    message: "",
    video: {
      videoId: "",
      title: "",
      url: "",
      downloadedCounting: 0,
      source: "",
      keyword: "",
      topics: [],
      createdAt: new Date(),
    },
  });
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
  const {isAdmin} = useAppSelector(dataSelector)
  useEffect(() => {
    if (id) {
      const getVideoDetail = async () => {
        try {
          const result = await axios.get<GetVideoResponse>(GET_VIDEO(id));
          if (result.data.success && result.data.video) {
            setGetVideo(result.data);
          } else {
            navigate("/notFound");
          }
        } catch (error) {
          console.log(error);
          navigate("/notFound");
        }
      };
      getVideoDetail();
    }
  }, []);

  const handleDownloadVideo = async () =>{
    try {
        const result = await axios.post<IResponse>(DOWNLOAD_VIDEO,{
            videoId:getVideo.video?.videoId
        })
        if(!result.data.success){
          
            toast.error(result.data.message)
        }
    } catch (error) {
        console.log(error)
    }
  }
  const handleDeleteVideo = async () =>{
    try {
        const result = await axios.post<IResponse>(DELETE_VIDEO,{
            video:getVideo.video
        })
        if(result.data.success) navigate("/")
        else{
            toast.error(result.data.message)
        }
    } catch (error) {
        toast.error(JSON.stringify(error))
        console.log(error)
    }
  }
  return (
    <div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-6 l-o-3 m-6 m-o-3 c-12">
            <div className={styles.wrapper}>
              {getVideo.video && (
                <div className={styles.container}>
                  <h3 className={styles.videoTitle}>{getVideo.video.title}</h3>
                 <a className={styles.videoSource} href={getVideo.video.source}>Xem nguồn</a>
                  <div className={styles.downloader} > 
                    <a href={getVideo.video.url}  onClick={() =>{handleDownloadVideo()}}>Tải video</a>
                  </div>
                  <video src={getVideo.video.url} controls>
                    <source src={getVideo.video.url} type="video/mp4" />
                  </video>
                  {isAdmin && <div className={styles.adminControl}>
                    <button className={styles.adminEditVideo} onClick={() =>{
                      navigate(`/070699/admin/edit-video/${getVideo.video?.videoId}`)
                    }}>Sửa</button>
                    <button className={styles.adminDeleteVideo} onClick={() =>setIsDeleteModalOpen(true)}>Xóa</button>
                  </div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500}/>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          },
          content: {
            top: "34%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "12px",
            padding: "8px",
          },
        }}
        contentLabel="Suggestion"
      >
        <div className={styles.adminDeleteModal}>

          <h3>Bạn thực sự muốn xóa video này?</h3>
          <span onClick={() => setIsDeleteModalOpen(false)}>Hủy</span>
          <button onClick={handleDeleteVideo}>Xóa</button>
        </div>
      </Modal>
    </div>
  );
};

export default VideoDetail;
