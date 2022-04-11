import {useContext} from 'react'
import { Link } from 'react-router-dom';
import Foto from './Ellipse.png'

import style from './header.module.css';

import { AuthContext } from '../../context/AuthContext';
function Header() {
  const {handleLogout} = useContext<any>(AuthContext)
  
  const {isToken} = useContext<any>(AuthContext)
  return (
    <>
    {isToken &&
    <header>
      <div className={style.ulLogo}>
          <img src={Foto} alt="" />
          <Link to="">VemSer</Link>
       </div>
        <ul>
            <Link to={'/'}>
              <li>
                Home
              </li>
            </Link>
            <Link to={'/users'}>
              <li>
                Usuarios
              </li>
            </Link>
            {/* <Link to={'/users'}>
              <li>
                Lista de Usuarios
              </li>
            </Link> */}
            <Link to={'/list-address'}>
              <li>
                Endereço
              </li>
            </Link>
            {/* <Link to={'/list-address'}>
              <li>
                Lista de Endereços
              </li>
            </Link> */}
            <a href='#'>
            <li onClick={()=>handleLogout()} className={style.liLogout} >
               Deslogar
            </li>
            </a>
        </ul>
    </header>
    }
    </>
  )
}

export default Header