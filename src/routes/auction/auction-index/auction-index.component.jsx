import { TextInput } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import Pagination from '@mui/material/Pagination';
export const AuctionIndex = () => {
  return (
    <div className="bg-adoplight dark:bg-adopdark min-h-screen">
      {/*    <div className="container flex flex-row m-auto">
          <div className="columns-3 rounded-lg m-5 h-[400px] w-[350px] bg-adopsoftdark shadow-lg"></div>
          <div className="columns-9 rounded-lg m-5 h-[1000px] w-full bg-adopsoftdark shadow-lg "></div>
    </div>*/}
      <div className="relative top-14">
        <div className="container m-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="bg-adopsoftdark ml-5 mr-5 col-span-3  h-[600px] rounded-lg">
              <div>
                <div>
                  <div>
                    <div className="mb-2 block"></div>
                    <div className="flex border-2 m-4 rounded-lg py-2 px-4">
                      <BsSearch className="text-white m-2" />
                      <input className="w-full"/>
                    </div>
                  </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="bg-adopsoftdark mr-5 col-span-9 h-[1000px] w-full rounded-lg">
            <Pagination count={10} variant="outlined" shape="rounded" sx={"white"} />
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
