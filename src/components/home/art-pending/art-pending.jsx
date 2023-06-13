import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const ArtPending = () => {
  const [artPending, setArtPending] = useState();

  const getArtPending = async () => {
    let response = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/Post?take=28&page=0`,
    }).catch((err) => console.log(err.response));
    // //console.log(response.data.data);
    setArtPending(response.data.data.postList);
  };

  useEffect(() => {
    getArtPending();
  }, []);
  return (
    <div className="container mx-auto mt-5">
      <div className="bg-adoplight shadow-section-center dark:bg-adopsoftdark py-10 px-10 rounded-lg">
        <div className="text-center mb-10 dark:text-white text-adopdark">
          Pending Art
        </div>
        <div className=" grid  grid-cols-2 sm:grid-cols-7 gap-5">
          {artPending &&
            artPending.map((art, artIndex) => (
              <div
                key={artIndex}
                className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] hover:scale-105 duration-300 rounded-lg"
              >
                <NavLink to={`feeds/${art.postId}`}>
                  <img
                    src={`https://pix.adoppix.com/public/${art.images[0]}`}
                    className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] object-cover rounded-lg"
                    alt=""
                  />
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
