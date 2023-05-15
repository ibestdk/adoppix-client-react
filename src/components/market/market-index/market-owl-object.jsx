import * as React from "react";

const textBorderStyle = {
  textShadow:
    "2px 0 #4F9FDA, -2px 0 #4F9FDA, 0 2px #4F9FDA, 0 -2px #4F9FDA, 1px 1px #4F9FDA, -1px -1px #4F9FDA, 1px -1px #4F9FDA, -1px 1px #4F9FDA",
};

export default function MarketOwlObject({ object, testClick }) {
  // const cardClicked = (title) => {
  //   console.log("card title : "+title);
  // }
  const randomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const pastel = "70%";
    return `hsl(${hue}, ${pastel}, ${pastel})`;
  };

  return (
    <div
      className=" rounded-lg py-2 px-4 w-auto cursor-pointer duration-300 flex justify-center items-center mx-2"
      style={{ backgroundColor: randomPastelColor() }}
    >

        <p className="text-sm top-1/4 border-separate drop-shadow-center">
          #{object.title}
        </p>
      </div>
  );
}
