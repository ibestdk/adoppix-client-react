import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Pagination = ({ totalpage, currentpage, setcurrentpage }) => {
  return (
    <div className="flex justify-center items-center mt-10">
      {currentpage > 0 ? (
        <div
          onClick={() => setcurrentpage(currentpage - 1)}
          className="px-2 py-2 bg-adoplighticon dark:bg-adopdark cursor-pointer rounded-lg "
        >
          <BsChevronLeft className="dark:text-white" />
        </div>
      ) : (
        <div></div>
      )}
      {totalpage
        ? Array.from({ length: totalpage }).map((_, index) => (
            <div
              key={index}
              onClick={() => setcurrentpage(index)}
              className={`${
                currentpage === index
                  ? "bg-adoppix"
                  : "bg-adoplighticon dark:bg-adopdark cursor-pointer"
              } px-4 py-3  mx-2 rounded-lg duration-150`}
            >
              {index + 1}
            </div>
          ))
        : null}
      {currentpage === 0 && totalpage > 1 ? (
        <div
          onClick={() => setcurrentpage(currentpage + 1)}
          className="px-2 py-2 bg-adoplighticon dark:bg-adopdark cursor-pointer rounded-lg "
        >
          <BsChevronRight className="dark:text-white" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
