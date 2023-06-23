import React, { useEffect } from 'react'
import {MdOutlineInventory} from "react-icons/md"
import { Link } from 'react-router-dom'
import "./Home.scss";
import invImg from "../../assets/vii.jpg"
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/hiddenLink';
// import { useDispatch } from 'react-redux';
// import { useSelector } from "react-redux";
// import { SET_LOGIN, selectIsLoggedIn } from "../../redux/features/auth/authSlice";
const NumberText=({num,text})=>{
    
    return (
        <div className='--mr'>
            <h3 className='--color-white'>{num}</h3>
            <p className='--color-white'>{text}</p>
        </div>
    )
};
const Home = () => {

//     const dispatch=useDispatch();
//     // const isLoggedIn=useSelector(selectIsLoggedIn)
//     // console.log(isLoggedIn)
  
//    useEffect(()=>{
//     const set=async () =>{
//         dispatch(SET_LOGIN(false));
//     }
//     set();
//    },[dispatch])
  return (
    <div className='home'>
         <nav className='container --flex-between'>
            <div className='logo'>
                <MdOutlineInventory size={41}/>
            </div>
            <ul className='home-links'>
            <ShowOnLogout>
                    <li>
                    <button className='--btn --btn-primary'>
                          <Link to="/register">Register!!..</Link>
                    </button>
                    </li>
          </ShowOnLogout>        
          <ShowOnLogout>
                    <li>
                      <button className='--btn --btn-primary'>
                          <Link to="/login">Login...!!</Link>
                          </button>
                    </li>
         </ShowOnLogout>
         <ShowOnLogin>
                    <li>
                      <button className='--btn --btn-primary'>
                          <Link to="/dashboard">Dashboard Menu</Link>
                          </button>
                    </li>
        </ShowOnLogin>          
            </ul>
         </nav>
         <section className="container hero">
            <div className='hero-text'>
                <h2>B.L.W. Inventory {"&"} Stock App</h2>
                <p>A way to manage and control products in the warehouse in real time and to make scrapping of items easier inorder to ease and smoothen the business work at B.L.W.</p>
                <div className='hero-buttons'>
            <button className='--btn --btn-secondary'>
                <Link to ="/dashboard">Free subscription-10 days</Link>
            </button>
            </div>
            <div className='--flex-start'>
                <NumberText num="10+" text='Open source contributers'/>
                <NumberText num="10K" text="Active Users"/>
                <NumberText num="50+" text="A+ ratings"/>
            </div>
            </div>
            
            <div className='hero-image'>
                <img src={invImg} alt="Inventory-App"/>
            </div>
         </section>
    '</div>
  )
}

export default Home;