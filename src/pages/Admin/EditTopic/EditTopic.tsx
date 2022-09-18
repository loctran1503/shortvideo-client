import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { IResponse } from '../../../utils/type'
import { EDIT_TOPIC } from '../../../utils/url'
import styles from './styles.module.scss'

interface EditTopicProps{
    topicNameOld:string,
    topicNameNew:string
}
const EditTopic = () => {
    const [topicName,setTopicName] = useState<EditTopicProps>({
        topicNameOld:'',
        topicNameNew:''
    })
    const navigate = useNavigate()

    const handleEditTopic = async () =>{

        try {
            const result = await axios.post<IResponse>(EDIT_TOPIC,topicName)
            if(result.data.success) navigate("/070699/admin/index");
            else{
                toast.error(result.data.message)
            }
        } catch (error) {
            toast.error(JSON.stringify(error))
            console.error(error)
        }
    }
  return (
    <div>
        <div className="grid wide">
            <div className="row">
                <div className="col l-6 l-o-3 m-6 m-o-3 c-12">
                    <div className={styles.wrapper}>
                        <h2> Sửa Topic</h2>

                        <label className='label-custom'>Tên topic cũ</label>
                        <input type="text" className='input-custom' value={topicName.topicNameOld} onChange={(e) =>{
                            setTopicName({...topicName,topicNameOld:e.target.value})
                        }}/>

                        <label className='label-custom'>Tên topic mới</label>
                        <input type="text" className='input-custom' value={topicName.topicNameNew} onChange={(e) =>{
                            setTopicName({...topicName,topicNameNew:e.target.value})
                        }}/>
                        
                        <div className={styles.btnSubmit}>
                            <button onClick={handleEditTopic}>Sửa </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default EditTopic