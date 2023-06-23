import React ,{useEffect} from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authServices';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        const redirectLoggedOutUser=async () =>{
        let isLoggedIn=await getLoginStatus()
        
       
        dispatch(SET_LOGIN(isLoggedIn))

        if(!isLoggedIn)
        {
            toast.info("Session expired,please login to continue.")
            navigate(path)
            return ;
        }
         }
         redirectLoggedOutUser()
    },[navigate,path,dispatch]);
     
}

export default useRedirectLoggedOutUser




