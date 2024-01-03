import React, { lazy, Suspense, useState, useEffect } from "react";
import Loader from "./common/Loader";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Authentication/Register";
import PageNotFound from "./components/Layout/PageNotFound/PageNotFound";
import { useSelector } from "react-redux";
// import Contact from "./components/Tables/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PageList from "./components/Pages/PageList";
import "react-toastify/dist/ReactToastify.css";
// import UpdatePage from "./components/Pages/UpdatePage";


const SingleHeadQuarter = React.lazy(() => import("./components/HeadQuarter/SingleHeadQuarter"));

const Employee = React.lazy(() => import("./components/Employee/Employee"));

const Branch = React.lazy(() => import("./components/Branch/Branch"));

const Clientelle = React.lazy(() => import("./components/Clientelle/Clientelle"));

const CareerPageSec1 = React.lazy(() => import("./components/CareerPage/CareerPageSec1"));

const AboutPageSec1 = React.lazy(() => import("./components/AboutPage/AboutPageSec1"));

const HomePageSec = React.lazy(() => import("./components/HomePage/HomePageSec"));

const BlogPageSec = React.lazy(() => import("./components/BlogPage/BlogPageSec"));

const ValuesProviderSec = React.lazy(() => import("./components/ValuesProvided/ValuesProvidedSec"));

const CurrentVacancies = React.lazy(() => import("./components/CurrentVacancies/CurrentVacancies"));

const KlimART = React.lazy(() => import("./components/KlimART/KlimART"));

// const AboutPageSec2 = React.lazy(() => import("./components/AboutPage/AboutPageSec2"));
// const AboutPageSec3 = React.lazy(() => import("./components/AboutPage/AboutPageSec3"));
// const AboutPageSec4 = React.lazy(() => import("./components/AboutPage/AboutPageSec4"));
// const AboutPageSec5 = React.lazy(() => import("./components/AboutPage/AboutPageSec5"));
// const AboutPageSec6 = React.lazy(() => import("./components/AboutPage/AboutPageSec6"));
// const AboutPageSec7 = React.lazy(() => import("./components/AboutPage/AboutPageSec7"));
// const AboutPageSec8 = React.lazy(() => import("./components/AboutPage/AboutPageSec8"));
// const AboutPageSec9 = React.lazy(() => import("./components/AboutPage/AboutPageSec9"));


const Dashboard = React.lazy(() => import("./common/Dashboard"));
// import Dashboard from "./common/Dashboard";
const Login = React.lazy(() => import("./components/Authentication/Login"));
// import Login from "./components/Authentication/Login";
// import ResetPassword from "./components/Authentication/ResetPassword";
const ResetPassword = React.lazy(() =>
import("./components/Authentication/ResetPassword")
);
// import UpdatePassword from "./components/Authentication/UpdatePassword";



// import Blog from "./components/Blog";
const Blog = React.lazy(() => import("./components/Blog"));
// import Contact from "./components/Tables/Contact";
const Contact = React.lazy(() => import("./components/Tables/Contact"));

// import Projects from "./components/Projects/ProjectTable";

const Projects = React.lazy(() => import("./components/Projects/ProjectTable"));

// import ViewProfile from "./components/User/ViewProfile";
// const ViewProfile = React.lazy(() => import("./components/User/ViewProfile"));

// import EditProfile from "./components/User/EditProfile";
// const EditProfile = React.lazy(() => import("./components/User/EditProfile"));

// import Tables from "./components/Tables/Career";
const Tables = React.lazy(() => import("./components/Tables/Career"));

// import Contact from "./components/Tables/Contact";
// import AddBlog from "./components/Blog/AddBlog";
const AddBlog = React.lazy(() => import("./components/Blog/AddBlog"));

// import UpdateBlog from "./components/Blog/UpdateBlog";
const UpdateBlog = React.lazy(() => import("./components/Blog/UpdateBlog"));

// import VerifyOtp from "./components/Authentication/VerifyOtp";
// import EnterNewPassword from "./components/Authentication/EnterNewPassword";
const EnterNewPassword = React.lazy(() =>
  import("./components/Authentication/EnterNewPassword")
);

const UpdatePage = React.lazy(() => import("./components/Pages/UpdatePage"));

// import AddPage from "./components/Pages/AddPage";
const AddPage = React.lazy(() => import("./components/Pages/AddPage"));

const Pages = React.lazy(() => import("./components/Pages"));
// import EnterNewPassword from "./components/Authentication/EnterNewPassword";

// import UpdatePage from "./components/Pages/UpdatePage";
// import AddPage from "./components/Pages/AddPage";
// import GetInTouchList from "./components/GetInTouch/GetInTouchList";
const GetInTouchList = React.lazy(() =>
  import("./components/GetInTouch/GetInTouchList")
);

// import UpdateGetInTouch from "./"
// import TagsList from "./components/tags/TagsList";
const TagsList = React.lazy(() => import("./components/tags/TagsList"));

// import TypesList from "./components/types/typesList";
const TypesList = React.lazy(() => import("./components/Types/TypesList"));


// import pages
const App = () => {
  const { isUserLoggedIn, isOtpGenerated } = useSelector(
    (state) => state.authentication
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate data sending to the server
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when data is sent
    }, 1000); // Adjust the delay time as needed
  }, []);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<EnterNewPassword />} />

            <Route
              path="/"
              element={isUserLoggedIn ? <Layout /> : <Navigate to="/login" />}
            >
              <Route path="/" element={<Dashboard />} />

              <Route path="/headQuarter" element={<SingleHeadQuarter/>} />

              <Route path="/branch" element={<Branch/>} />

              <Route path="/employee" element={<Employee/>}/>

              <Route path="/clientelle" element={<Clientelle/>}/>

              <Route path='/CurrentVacancies' element={<CurrentVacancies/>}/>

              <Route path='/klimART' element={<KlimART/>}/>


              <Route path='/careerPageSec1/:id/:index' element={<CareerPageSec1/>}/>

              <Route path='/AboutPageSec/:id/:index' element={<AboutPageSec1/>}/>

              <Route path='/HomePageSec/:id/:index' element={<HomePageSec/>}/>

              <Route path='/blogPageSec/:id/:index' element={<BlogPageSec/>}/>

              <Route path='/valuesProvidedSec/:id/:index' element={<ValuesProviderSec/>}/>

              

              

              
              {/* <Route path='/AboutPageSec2' element={<AboutPageSec2/>}/>
              <Route path='/AboutPageSec3' element={<AboutPageSec3/>}/>
              <Route path='/AboutPageSec4' element={<AboutPageSec4/>}/>
              <Route path='/AboutPageSec5' element={<AboutPageSec5/>}/>
              <Route path='/AboutPageSec6' element={<AboutPageSec6/>}/>
              <Route path='/AboutPageSec7' element={<AboutPageSec7/>}/>
              <Route path='/AboutPageSec8' element={<AboutPageSec8/>}/>
              <Route path='/AboutPageSec9' element={<AboutPageSec9/>}/> */}
              


              <Route path="/blog" element={<Blog />} />
              <Route path="/add-blog" element={<AddBlog />} />
              <Route path="/update-blog" element={<UpdateBlog />} />


              <Route path="/pages" element={<Pages />} />
              <Route path="/update-page" element={<UpdatePage />} />
              <Route path="/add-page" element={<AddPage />} />

              <Route path="/get-in-touch" element={<GetInTouchList />} />
              {/* <Route path="/update-get-in-touch" element={<UpdateGetInTouch />} /> */}

              <Route path="/tags" element={<TagsList />} />

              <Route path="/types" element={<TypesList />} />
              <Route path="/projects" element={<Projects />} />

              {/* <Route path="/users" element={<ViewProfile />} />
              <Route path="/edit-user" element={<EditProfile />} /> */}
              <Route path="/tables" element={<Tables />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/update-page" element={<UpdatePage />} />
            <Route path="/add-page" element={<AddPage />} />
            <Route path="/pages" element={<PageList />} /> */}
              {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
              {/* <Route
              path="/otp-verify"
              element={  <VerifyOtp />}
            /> */}
              {/* <Route
              path="/update-password"
              element={  <UpdatePassword /> }
            /> */}
            </Route>
          </Routes>
          <ToastContainer />
        </main>
      </Suspense>
    </>
  );
};

export default App;
