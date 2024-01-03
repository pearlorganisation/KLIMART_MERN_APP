import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-pages">
        <Outlet />
      </div>
       {/* <Footer  /> */}
      
      
    </>
  );
};

export default Layout;
