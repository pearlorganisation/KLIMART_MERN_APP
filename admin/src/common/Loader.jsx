import React from "react";
import Lottie from "react-lottie";
import animation from "../../src/Lottie/Loader.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{height:"100vh"}}>
      <Lottie
        options={defaultOptions}
        height={120}
        width={120}
        style={{ stroke: "orangered" }}
        className="loader-prog"
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
