import { useEffect, useState } from "react";
import axios from "axios";

export const Category = () => {
    const [category, setCategory] = useState();

    const getCategory = async () => {
      let response = await axios({
        method: "get",
        url: `  https://mockapi.adoppix.com/api/Mock/GetCategory`,
      }).catch((err) => console.log(err.response));
      // //console.log(response.data.data);
      setCategory(response.data.data);
    };
  
    useEffect(() => {
        getCategory();
    }, []);


  return (
    <div className=" mx-auto mt-5">
    <div className="bg-adoplight shadow-section-center dark:bg-adopsoftdark py-10 px-60 rounded-lg">
      <div className="text-center mb-10 dark:text-white text-adopdark">Category</div>
      <div className=" grid grid-cols-5 ">
        {category &&
          category.map((art, artIndex) => (
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
