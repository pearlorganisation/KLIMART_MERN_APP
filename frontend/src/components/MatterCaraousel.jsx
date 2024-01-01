import React from "react";
import Slider from "react-slick";

const MatterCaraousel = () => {
  // caraousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="caraousel">
        <Slider {...settings}>
          <div className="1">
            <h1>hello</h1>
          </div>
          <div className="2">
            <h1>hello</h1>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default MatterCaraousel;
