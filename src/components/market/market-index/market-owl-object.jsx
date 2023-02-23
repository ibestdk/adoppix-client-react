import * as React from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function MarketOwlObject({  object }) {
  return (
    <div  className="item m-3  w-[260px] hover:scale-105 duration-500">
      <div className="relative">
        <div className="w-[250px] h-[300px] hover:scale-75 duration-300">
          <img
            className="w-[250px] h-[300px] object-cover rounded-lg shadow-lg hover:scale-105 duration-300"
            src={object.image}
          />
        </div>
        <div className="bg-adopsoftdark absolute bottom-0 w-full bg-opacity-50 hover:bg-opacity-80 duration-500 rounded-t-lg">
          <div className="m-2">
            <div>
              <UserPopOut
                title={
                  <React.Fragment>
                    <div className="rounded-lg p-2 ">
                      <div className="grid grid-cols-12 gap-4 w-[170]  bg-opacity-100">
                        <div className="col-span-4">
                          <img
                            className="h-[50px] w-[50px] object-cover rounded-full"
                            src={object.profileimage}
                            alt=""
                          />
                        </div>
                        <div className="col-span-8">
                          <p className="text-lg font-bold text-adopdark dark:text-adoplight  ">
                            {object.username}
                          </p>
                          <button className="py-1 px-2 rounded-lg bg-adoppix text-adoplight font-bold text-sm">
                            ติดตาม
                          </button>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                }
              >
                <img
                  className="h-[30px] w-[30px] object-cover rounded-full"
                  src={object.profileimage}
                  alt=""
                />
              </UserPopOut>
            </div>
            <div></div>
            <div></div>
            <h4 className="text-adopsoftdark dark:text-adoplight duration-300">
              {object.title}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
const UserPopOut = ({ ...props }) => <Tooltip classes={{tooltip: "bg-adoplight dark:adopsoftdark"}} {...props} arrow />;
