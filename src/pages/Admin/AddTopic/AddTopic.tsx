import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { IResponse } from '../../../utils/type'
import { CREATE_TOPIC } from '../../../utils/url'
import styles from './styles.module.scss'
const AddTopic = () => {
    const [topicName,setTopicName] = useState('')
    const navigate = useNavigate()
    const handleCreateTopic =async () =>{
        try {
            const result = await axios.post<IResponse>(CREATE_TOPIC,{
                name:topicName
            })
            if(result.data.success){
                toast.success(result.data.message)
                navigate('/070699/admin/index')
            }else{
                toast.error(result.data.message)
     
            }
        } catch (error) {
            console.log(error)
            toast.error(JSON.stringify(error))
        }
    }
  return (
    <div>
        <div className="grid wide">
            <div className="row">
                <div className="col l-6 l-o-3 m-6 m-o-3 c-12">
                    <div className={styles.container}>
                    <h2>Thêm TOPIC</h2>
                    <label className='label-custom'>Tên topic </label>
                    <input type="text" className='input-custom' value={topicName} onChange={(e) => {
                        setTopicName(e.target.value)
                    }} />

                    <div className={styles.btn}>
                    <button className='btn-custom' onClick={handleCreateTopic}>Thêm</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer
        autoClose={2000}/>
    </div>
  )
}

export default AddTopic