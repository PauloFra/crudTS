import React from 'react'
import pic from '../ListaUsers/pic.png'
import style from '../../CommunCss/tableList.module.css'
import { 
    IoMdMore,
    IoMdSearch,
    IoMdNotifications,
    IoMdFunnel,
    IoMdReturnLeft

} from "react-icons/io";

function SubHeader() {
  return (
    <div className={style.secondHeader}>
    <ul>
        <li><a href=""><IoMdSearch /></a></li>
        <li><a href=""><IoMdNotifications /></a></li>
    </ul>
    <div className={style.nameAndFoto}>
        <h5>Admin</h5>
        <a href=""><img src={pic} alt="" /></a>
    </div>
</div>)
}

export default SubHeader