import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAppSelector } from "../../../store/hooks";
import { dataSelector } from "../../../store/reducers/dataSlice";
import { CreateVideo, IResponse, Topic } from "../../../utils/type";
import { CREATE_VIDEO } from "../../../utils/url";
import styles from "./styles.module.scss";
const AddVideo = () => {
  const [video, setVideo] = useState<CreateVideo>({
    topicList: [],
    url: "",
    keyword: "",
    source:"",
    title:""
  });
  const { topics } = useAppSelector(dataSelector);

  const navigate = useNavigate();
  const handleCreateVideo = async () => {
    try {
      switch (true) {
        case video.topicList.length < 1:
          {
            toast.error("Chưa có topic");
          }
          break;
        case video.url.length < 1:
          {
            toast.error("URL không hợp lệ");
          }
          break;
        case video.keyword.length < 1:
          {
            toast.error("Keyword không hợp lệ");
          }
          break;

        default: {
          const result = await axios.post<IResponse>(CREATE_VIDEO, video);
          console.log(result.data);
          if (result.data.success) {
            navigate("/070699/admin/index");
          }
        }
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const handleAddTopicToVideo = (item: Topic) => {
    const temp = video.topicList.map((item) => item);
    temp.push(item);
    setVideo({ ...video, topicList: temp });
  };

  const handleRemoveTopicFromVideo = (topic: Topic) => {
    const temp = video.topicList.filter(
      (item) => item.topicId !== topic.topicId
    );
    setVideo({ ...video, topicList: temp });
  };
  return (
    <div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-6 l-o-3 m-6 m-o-3 c-12">
            <div className={styles.container}>
              <h2>Thêm VIDEO</h2>

              <div className={styles.topic}>
                <h3>Danh sách topic</h3>
                <div className={styles.topicList}>
                  {topics.map((item) => {
                    return (
                      <p
                        className={styles.topicItem}
                        key={item.topicId}
                        onClick={() => {
                          handleAddTopicToVideo(item);
                        }}
                      >
                        {item.name}
                      </p>
                    );
                  })}
                </div>
                <h3>Topic đã chọn</h3>
                <div className={styles.topicSelectedList}>
                  {video.topicList.length > 0 &&
                    video.topicList.map((item) => {
                      return (
                        <p
                          className={styles.topicSelectedItem}
                          key={item.topicId}
                        >
                          {item.name}
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className={styles.removeIcon}
                            onClick={() => {
                              handleRemoveTopicFromVideo(item);
                            }}
                          />
                        </p>
                      );
                    })}
                </div>
              </div>

              <label className="label-custom">URL </label>
              <input
                type="text"
                className="input-custom"
                value={video.url}
                onChange={(e) => {
                  setVideo({
                    ...video,
                    url: e.target.value,
                  });
                }}
              />

              <label className="label-custom">Keyword </label>
              <input
                type="text"
                className="input-custom"
                value={video.keyword}
                onChange={(e) => {
                  setVideo({ ...video, keyword: e.target.value });
                }}
              />

              <label className="label-custom">Source </label>
              <input
                type="text"
                className="input-custom"
                value={video.source}
                onChange={(e) => {
                  setVideo({ ...video, source: e.target.value });
                }}
              />

              <label className="label-custom">Tên video </label>
              <input
                type="text"
                className="input-custom"
                value={video.title}
                onChange={(e) => {
                  setVideo({ ...video, title: e.target.value });
                }}
              />

              <div className={styles.btn}>
                <button className="btn-custom" onClick={handleCreateVideo}>
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default AddVideo;
