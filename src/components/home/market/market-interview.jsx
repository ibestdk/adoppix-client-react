import { useEffect, useState } from "react";
import axios from "axios";

export const MarketInterView = () => {
  //   const [artPending, setArtPending] = useState();

  return (
    <div className="grid grid-cols-12 pt-20 ">
      <div className=" pt-10  col-span-6  h-[600px] ">
        <img className="m-auto"
          src="https://cdn.discordapp.com/attachments/681151360305201169/1033798969278599299/sub-sub-2_1.png"
          alt=""
        />
      </div>
      <div className="col-span-6 pt-20  h-[600px] ">
        <div className="text-4xl">Market</div>
        <div className="text-base w-8/12">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to{" "}
        </div>
        <div>
          <button className="bg-orange-400 mt-4 text-white px-5 py-3 rounded-lg">ไปยังร้านค้า</button>
        </div>
      </div>
    </div>
  );
};
