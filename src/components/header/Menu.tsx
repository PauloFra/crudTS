import React from 'react'
import { Link } from 'react-router-dom'
import { useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'

function Menu() {
    const {handleLogout} = useContext<any>(AuthContext)
   
    
   
  return (
   <></>
  )
}

export default Menu