import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import "./Nav.css"

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate()

  const trasitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true)
    } else {
      handleShow(false)
    }
  }

  useEffect( () => {
    window.addEventListener("scroll", trasitionNavBar)
    return () => window.removeEventListener('scroll', trasitionNavBar)
  }, [] )

  return (
    <div className={`nav ${show && "nav__black"}`}>

      <div className='nav__contents'>
        <img 
        onClick={() => navigate("/")}
        className='nav__logo'
        src={require("./images/Netflix-logo.png")}
        alt=""
      />

        <img 
          onClick={() => navigate("/profile")}
          className='nav__avatar' 
          src={require("./images/Netflix-avatar.png")}
          alt=""
        />
      </div>

    </div>
  )
}

export default Nav