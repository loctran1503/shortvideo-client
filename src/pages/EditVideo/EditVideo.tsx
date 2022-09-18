import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { GetVideoResponse, IResponse, VideoType } from '../../utils/type'
import { EDIT_VIDEO, GET_VIDEO } from '../../utils/url'
import styles from './styles.module.scss'
const EditVideo = () => {
    const [video,setVideo] = useState<VideoType>({
        videoId:"",
        title:"",
        url:"",
        downloadedCounting:0,
        source:"",
        keyword:"",
        topics:[],
        createdAt:new Date()
    })

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() =>{
        if(id){
            const getVideoDetail = async () => {
                try {
                  const result = await axios.get<GetVideoResponse>(GET_VIDEO(id));
                  if (result.data.success && result.data.video) {
                    setVideo(result.data.video);
                  } else {
                    toast.error(result.data.message)
                    console.log(result.data.message)
                  }
                } catch (error) {
                    toast.error(JSON.stringify(error))
                  console.log(error);
                    
                }
              };
              getVideoDetail();
        }
    },[])

    const handleEditVideo = async () =>{
        try {
            const result = await axios.post<IResponse>(EDIT_VIDEO,{
                video
            })
            console.log(result)
            if (result.data.success ) {
                navigate("/")
              } else {
                toast.error(result.data.message)
                console.log(result.data.message)
              }
        } catch (error) {
            toast.error(JSON.stringify(error))
                  console.log(error);
        }
    }
  return (
    <div>
        <div className="grid wide">
            <div className="row">
                <div className="col l-6 l-o-3 m-6 m-o-3 c-12">
                   {video.videoId.length>0 && <div className={styles.wrapper}>
                        <h3>Chỉnh sửa video</h3>
                        <label className="label-custom">Title</label>
                        <input type="text" className='input-custom' value={video.title} onChange={(e) => {
                            
                            setVideo({...video,title:e.target.value})
                        }}/>

                        <label className="label-custom">URL</label>
                        <input type="text" className='input-custom' value={video.url} onChange={(e) => {
                            setVideo({...video,url:e.target.value})
                        }}/>

                        <label className="label-custom">Source</label>
                        <input type="text" className='input-custom' value={video.source} onChange={(e) => {
                            setVideo({...video,source:e.target.value})
                        }}/>

                        <label className="label-custom">Keyword</label>
                        <input type="text" className='input-custom' value={video.keyword} onChange={(e) => {
                            setVideo({...video,keyword:e.target.value})
                        }}/>

                        <div className={styles.btnSubmit}>
                            <button onClick={handleEditVideo}>Sửa</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}




export default EditVideo