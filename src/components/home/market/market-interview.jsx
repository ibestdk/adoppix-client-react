import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const MarketInterView = () => {
  //   const [artPending, setArtPending] = useState();

  return (
    <div className="grid grid-cols-12 pt-20 ">
      <div className=" pt-10  col-span-6  h-[600px] ">
        <img
          className="m-auto"
          src="https://cdn.discordapp.com/attachments/681151360305201169/1033798969278599299/sub-sub-2_1.png"
          alt=""
        />
      </div>
      <div className="col-span-6 pt-20  h-[600px] ">
        <div>
          <div>
            <div className="text-4xl">Market</div>
            <div className="text-base w-8/12">
              ร้านค้าเป็นสถานที่เปิดกว้างสำหรับนักวาดเเละผู้ที่ต้องการค้นหางานศิลปะเพื่อซื้อขายโดยตรงได้อย่างสะดวกเเละรวดเร็วในราคาที่ทุกคนสามารถเข้าถึงงานศิลปะได้
              เเละสำหรับนักวาดที่ไม่สนใจในการลงประมูลก็สามารถที่จะลงในตลาดได้
            </div>
          </div>
          <div className="mt-10">
            <Link
              to={"market"}
              className="bg-orange-400  text-white px-5 py-3 rounded-lg"
            >
              ไปยังร้านค้า
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
