import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const OwlAuctionNew = () => {
  const [newAuction, setNewAuction] = useState([]);
  const [onload, setOnload] = useState(true);

  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 3000,
    smartSpeed: 800,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };

  useEffect(() => {
    const getNewAuction = async () => {
      try {
        const response = await axios.get(
          "https://mockapi.adoppix.com/api/Mock/GetNewAuction"
        );
        setNewAuction(response.data.data);
        console.log("newAuction");
        console.log(newAuction);
        setOnload(false);
      } catch (error) {
        console.log(error);
      }
    };
    getNewAuction();
  }, [setNewAuction]);

  return (
    <div className=" mt-5 p-5 container m-auto bg-adoplight shadow-section-center dark:bg-adopsoftdark rounded-lg">
      <div>
        <h2 className="text-adopsoftdark text-center text-2xl font-bold dark:text-adoplight duration-300">
          New Auction
        </h2>
      </div>
      <div className="mt-3">
        { !onload &&
          <OwlCarousel {...options}>
            {newAuction.length > 0 &&
              newAuction.map((card, cardIndex) => (
                <div key={cardIndex} className="item m-3  w-[260px] ">
                  <img
                    className="w-[250px] h-[300px] object-cover rounded-lg shadow-lg"
                    src={card.image}
                  />
                  <h4 className="text-adopsoftdark dark:text-adoplight duration-300">
                    {card.title}
                  </h4>
                </div>
              ))}
          </OwlCarousel>
        }
      </div>
    </div>
  );
};
