import React from "react";
import { Link } from "react-router-dom";
import "../Footer.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import logo from "../../assets/KlimArt Logo - Horizontal Lockup.png";

function NewFooter() {
  return (
    <div id="Footer">
      <img src={logo} alt="logo" id="logo" />
      <p id="footermotto">Designing climate inspired spaces.</p>
      <div id="footerright">
        <div id="links">
          <ul id="linkslist">
            <p className="footertitle">&nbsp;Links</p>
            <Link to="/About">
              <li>About</li>
            </Link>
            <Link to="/Projects">
              <li>Projects</li>
            </Link>
            <Link to="/Matter">
              <li>Matter</li>
            </Link>
          </ul>
        </div>
        <div id="socials">
          <ul>
            <p className="footertitle"> Socials</p>
            <Link to="https://www.facebook.com/klimArtPvtLtd/" target="_blank">
              <li id="fb">Facebook</li>
            </Link>
            <Link to="https://www.instagram.com/studio.klimart/?hl=en" target="_blank">
              <li id="ig">Instagram</li>
            </Link>
            <Link to="https://www.linkedin.com/company/klimart-architects/?originalSubdomain=in" target="_blank">
              <li id="li">LinkedIn</li>
            </Link>
            <Link to="https://twitter.com/klimartprojects?lang=en" target="_blank">
              <li id="tw">Twitter</li>
            </Link>
            <Link to="/">
              <li id="yt">Youtube</li>
            </Link>
          </ul>
        </div>
      </div>
      <div id="footerleft">
        <div id="letstalk">
          <h4>Let's Talk</h4>
          <Link to="/Contact">
            <button>
              Contact
              <AiOutlineArrowRight />
            </button>
          </Link>
        </div>
        <div id="careers">
          <h4>Join our team</h4>
          <Link to="/Careers">
            <button>
              Careers
              <AiOutlineArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewFooter;
