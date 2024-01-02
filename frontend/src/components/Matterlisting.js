import React, { useState, useEffect } from "react";
import logo from "../assets/KlimArt Logo - Horizontal Lockup_white.png";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import matterlistingherobg from "../assets/matterlisting-hero.png";
import "./matterlisting.css";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import crossbtn from "../assets/crossbtn.png";
import matterlib0 from "../assets/fullmatterlib0.png";
import allImage from "../assets/all.jpg";
import matterlib1 from "../assets/fullmatterlib1.png";
import matterlib2 from "../assets/fullmatterlib2.png";
import matterlib3 from "../assets/fullmatterlib3.png";
import matterlib4 from "../assets/fullmatterlib4.png";
import quote from "../assets/quote.png";
import card1 from "../assets/wayfind13.png";
import card2 from "../assets/wooden13.png";
import card3 from "../assets/smartlight6.png";
import card4 from "../assets/solid9.png";
import card5 from "../assets/bags4.png";
import cardsquare from "../assets/midjourney3.png";
import Latestblogcard from "./Latestblogcard";
import Newsletter from "./Newsletter";
import Linebreakleft from "./Linebreakleft";
import BuildProject from "./common/BuildProject";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  fetchMainTag,
  fetchSingleBlogs,
} from "./features/actions/blogAction";
import {
  filterBlogByCategory,
  filterBlogByTags,
} from "./features/slices/blogSlice";

const Latestblogcards = [
  {
    title: "Do you really design for your user?",
    name: "By Saoirse Tope",
    date: "23 september 2022",
    img: card1,
    tags: ["institutional", "interior", "journals"],
    link: "/Matterlisting/Blog Do-you-really-design-for-your-user",
  },
  {
    title: "Modern alternatives to wooden surfaces",
    name: "By Saoirse Tope",
    date: "23 september 2022",
    img: card2,
    tags: ["reports"],
    link: "/Matterlisting/Blog Modern-alternatives-to-wooden-surfaces",
  },
  {
    title: "The Comfort of Smart Lighting",
    name: "By Saoirse Tope",
    date: "23 september 2022",
    img: card3,
    tags: ["reports"],
    link: "/Matterlisting/Blog The-Comfort-of-Smart-Lighting",
  },
  {
    title: "Team building with MidJourney",
    name: "By Saoirse Tope",
    date: "20 October 2022",
    img: cardsquare,
    tags: ["journals"],
    link: "/Matterlisting/Blog Team-building-with-MidJourney",
  },
  {
    title: "How to make a solid first impression",
    name: "By Raksha Alangi",
    date: "23 October 2022",
    img: card4,
    tags: ["reports"],
    link: "/Matterlisting/Blog How-to-make-a-solid-first-impression",
  },
  {
    title: "Site visit: Pack your bags, open your minds",
    name: "By Saoirse Tope",
    date: "23 september 2022",
    img: card5,
    tags: ["reports", "building", "institutional"],
    link: "/Matterlisting/Blog Site-visit:-Pack-your-bags- open-your-minds",
  },
];

const matterlistingtabs = [
  {
    title: "Sustainability",
    img: matterlib1,
    color: "#94AD1E",
    content: `Discover eco-conscious design innovations in our
    Sustainability blogs where we shape a greener
    future through our mindful practices.`,
  },
  {
    title: "Materials & Techniques",
    img: matterlib3,
    color: "#44513D",
    content: `Explore our Design Processes blogs for insights
    into our creative journey and innovative design
    strategies.`,
  },
  {
    title: "People and Events",
    img: matterlib4,
    color: "#FFC000",
    content: `Explore cutting-edge AEC materials and
    techniques in our blogs. Stay ahead with the latest
    innovations.`,
  },
  {
    title: "Design Processes",
    img: matterlib2,
    color: "#8B7150",
    content: `Discover our team's on-the-ground impact and
    community celebrations in People & Events blogs.
    Join the journey!`,
  },
  {
    title: "Design Processes",
    img: matterlib4,
    color: "#8B7150",
    content: `Discover our team's on-the-ground impact and
    community celebrations in People & Events blogs.
    Join the journey!`,
  },
];

function Matterlisting() {
  const { state } = useLocation();
  const { mainTagId } = useParams();
  console.log("this is matter listing state", state);

  // =--------------------------------------------useState------------------------------------

  const [isAllselected, setIsAllselected] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    state && state.index ? state.index : 0
  );
  const [filterValue, setFilterValue] = useState("");
  const [cards, setCards] = useState(Latestblogcards);
  const [tags, setTags] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [showPopup, setShowPopUp] = useOutletContext();
  const [category, setCategory] = useState("Sustainability");
  const dispatch = useDispatch();

  const { getBlogData, filterBlog, mainTags, singleBlogData, isLoading } =
    useSelector((state) => state?.getBlog);
  console.log("mainTags redux", mainTags);

  const handleSelectTab = (tab, title) => {
    setSelectedTab(tab);
    setCategory(title);
  };
  console.log("hi");

  const filterBlogsByCategory = () => {
    console.log("hello");
    dispatch(filterBlogByCategory(category));
  };

  const handleFilterCards = (etags) => {
    if (etags.length === 0) {
      setCards(Latestblogcards);
      return;
    }
    const hash = new Set(etags);
    setCards(
      Latestblogcards.filter((c) => {
        for (let i = 0; i < c.tags.length; i++) {
          if (hash.has(c.tags[i])) return true;
        }
        return false;
      })
    );
  };

  const handleViewMore = () => {
    setCards([...cards, ...Latestblogcards]);
  };

  const handleSelectTag = (etag) => {
    let filterTag = [];
    console.log("etag", etag);
    if (etag !== "All") {
      if (tags.includes(etag)) {
        filterTag = tags.filter((tag) => tag == etag);
        console.log("fileter", filterTag);
        filterTag = [etag];
      } else {
        filterTag = tags.filter((tag) => tag !== "ALL"); // Remove "All" tag
        // filterTag.push(etag);
        console.log("fileter", filterTag);
        filterTag = [etag];
      }
    } else {
      filterTag = [etag];
    }

    setTags(filterTag);
  };

  useEffect(() => {
    dispatch(filterBlogByTags(tags));
  }, [tags]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (mainTags?.length > 0) {
      console.log("inside main tag");
      mainTagId === "all"
        ? dispatch(fetchBlogs())
        : dispatch(fetchSingleBlogs(mainTagId));
    }
    // dispatch(fetchBlogs());
  }, [mainTags, mainTagId]);

  useEffect(() => {
    if (Array.isArray(singleBlogData) && singleBlogData?.length > 0) {
      const types = singleBlogData.map((project) =>
        project?.tags[0]?.tags_name?.toString()
      );
      const uniqueTypes = [...new Set(types)];
      if (uniqueTypes?.length > 0) setTypesList(uniqueTypes);
    }
  }, [singleBlogData]);

  useEffect(() => {
    dispatch(fetchMainTag());
  }, []);

  useEffect(() => {
    console.log("typesList::: ", typesList);
  }, [typesList]);
  // console.log("mainTags", mainTags);
  // console.log("mainTags[selectedTab]?.title",mainTags[selectedTab]?.title)
  return (
    <>
      <section id="matterlisting">
        <div className="matterlisting-hero">
          <img
            className="matterlistingbg"
            src={
              mainTagId === "all"
                ? allImage
                : matterlistingtabs[selectedTab]?.img
            }
            alt="bg"
          />
          <div className="gradientbg"></div>
          <div className="heronav">
            {"HOME > MATTER LISTING > "}

            <strong>
              {mainTagId === "all" ? "All" : mainTags[selectedTab]?.title}
            </strong>
          </div>
          <div className="matterlisting-hero-content">
            <div className="matterlisting-hero-head">
              {mainTagId === "all" ? "" : matterlistingtabs[selectedTab]?.title}
            </div>
            <div className="matterlisting-hero-text">
              {mainTagId === "all"
                ? ""
                : matterlistingtabs[selectedTab]?.content}
            </div>
          </div>
          <div className="matterlisting-tabs">
            <Link
              to={`/Matterlisting/all`}
              // key={idx}
              onClick={() => {
                setIsAllselected(true);
                dispatch(fetchBlogs());
              }}
              className="matterlisting-tab"
              style={{
                backgroundColor: mainTagId === "all" ? "green" : "",
              }}
            >
              All
            </Link>
            {mainTags?.map((tab, idx) => (
              <Link
                to={`/Matterlisting/${tab?._id}`}
                key={idx}
                onClick={() => {
                  console.log("tab", tab);
                  handleSelectTab(idx, tab?.title);
                  // dispatch(fetchSingleBlogs(mainTagId));
                }}
                className="matterlisting-tab"
                style={{
                  backgroundColor: mainTagId === tab?._id ? "green" : "",
                }}
              >
                {tab?.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="filter-tags">
          <div className="filterhead">TAGS :</div>
          <div className="filter-tag-list">
            <div
              className={
                tags.includes("All") ? "filter-tag selected" : "filter-tag"
              }
              onClick={() => handleSelectTag("All")}
            >
              <p>All</p>
            </div>
            {typesList?.map((tag, idx) => (
              <div
                onClick={() => handleSelectTag(tag)}
                key={idx}
                className={
                  tags.includes(tag) ? "filter-tag selected" : "filter-tag"
                }
              >
                <p>{tag}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="matterlist">
          {isLoading ? (
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  height: "300px",
                  width: "500px",
                  backgroundColor: "#f1efeff2",
                }}
              ></div>
            </div>
          ) : (
            Array.isArray(filterBlog) &&
            filterBlog.length > 0 &&
            filterBlog?.map((carddata, index) => {
              const timestamp = carddata.date;
              // setTags(carddata.)
              const date = new Date(timestamp);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };

              const dateString = date.toLocaleDateString(undefined, options);
              return (
                <Latestblogcard
                  name={`By ${carddata.writer}`}
                  img={carddata.propertyGallery[0]}
                  title={carddata.topic}
                  date={dateString}
                  link={carddata.content}
                  Id={carddata._id}
                />
              );
            })
          )}
        </div>
      </section>
      <section className="buildProjects">
        <BuildProject PopUp={setShowPopUp} />
      </section>
    </>
  );
}

export default Matterlisting;
