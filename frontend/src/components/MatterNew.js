import React, { useEffect, useState } from "react";
import "./Matterblog.css";
import line from "../assets/Line 1.png";
import { TbHeart } from "react-icons/tb";
import smartlight1 from "../assets/smartlight1.png";
import smartlight2 from "../assets/smartlight2.png";
import smartlight3 from "../assets/smartlight3.png";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlogById } from "./features/actions/blogAction";
import { useParams } from "react-router-dom";
import htmlParser from "html-react-parser";
import moment from "moment";

function Mattersmartlight() {
  const [isLiked, setIsLiked] = useState(false);
  const [content, setContent] = useState();
  const [isDataLoading, setIsDataLoading]= useState(false)
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singleBlogData, isLoading } = useSelector((state) => state.getBlog);

  useEffect(()=>{
if(singleBlogData?.propertyGallery?.length>0){
  setIsDataLoading(true)
}
  },[singleBlogData])

  useEffect(() => {
    dispatch(fetchSingleBlogById(id));
  }, [id]);

  return (
    <div>
      {!isDataLoading ? (
        <div style={{width:"100%", height:"90vh"}}>
          <Skeleton  height={400} />
          <div style={{margin:"20px", display:"flex", justifyContent:"center"}}>
          <Skeleton  height={250} width={400} />
          </div> 
          <div style={{margin:"20px", display:"flex", justifyContent:"center"}}>
          <Skeleton  height={30} width={400} />
          </div> 
          
        </div>
      ) : (
        <>
          {isLoading ? (
            "Loading..."
          ) : (
            <div className="matterblog">
              <div
                className="matterbloghero"
                id="smartlighthero"
                style={{
                  backgroundImage: Array.isArray(singleBlogData?.propertyGallery) && singleBlogData?.propertyGallery?.length > 0 && `url('${singleBlogData?.propertyGallery[0]}')`,
                }}
              ></div>
              <div className="blog">
                <div className="blogtop">
                  <div className="blogheading">{singleBlogData?.topic}</div>
                  <div className="blogsubhead">{singleBlogData?.subTopic}</div>
                  <div className="blogheadbottom">
                    <div className="author">
                      <div className="authorname">{singleBlogData?.writer}</div>
                      <div className="publishdate">
                        {moment().format("MMM Do YY")}
                      </div>
                    </div>
                    <img src={line} alt="lineseperator" className="bloglinetop" />
                  </div>
                </div>
                <div className="blogcontent">
                  {singleBlogData?.content && htmlParser(JSON.parse(singleBlogData?.content))}
                </div>
                <div className="blogfooter">
                  <img src={line} alt="" className="blogendline" />
                  <div className="author">
                    <div className="authorname">Saoirse Tope</div>
                    <div className="publishdate">23 SEPTEMBER 2022</div>
                  </div>
                  <div className="publishdate" id="footertags">
                    TAGS:
                  </div>
                  <div className="blogtags">
                    <div id="materials">Materials & Techniques</div>
                    <div id="architecture">Report</div>
                    <div id="schooldesign">Technology</div>
                  </div>
                  <div className="blogsources"></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Mattersmartlight;
