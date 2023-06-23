import React from 'react'
import { logoutUser } from '../../services/authServices'
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { SET_LOGIN,selectName } from '../../redux/features/auth/authSlice'


const Header = () => {
 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const name=useSelector(selectName);

  const logout=async ()=> {
    await logoutUser();
    await dispatch(SET_LOGIN(false))
           
    navigate("/login")
  }

  return (
    <div className="--pad header">
      <div className='--flex-between'>
         <h3>
            <span className='--fw-thin'>Welcome to , </span>
            <span className='--color-danger'>Banaras Locomotive Works, Mr. {name}</span>
            
         </h3>
         <button onClick={logout} className='--btn --btn-danger'>Logout</button>
      </div>  
      <hr/>
    </div>
  )
}

export default Header
