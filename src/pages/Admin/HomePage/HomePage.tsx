import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import { useAppDispatch } from "../../../store/hooks";
import { setSuggestCount } from "../../../store/reducers/dataSlice";
import { GetAllSuggestResponse, IResponse, Suggest } from "../../../utils/type";
import { DELETE_SUGGEST, GET_ALL_SUGGEST } from "../../../utils/url";
import SideBar from "../SideBar/SideBar";
import styles from "./styles.module.scss";

const HomePage = () => {
  const [suggestList, setSuggestList] = useState<Suggest[]>([]);
  const dispatch = useAppDispatch()
  useEffect(() => {
    const getAllSuggest = async () => {
      const result = await axios.post<GetAllSuggestResponse>(GET_ALL_SUGGEST);
      if (result.data.suggestList && result.data.suggestList.length > 0) {
        setSuggestList(result.data.suggestList);
      }
    };
    getAllSuggest();
  }, []);

  const handleDeleteSuggest = async (suggest: Suggest) => {
    try {
      const result = await axios.post<IResponse>(DELETE_SUGGEST, {
        suggest: suggest,
      });

      if (result.data.success) {
        const temp: Suggest[] = suggestList.filter(
          (item) => item.suggestId !== suggest.suggestId
        );
        toast.success(result.data.message)
        dispatch(setSuggestCount(0))
        setSuggestList(temp);
      }
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div >
      <div className="grid wide">
        <div className="row">
          <div className="col l-3 m-3 c-4">
            <SideBar />
          </div>
          <div className="col l-9 m-9 c-8">
            <h2 className={styles.suggestTitle}>Danh sách đề xuất</h2>
            <table className={styles.customers}>
              <thead>
              <tr>
                <th>Index</th>
                <th>Link</th>
                <th>Email</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
                {suggestList.length > 0 &&
                  suggestList.map((item, index) => {
                    return (
                      <tr key={item.suggestId}>
                        <td>{index + 1}</td>
                        <td>{item.link}</td>
                        <td>{item.email || ""}</td>
                        <td>
                          <span
                            onClick={() => {
                              handleDeleteSuggest(item);
                            }}
                          >
                            Xóa
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
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

export default HomePage;
