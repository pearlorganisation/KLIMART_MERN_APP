import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import ProjectListing from "./components/ProjectListing";
// import Projectxyz from "./components/Projectxyz";
import ProjectAnunani from "./components/Project Anunani";
import ProjectHPCL from "./components/Project HPCL";
import ProjectPGCIL from "./components/Project PGCIL";
import ProjectEPCO1 from "./components/Project EPCO1";
import ProjectMH from "./components/Project Microhomes";
import ProjectHZ from "./components/Project Habitatzero";
import ProjectBiome from "./components/Project Biome";
import ProjectEPCO2 from "./components/Project EPCO2";
import Matter from "./components/Matterhome";
import Matterlisting from "./components/Matterlisting";
import Matterwayfind from "./components/Matterwayfind";
import Matterwooden from "./components/Matterwooden";
import Mattermidjourney from "./components/Mattermidjourney";
import Mattersmartlight from "./components/Mattersmartlight";
import Mattersolid from "./components/Mattersolid";
import Matterbags from "./components/Matterbags";
import Contact from "./components/Contact";
import Careers from "./components/Careers";

import Tellus from "./components/Tellus";
import Buildproject from "./components/Buildproject";
import Newsletter from "./components/Newsletter";
import SelectedProjects from "./components/SelectedProjects";
import Footer from "./components/Footer";
import Linebreakleft from "./components/Linebreakleft";
import Linebreakright from "./components/Linebreakright";
import PopUp from "./components/PopUp";
function App() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={[
            <Header PopUp={setShowPopup} />,
            <Home PopUp={setShowPopup} />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/About"
          element={[
            <Header PopUp={setShowPopup} />,
            <About />,
            <SelectedProjects />,
            <Newsletter />,
            <Linebreakright />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectListing />,
            <Tellus PopUp={setShowPopup} />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-Anu-Nani-Residence"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectAnunani />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-HPCL"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectHPCL />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-PGCIL"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectPGCIL />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-EPCO-Shahganj"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectEPCO1 />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-Micro-Homes"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectMH />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-Habitat-Zero"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectHZ />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-Biome"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectBiome />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Projects/Project-EPCO-Ashta"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <ProjectEPCO2 />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Matter"
          element={[
            <Header PopUp={setShowPopup} />,
            <Matter />,
            <Newsletter />,
            <Linebreakright />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        ></Route>
        <Route
          path="Matterlisting"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Matterlisting />,
            <Newsletter />,
            <Linebreakleft />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        ></Route>
        <Route
          path="/Matterlisting/Blog Do-you-really-design-for-your-user"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Matterwayfind />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Matterlisting/Blog Modern-alternatives-to-wooden-surfaces"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Matterwooden />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Matterlisting/Blog Team-building-with-MidJourney"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Mattermidjourney />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Matterlisting/Blog The-Comfort-of-Smart-Lighting"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Mattersmartlight />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Matterlisting/Blog How-to-make-a-solid-first-impression"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Mattersolid />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Matterlisting/Blog Site-visit:-Pack-your-bags- open-your-minds"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Matterbags />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Contact"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Contact />,
            <Linebreakright />,
            <Buildproject PopUp={setShowPopup} />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route
          path="/Careers"
          element={[
            <Header2 PopUp={setShowPopup} />,
            <Careers />,
            <Linebreakleft />,
            <Newsletter />,
            <Footer />,
            <PopUp trigger={showPopup} PopUp={setShowPopup} />,
          ]}
        />
        <Route path="/popup" element={[<PopUp />]} />
      </Routes>
    </Router>
  );
}

export default App;
