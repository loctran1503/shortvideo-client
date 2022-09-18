import {
  faHouse, faXmark
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../../assets/logo192.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { dataSelector, setTopicActived } from "../../store/reducers/dataSlice";
import { CreateSuggest, IResponse } from "../../utils/type";
import { CREATE_SUGGEST } from "../../utils/url";
import SearchVideo from "./Search/SearchVideo";
import styles from "./styles.module.scss";
const Navbar = () => {
  Modal.setAppElement("#root");
const navigate = useNavigate()
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const [createSuggest, setCreateSuggest] = useState<CreateSuggest>({
    link: "",
    email: "",
  });
  const { topics,topicActied,isAdmin } = useAppSelector(dataSelector);
  const [searchParams,setSeatchParams] = useSearchParams()
  const dispatch = useAppDispatch()


  useEffect(() =>{
    const topic = searchParams.get('topic');
    if(topic){
      dispatch(setTopicActived(topic))
    }
  },[searchParams,dispatch])



  const openSuggestModal = () => {
    setIsSuggestModalOpen(true);
  };

  const createSuggestRequest = async () => {
    if (createSuggest.link.length < 5) {
      setCreateSuggest({
        ...createSuggest,
        error: "Vui lòng nhập link hợp lệ",
      });
    } else {
      const result = await axios.post<IResponse>(CREATE_SUGGEST, createSuggest);
      if (result.data.success) {
        toast.info(result.data.message);
        setIsSuggestModalOpen(false);
      } else {
        setCreateSuggest({ ...createSuggest, error: result.data.message });
      }
    }
  };

  const navigateWithSearchParams = (name: string) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        topic: name
      }).toString()
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className="grid wide">
          <div className="row">
            <div className="col l-12 m-12 c-12">
              <div className={styles.navbar}>
                <img src={logo} alt="" />
                <div className={styles.navbarCenter}>
                <FontAwesomeIcon icon={faHouse} className={styles.navbarIcon} onClick={() =>{
                        navigate("/")
                        dispatch(setTopicActived("Tất cả"))
                      }}/>
                <SearchVideo/>
                    {isAdmin && <button onClick={() =>navigate("/070699/admin/index")} className={styles.toAdmin}>Admin</button>}
                
                </div>
                <div>
                <h3
                  className={clsx(styles.navbarLeftText, styles.suggestion)}
                  onClick={openSuggestModal}
                >
                  Đề xuất
                </h3>
                </div>
                
                
              </div>
            </div>
           
            {/* <div className="col l-2 m-2 c-2"></div> */}
          </div>
        </div>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className={styles.categoryContainer}>
              <Swiper spaceBetween={20} slidesPerView={8}>
              <SwiperSlide  >
                      <p className={clsx(topicActied==="Tất cả" ? styles.textCategoryActived : styles.textCategory)} onClick={() =>{
                        navigate("/")
                        dispatch(setTopicActived("Tất cả"))
                      }}>Tất cả</p>
                    </SwiperSlide>
                {topics.map((item, index) => {
                  return (
                    <SwiperSlide key={index} >
                      <p className={clsx(topicActied===item.name ?styles.textCategoryActived :styles.textCategory )} onClick={() =>{
                        
                        navigateWithSearchParams(item.name)
                      }}>{item.name}</p>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isSuggestModalOpen}
        onRequestClose={() => setIsSuggestModalOpen(false)}
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
        <div className={styles.suggestModal}>
          <div className={styles.suggestModalHeader}>
            <FontAwesomeIcon
              icon={faXmark}
              className={styles.closeIcon}
              onClick={() => setIsSuggestModalOpen(false)}
            />
          </div>
          {createSuggest.error && <h2>{createSuggest.error}</h2>}
          <label className="label-custom">Đường link dẫn đến video</label>
          <input
            type="text"
            className="input-custom"
            value={createSuggest.link}
            onChange={(e) => {
              setCreateSuggest({
                ...createSuggest,
                link: e.target.value,
                error: "",
              });
            }}
          />
          <label className="label-custom">
            Email nhận thông báo khi video đã được đăng(có thể để trống)
          </label>
          <input
            type="text"
            className="input-custom"
            value={createSuggest.email}
            onChange={(e) => {
              setCreateSuggest({
                ...createSuggest,
                email: e.target.value,
                error: "",
              });
            }}
          />
          <div style={{ textAlign: "center" }}>
            <button
              className="btn-custom"
              style={{ marginTop: 20 }}
              onClick={createSuggestRequest}
            >
              Đề xuất
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Navbar;
