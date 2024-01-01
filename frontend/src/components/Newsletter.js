import React from "react";
import "./Newsletter.css";
import newsletterimg from "../assets/newsletterimg.png";

function Newsletter() {
  return (
    <div id="newsletter">
      <img src={newsletterimg} alt="IIM IH" id="newsimg" />
      <div id="newstext">
        <h3>Stay Tuned</h3>
        <p>
          Get the latest updates by subscribing to our newsletter and blogs.
          Sign up now for exclusive content and industry insights.
        </p>
      </div>
      <form action="" id="emailbox">
        <p className="toptext">Email</p>
        <input type="text" id="email" placeholder="type..." />
        <input type="Submit" value="SUBSCRIBE" id="subscribe" />
      </form>
    </div>
  );
}
export default Newsletter;
