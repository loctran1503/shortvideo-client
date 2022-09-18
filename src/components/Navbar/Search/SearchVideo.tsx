import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { debounce } from "lodash";
import axios from "axios";
import { GetAllVideoResponse, VideoType } from "../../../utils/type";
import { GET_ALL_VIDEO } from "../../../utils/url";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const SearchVideo = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isSearching, setIsSearching] = useState(true);
  const [searchResult, setSearchResult] = useState<ReactNode>(null);
  const navigate = useNavigate();
  const searchDebounce = useRef(
    debounce((txtSearch) => handleSearchCallAPI(txtSearch), 300)
  ).current;

  useEffect(() => {
    if (isSearching) {
      setSearchResult(
        <div className={styles.loader}>
          <ClipLoader size={20} className={styles.loaderItem} />
        </div>
      );
    } else {
      if (videos.length > 0) {
        setSearchResult(
          <>
            {videos.map((item) => {
              return (
                <div
                  className={styles.resultItem}
                  key={item.videoId}
                  onClick={() => {
                    navigate(`/video/${item.videoId}`);
                    setIsSearchOpen(false);
                  }}
                >
                  <video src={item.url} />
                  <div className={styles.videoInfo}>
                    <h3>{item.title || ""}</h3>
                  </div>
                </div>
              );
            })}
          </>
        );
      } else {
        setSearchResult(
          <h4 className={styles.videoNotFound}>Không tìm thấy kết quả</h4>
        );
      }
    }
  }, [videos]);

  const handleSearchCallAPI = async (txtSearch: string) => {
    const result = await axios.post<GetAllVideoResponse>(GET_ALL_VIDEO, {
      skip: 0,
      search: txtSearch,
    });
    setIsSearching(false);
 
    if (result.data.success) {
      if (result.data.videos && result.data.videos.length > 0) {
        setVideos(result.data.videos);
        setTotalCount(result.data.totalCount || 0);
        console.log("has video")
      } else {
        console.log("no has video")
        setVideos([]);
        setTotalCount(0);
      }
    }
  };

  const navigateWithSearchParams = (name: string) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        search: name,
      }).toString(),
    });
    setIsSearchOpen(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setTotalCount(0)
    setSearchKeyword(e.target.value);
    searchDebounce(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className={styles.navbarIcon}
        onClick={() => {
          setIsSearchOpen(true);
        }}
      />
      {isSearchOpen && (
        <div className={styles.searchWrapper}>
          <div className="grid wide">
            <div className="row">
              <div className="col l-6 l-o-3 m-6 m-o-3 c-12">
                <div className={styles.searchContainer}>
                  <div className={styles.searchHeader}>
                    <div></div>
                    <h3>Trang tìm kiếm</h3>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={styles.closeIcon}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchKeyword("");
                        searchDebounce("");
                      }}
                    />
                  </div>
                  <div className={styles.searchBody}>
                    <input
                      type="text"
                      placeholder="Bạn muốn tìm video nào?"
                      className={styles.searchInput}
                      value={searchKeyword}
                      onChange={(e) => handleSearchInputChange(e)}
                    />
                    {searchKeyword.length > 2 && (
                      <div className={styles.searchResultContainer}>
                        {searchResult}
                        {totalCount > 0 && (
                          <div className={styles.seeAll} onClick={() =>{
                            navigateWithSearchParams(searchKeyword)
                          }}>
                            Xem tất cả {totalCount} kết quả
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchVideo;

{
  /* <div className={styles.searchResultContainer}>
                        {videos.length > 0 ? (
                          videos.map((item) => {
                            return (
                              <div
                                className={styles.resultItem}
                                key={item.videoId}
                                onClick={() =>{
                                  navigate(`/video/${item.videoId}`)
                                  setIsSearchOpen(false);
                                }}
                              >
                                <video src={item.url} />
                                <div className={styles.videoInfo}>
                                  <h3>{item.title || ""}</h3>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <h4 className={styles.videoNotFound}>
                            Không tìm thấy kết quả
                          </h4>
                        )}

                        {totalCount > 0 && (
                          <div className={styles.seeAll} onClick={() =>{
                            navigateWithSearchParams(searchKeyword)
                          }}>
                            Xem tất cả {totalCount} kết quả
                          </div>
                        )}
                      </div> */
}
