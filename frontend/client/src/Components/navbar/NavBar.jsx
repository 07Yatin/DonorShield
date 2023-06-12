import React from 'react'
// import { Link } from 'react-router-dom'
import "./navfoot.css"
import logo from "../img/logo.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
// import Project from "./Project"
// import './navbars'

export default function NavBar() {
  return (
    <nav className="nav1">
         <div className="nav-brand">
                <img src={logo}  alt="/" />
        </div>
  
        <ul className='nav-items'>
            <li className='nav-li'><Link className='Link' to='/'>Home</Link> </li>
            <li className='nav-li'> <Link className='Link' to='/project'>Charity project</Link></li>
            <li className='nav-li'>Register as &nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                    <div className="dropdown-menu">
                      <ul>
                        {/* <li><Link className='Link' to='/admindash'>Admin</Link></li> */}
                        <li><Link className='Link' to='/bensignup'>Beneficiary</Link></li>
                        {/* <li><Link className='Link' to='/donarlog'>Donar</Link></li>
                         */}
                        <li><Link className='Link' to='/Donorsignup'>Donar</Link></li>

                      </ul>
                    </div>
            
            </li>
            <li className='nav-li'><Link className='Link' to='/campaign'>Campaign</Link></li>
            <li className='nav-li'><Link className='Link' to='/contact'>Contact-us</Link> </li>
        </ul>
        <div class="social text-gray">
            <i class="fa fa-facebook"></i>
            <i class="fa fa-instagram"></i>
            <i class="fa fa-twitter"></i>
            <i class="fa fa-youtube-play"></i>
        </div>
        
    </nav>
  )
}
