import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { adminLoginAPI, dataSelector } from '../../../store/reducers/dataSlice';
import styles from './styles.module.scss';
const Login = () => {
    Modal.setAppElement("#root")
    const {isAdmin,isLoading} = useAppSelector(dataSelector);
    const [adminLogin,setAdminLogin] = useState('')
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    useEffect(() =>{
        if(!isLoading){
            if(isAdmin){
                navigate("/070699/admin/index")
            }
        }
    },[isAdmin,isLoading,navigate])
    

    const handleAdminLogin =async () =>{
     
        const result = await dispatch(adminLoginAPI(adminLogin))
     
        if((result.payload as any).success){
     
            navigate("/070699/admin/index")
        }
    }
  return (
    <div>
<Modal
        isOpen={true}
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
        contentLabel="login"
      >
        <div className={styles.loginContainer}>
            <input type="text" className='input-custom' value={adminLogin} onChange={(e) => setAdminLogin(e.target.value)} />
            <button className='btn-custom' onClick={handleAdminLogin}>Đăng nhập</button>
        </div>
      </Modal>
    </div>
  )
}

export default Login