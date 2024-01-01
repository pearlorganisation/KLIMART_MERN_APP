import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import About from "./components/About";
import ProjectListing from "./components/ProjectListing";
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
import PopUp from "./components/PopUp";
import ProjectsNew from "./components/ProjectsNew";
import MatterNew from "./components/MatterNew";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location?.pathname == "/Matterlisting" && navigate("/Matter");
  }, [location?.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Projects" element={<ProjectListing />} />

          <Route path="/Projects/:id" element={<ProjectsNew />} />

          <Route
            path="/Projects/Project-Anu-Nani-Residence"
            element={<ProjectAnunani />}
          />
          <Route path="/Projects/Project-HPCL" element={<ProjectHPCL />} />
          <Route path="/Projects/Project-PGCIL" element={<ProjectPGCIL />} />
          <Route
            path="/Projects/Project-EPCO-Shahganj"
            element={<ProjectEPCO1 />}
          />
          <Route path="/Projects/Project-Micro-Homes" element={<ProjectMH />} />
          <Route
            path="/Projects/Project-Habitat-Zero"
            element={<ProjectHZ />}
          />
          <Route path="/Projects/Project-Biome" element={<ProjectBiome />} />
          <Route
            path="/Projects/Project-EPCO-Ashta"
            element={<ProjectEPCO2 />}
          />
          <Route path="/Matter" element={<Matter />} />
          <Route path="/Matterlisting/:mainTagId" element={<Matterlisting />} />

          <Route path="/Matter/:id" element={<MatterNew />} />

          <Route
            path="/Matterlisting/Blog Do-you-really-design-for-your-user"
            element={<Matterwayfind />}
          />
          <Route
            path="/Matterlisting/Blog Modern-alternatives-to-wooden-surfaces"
            element={<Matterwooden />}
          />
          <Route
            path="/Matterlisting/Blog Team-building-with-MidJourney"
            element={<Mattermidjourney />}
          />
          <Route
            path="/Matterlisting/Blog The-Comfort-of-Smart-Lighting"
            element={<Mattersmartlight />}
          />
          <Route
            path="/Matterlisting/Blog How-to-make-a-solid-first-impression"
            element={<Mattersolid />}
          />
          <Route
            path="/Matterlisting/Blog Site-visit:-Pack-your-bags- open-your-minds"
            element={<Matterbags />}
          />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Careers" element={<Careers />} />
          <Route path="/popup" element={<PopUp />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
