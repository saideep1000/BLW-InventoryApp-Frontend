import React, { useState } from 'react'
import "./Sidebar.scss"
import {RiMenu5Fill} from "react-icons/ri"
import {MdOutlineProductionQuantityLimits} from "react-icons/md"
import menu from '../../data/sidebar'
import SidebarItem from './SidebarItem'
import { useNavigate } from "react-router-dom"

const Sidebar = ({children}) => {

    const navigate=useNavigate()
    const [isOpen,setIsOpen]=useState(true);
    const toggle=()=>{setIsOpen(!isOpen)}

    const goHome=()=>{
      navigate("/")
    }
  return (
    <div className='layout'>
       <div className='sidebar' style={{width: isOpen? "230px":"60px"}}>
          
           <div className="top_section">
               <div className='logo' style={{ display: isOpen? "block":"none" }}>
               <MdOutlineProductionQuantityLimits size={35} style={{cursor:"pointer"}} onClick={goHome} />
                </div>
                <div className='bars' style={{cursor:'pointer',marginLeft:isOpen?"100px":"0px"}}>
                <RiMenu5Fill size={32} onClick={toggle}/>
                </div>
               
             </div>
             {menu.map((item,index)=>{
                    return <SidebarItem key={index} item={item} isOpen={isOpen}/>
                })}
       </div>
       <main style={{paddingLeft: isOpen?"230px":"60px",transition:"all .5s"}}>
           {children}
       </main>
    </div>
  )
}

export default Sidebar
