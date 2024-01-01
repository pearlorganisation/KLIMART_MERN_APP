import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NewHeader from "./NewHeader";
import NewFooter from "./NewFooter";
import Header2 from "../Header2";
import PopUp from "../PopUp";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.warn("pathname::::", pathname);
  }, [pathname]);

  const [colorChange, setColorchange] = useState(false);
  const [showPopup, setShowPopUp] = useState(false);

  const changeHeader2Color = () => {
    if (window.scrollY >= 90) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  window.addEventListener("scroll", changeHeader2Color);

  return (
    
    <>
      {pathname === "/Projects" || pathname === "/Careers" ? (
        <Header2  PopUp={setShowPopUp}/>
      ) : (
        <NewHeader PopUp={setShowPopUp}/>
      )}
      <Outlet context={[showPopup, setShowPopUp]} />
      <NewFooter />
      <PopUp trigger={showPopup} PopUp={() => setShowPopUp(false)} />
    </>

  );
};

export default Layout;
