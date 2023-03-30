import * as React from "react";

const textBorderStyle ={
  textShadow: "2px 0 #4F9FDA, -2px 0 #4F9FDA, 0 2px #4F9FDA, 0 -2px #4F9FDA, 1px 1px #4F9FDA, -1px -1px #4F9FDA, 1px -1px #4F9FDA, -1px 1px #4F9FDA"
}

export default function MarketOwlObject({ object,key,testClick }) {
  // const cardClicked = (title) => {
  //   console.log("card title : "+title);
  // }

  return (
    <div key={key} className="p-2">
      <div onClick={() => {testClick(object.title)}} className="relative rounded-md h-16 w-32 flex justify-center cursor-pointer hover:scale-105 duration-300">
        <img className="rounded-md flex-shrink-0 min-w-full min-h-full object-cover" src={object.image} alt="" draggable="false" />
        <p className="absolute text-2xl top-1/4 border-separate" style={textBorderStyle}>{object.title}</p>
      </div>
    </div>
  );
}
