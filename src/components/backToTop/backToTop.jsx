import "./backtoTop.scss"
import React, { useState } from "react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div
      className="back-to-top-button rounded-lg shadow-lg text-sm"
      onClick={handleClick}
      style={{ display: showButton ? "block" : "none" }}
    >
    มีโพสต์ใหม่

    </div>
  );
};

export default BackToTopButton;
