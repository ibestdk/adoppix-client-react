import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { RxDotFilled } from "react-icons/rx";
const Banner = () => {
  const [hasError, setErrors] = useState(false);
  const [banner, setData] = useState({});
  const slides = [
    {
      url: "https://media.discordapp.net/attachments/681151360305201169/1033787519113895968/Group_127.png",
    },
    {
      url: "https://i-ogp.pximg.net/c/w1200_q80_a2_g1_u1_cr0:0.038:1:0.777/img-master/img/2020/08/06/17/43/06/83484044_p0_master1200.jpg",
    },
    {
      url: "https://media.discordapp.net/attachments/801331667586383872/1034379383978328134/100950847_p0.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  async function fetchData() {
    const res = await fetch("https://mockapi.adoppix.com/api/Mock/GetBanner");
    res
      .json()
      .then((res) => setData(res))
      .catch((err) => setErrors(err));

    console.log(banner);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group" >
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      {/* left arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FontAwesomeIcon onClick={prevSlide} icon={faChevronLeft} />
      </div>
      {/* right arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <FontAwesomeIcon onClick={nextSlide} icon={faChevronRight} />
      </div>

      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
            <RxDotFilled />
          </div>
        ))}
      </div>

      <span>{JSON.stringify(banner.data)}</span>
      <hr />
      <span>has error : {JSON.stringify(hasError)}</span>
    </div>
  );
};

export default Banner;
