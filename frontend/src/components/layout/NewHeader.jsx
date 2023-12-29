import React, { useState } from "react";
import "../Header.css";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import logo from "../../assets/KlimArt Logo - Horizontal Lockup.png";
import logomob from "../../assets/KlimArt Logo - Horizontal Lockup_white.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function NewHeader(props) {

  const [toggle, setToggle]= useState(false)
  console.log(toggle)
  return (
    <>
      <div className="header">
        <Link to="/">
          <LazyLoadImage className="header__logo" src={logo} alt="KlimArt-logo" />
          <div className="motto">Architecture • Urbanism • Interiors</div>
        </Link>
        <div className="navbar">
          <Link to="/About">
            <div className="header__option">About</div>
          </Link>
          <Link to="/Projects">
            <div className="header__option">Projects</div>
          </Link>
          <Link to="/Matter">
            <div className="header__option">
              Matter<span>i</span>
            </div>
          </Link>
          <Link to="/Contact">
            <div className="header__option">Contact</div>
          </Link>
          <Link to="/Careers">
            <div className="header__option">Careers</div>
          </Link>

          {/* <Link to="/Get__in__touch"> */}
          <div
            className="button"
            id="getintouch"
            onClick={() => props.PopUp(true)}
          >
            Get In Touch
          </div>
          {/* </Link> */}
        </div>
      </div>
      <div className="mobileheader">
        <LazyLoadImage className="header__logo_mob" src={logo} alt="KlimArt-logo" />
        <div className="motto_mob">Architecture • Urbanism • Interiors</div>
        <nav role="navigation">
          <div id="menuToggle" >
            <input type="checkbox" onClick={()=>setToggle(!toggle)}/>
            <span></span>
            <span></span>
            <span></span>
            <ul id={toggle?"menutrue":"menu"}>
              <LazyLoadImage id="logomob" src={logomob} alt="KlimArt-logo" />
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="About">
                <li>About</li>
              </Link>
              <Link to="Projects">
                <li>Projects</li>
              </Link>
              <Link to="Matter">
                <li>Matter</li><span style={{color:"red"}}>i</span>
              </Link>
              <Link to="Contact">
                <li>Contact</li>
              </Link>
              <Link to="Careers">
                <li>Careers </li>
              </Link>
              <div
                className="button"
                id="getintouchmob"
                onClick={() => props.PopUp(true)}
              >
                Get In Touch 
              </div>
              <div className="redlinesep"></div>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NewHeader;
