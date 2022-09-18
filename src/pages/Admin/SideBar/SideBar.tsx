import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { dataSelector } from "../../../store/reducers/dataSlice";
import styles from "./styles.module.scss";
interface SideBarProps {
  title: string;
  navigate: string;
  counting?: number;
}

const sidebarList: SideBarProps[] = [

  {
    title:"Xem lượt tải",
    navigate:'/070699/admin/get-all-video'
  },
  {
    title: "Thêm topic",
    navigate: "/070699/admin/add-topic",
  },
  {
    title: "Thêm video",
    navigate: "/070699/admin/add-video",
  },
  {title:"Sửa Topic",
  navigate:'/070699/admin/edit-topic'
  }
  
];

const SideBar = () => {
  const { suggestCount } = useAppSelector(dataSelector);
  const navigate = useNavigate();
  
  return (
    <div>
      <div className={styles.container}>
        <div
          className={styles.item}
        >
          <h3 className={styles.title}>Đề xuất 
          {suggestCount>0 && <span>{suggestCount}</span>}
          </h3>

        </div>
        {sidebarList.map((item) => {
          return (
            <div
              className={styles.item}
              key={item.title}
              onClick={() => {
                navigate(item.navigate);
              }}
            >
              <h3 className={styles.title}>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
