import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async () => {

    try {
      const responce = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
      toast.success(responce.data.message);
      setIsAuthorized(false); b
      navigateTo("/login")
    } catch (error) {
      toast.error(error.responce.data.message);
      setIsAuthorized(true);
    }
  }

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src='JobZee-logos__white.png' alt='Logo not found' />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>Home</Link>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>All Jobs</Link>
            <Link to={"/application/me"} onClick={() => setShow(false)}>
              {
                user && user.role =="Employer"
                ? "APPLICATION APPLICATIONS" : "MY APPLICATIONS"
              }
            </Link>
          </li>
          {
            user && user.role == "Employer" ?(
              <>
              <li>
                
              </li>
              </>
            ):<></>
          }
        </ul>
      </div>
    </nav>
  )
}
