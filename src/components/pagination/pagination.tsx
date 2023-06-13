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

      {totalpage ? (
        <>
          {currentpage > 2 ? (
            <div
              onClick={() => setcurrentpage(0)}
              className="bg-adoplighticon dark:bg-adopdark cursor-pointer px-4 py-3 mx-2 rounded-lg duration-150"
            >
              1
            </div>
          ) : null}

          {currentpage > 2 ? <div className="px-2 py-2 mx-2">...</div> : null}

          {Array.from({ length: totalpage })
            .slice(
              Math.max(0, currentpage - 2),
              Math.min(totalpage, currentpage + 3)
            )
            .map((_, index) => {
              const pageNumber =
                currentpage > 2 ? index + currentpage - 2 : index;
              return (
                <div
                  key={index}
                  onClick={() => setcurrentpage(pageNumber)}
                  className={`${
                    currentpage === pageNumber
                      ? "bg-adoppix"
                      : "bg-adoplighticon dark:bg-adopdark cursor-pointer"
                  } px-4 py-3 mx-2 rounded-lg duration-150`}
                >
                  {pageNumber + 1}
                </div>
              );
            })}

          {currentpage < totalpage - 3 && totalpage > 5 ? (
            <div className="px-2 py-2 mx-2">...</div>
          ) : null}

          {currentpage < totalpage - 3 && totalpage > 5 ? (
            <div
              onClick={() => setcurrentpage(totalpage - 1)}
              className="bg-adoplighticon dark:bg-adopdark cursor-pointer px-4 py-3 mx-2 rounded-lg duration-150"
            >
              {totalpage}
            </div>
          ) : null}
        </>
      ) : null}

      {currentpage < totalpage - 1 && totalpage > 1 ? (
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
