import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { RxDotFilled } from "react-icons/rx";
import { Carousel } from "flowbite-react";
import { render } from "react-dom";
import axios from "axios";





const Banner2 = () => {
  const [hasError, setErrors] = useState(false);
  const [banners, setData] = useState();
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


  useEffect(() => {
    const fetchData = async() => {
      console.log(2)
      // res
      //   .json()
      //   .then((res) => setData(res.data))
      //   .catch((err) => setErrors(err));
      const res = await axios.get("https://mockapi.adoppix.com/api/Mock/GetBanner");
      setData(res.data.data)
      // console.log(res)
    }

    // console.log("useEffect")
    console.log(1)
    fetchData();
    console.log("banner list");
    console.log(banners && banners);

    
  }, []);

  return (
    <div className="h-96 sm:h-96 xl:h-96 2xl:h-96">
    <Carousel slideInterval={10000}>
    {banners&&banners.map((banner, bannerIndex) => (
        <img  key={bannerIndex}
        src={banners&&banner.image}
    
        />
    ))}
     
    </Carousel>
  </div>
  );
};

export default Banner2;
