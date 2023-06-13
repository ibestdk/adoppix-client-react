import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

export const CartCardSkeleton = () =>{
    return(
        <div className="px-8 py-5 grid grid-cols-4 gap-4 place-items-center animate-pulse">
        <div className="dark:bg-adopdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex"></div>
        <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
          <div className="h-8 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
          <div className="my-2 h-5 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
          <div className="my-2 cursor-default">
            <div className="inline-block mx-1">
              <div className="dark:bg-adopdark bg-adoplighticon rounded-full h-6 w-6"></div>
            </div>
            <div className="inline-block mx-1 h-5 w-36 dark:bg-adopdark bg-adoplighticon rounded-md"></div>
            <div className="inline-block">
              <GoVerified className="text-adoplighticon dark:text-adopdark h-5 w-5"></GoVerified>
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <div className="inline-block text-adoplighticon dark:text-adopdark">
              <div className="inline-block px-1">
                <FaTrash className="text-lg"></FaTrash>
              </div>
              <div className="inline-block h-6 w-6 rounded-md bg-adoplighticon dark:bg-adopdark"></div>
            </div>
            <div className="inline-block px-2 cursor-default text-adoplighticon">
              |
            </div>
            <div className="inline-block text-adoplighticon dark:text-adopdark">
              <div className="inline-block px-1">
                <AiFillStar className="text-lg h-6 w-6"></AiFillStar>
              </div>
              <div className="inline-block h-6 w-24 rounded-md bg-adoplighticon dark:bg-adopdark"></div>
            </div>
          </div>
        </div>
        <div className="h-8 w-28 bg-adoplighticon dark:bg-adopdark rounded-md"></div>
        <div className="dark:bg-adopdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex"></div>
        <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
          <div className="h-8 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
          <div className="my-2 h-5 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
          <div className="my-2 cursor-default">
            <div className="inline-block mx-1">
              <div className="dark:bg-adopdark bg-adoplighticon rounded-full h-6 w-6"></div>
            </div>
            <div className="inline-block mx-1 h-5 w-36 dark:bg-adopdark bg-adoplighticon rounded-md"></div>
            <div className="inline-block">
              <GoVerified className="text-adoplighticon dark:text-adopdark h-5 w-5"></GoVerified>
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <div className="inline-block text-adoplighticon dark:text-adopdark">
              <div className="inline-block px-1">
                <FaTrash className="text-lg"></FaTrash>
              </div>
              <div className="inline-block h-6 w-6 rounded-md bg-adoplighticon dark:bg-adopdark"></div>
            </div>
            <div className="inline-block px-2 cursor-default text-adoplighticon">
              |
            </div>
            <div className="inline-block text-adoplighticon dark:text-adopdark">
              <div className="inline-block px-1">
                <AiFillStar className="text-lg h-6 w-6"></AiFillStar>
              </div>
              <div className="inline-block h-6 w-24 rounded-md bg-adoplighticon dark:bg-adopdark"></div>
            </div>
          </div>
        </div>
        <div className="h-8 w-28 bg-adoplighticon dark:bg-adopdark rounded-md"></div>
        <div className="dark:bg-adopdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex"></div>
        <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
          <div className="h-8 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
          <div className="my-2 h-5 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
          <div className="my-2 cursor-default">
            <div className="inline-block mx-1">
              <div className="dark:bg-adopdark bg-adoplighticon rounded-full h-6 w-6"></div>
            </div>
            <div className="inline-block mx-1 h-5 w-36 dark:bg-adopdark bg-adoplighticon rounded-md"></div>
            <div className="inline-block">
              <GoVerified className="text-adoplighticon dark:text-adopdark h-5 w-5"></GoVerified>
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <div className="inline-block text-adoplighticon dark:text-adopdark">
              <div className="inline-block px-1">
                <FaTrash className="text-lg"></FaTrash>
              </div>
              <div className="inline-block h-6 w-6 rounded-md bg-adoplighticon dark:bg-adopdark"></div>
            </div>
            <div className="inline-block px-2 cursor-default text-adoplighticon">
              |
            </div>
            <div className="inline-block text-adoplighticon dark:text-adopdark">
              <div className="inline-block px-1">
                <AiFillStar className="text-lg h-6 w-6"></AiFillStar>
              </div>
              <div className="inline-block h-6 w-24 rounded-md bg-adoplighticon dark:bg-adopdark"></div>
            </div>
          </div>
        </div>
        <div className="h-8 w-28 bg-adoplighticon dark:bg-adopdark rounded-md"></div>
      </div>
    )
}