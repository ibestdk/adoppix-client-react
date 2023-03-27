import { useEffect, useState } from "react";
import axios from "axios";

export const ArtRecommend = () => {
  const [artPending, setArtPending] = useState();

  const getArtPending = async () => {
    let response = await axios({
      method: "get",
      url: `https://mockapi.adoppix.com/api/Mock/GetArtFollowing`,
    }).catch((err) => console.log(err.response));
    console.log(response.data.data);
    setArtPending(response.data.data);
  };

  useEffect(() => {
    getArtPending();
  }, []);
  return (
    <div className="container mx-auto mt-5">
      <div className="bg-adoplight shadow-section-center dark:bg-adopsoftdark py-10 px-60 rounded-lg">
        <div className="text-center mb-10 dark:text-white text-adopdark">Recommend Art</div>
        <div className=" grid grid-cols-6 ">
          {artPending &&
            artPending.map((art, artIndex) => (
              <div
                key={artIndex}
                className="w-[180px] h-[180px] hover:scale-105 hover:shadow-lg duration-300 rounded-lg "
              >
                <img
                  src={art.image}
                  className="w-[180px] h-[180px] object-cover "
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
