import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
const LiveSearch = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const [result, setResult] = useState<User[]>([]);

  interface User {
    profileImage: string;
    username: string;
  }

  // const handleSelection = (selectedIndex: number) => {
  //   const selectedItem = results[selectedIndex];
  //   if (!selectedItem) return resetSearchComplete();
  //   onSelect && onSelect(selectedItem);
  //   resetSearchComplete();
  // };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  // const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
  //   const { key } = e;
  //   let nextIndexCount = 0;

  //   // move down
  //   if (key === "ArrowDown")
  //     nextIndexCount = (focusedIndex + 1) % results.length;

  //   // move up
  //   if (key === "ArrowUp")
  //     nextIndexCount = (focusedIndex + results.length - 1) % results.length;

  //   // hide search results
  //   if (key === "Escape") {
  //     resetSearchComplete();
  //   }

  //   // select the current item
  //   if (key === "Enter") {
  //     e.preventDefault();
  //     handleSelection(focusedIndex);
  //   }

  //   setFocusedIndex(nextIndexCount);
  // };

  const handleOpenSearch = () => {
    setShowResults(true);
  };
  const handleCloseSearch = () => {
    setShowResults(false);
  };
  const handleKeyDown = () => {};

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    setDefaultValue(e.target.value);
  };

  const getChatList = async () => {
    if (!defaultValue) return null;
    try {
      const response = await axios.get(
        `https://api.adoppix.com/api/Search/${defaultValue}/users`,
        {
          params: { take: 10, page: 0 },
        }
      );
      if (response?.data?.status) {
        setResult(response?.data?.data);
        console.log(response?.data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getChatList();
  }, [defaultValue]);

  return (
    <div
      className={` ${showResults ? "backdrop-blur-sm" : ""} z-50`}
      onFocus={handleOpenSearch}
      onBlur={handleCloseSearch}
    >
      <div className="relative">
        <div
          tabIndex={1}
          onKeyDown={handleKeyDown}
          className="flex items-center mx-5 border-2 dark:border-white rounded-lg"
        >
          <AiOutlineSearch className="mx-2" />
          <input
            value={defaultValue}
            onChange={handleChange}
            className="bg-transparent"
            type="text"
            placeholder="ค้นหา"
          />
        </div>
        {/* Search Results Container */}
        {showResults && (
          <div className="absolute mt-1 w-full p-2 h-[50vh] bg-white dark:bg-adopsoftdark shadow-lg  rounded-lg  overflow-y-auto">
            {result &&
              result.map((list, index) => (
                <div
                  className="flex px-2 py-2 hover:brightness-50 hover:dark:bg-adopdark duration-200 rounded-lg cursor-pointer"
                  key={index}
                >
                  <div>
                    {" "}
                    <img
                      className="w-[45px] h-[45px] rounded-full border-2 border-adoppix p-1"
                      src={
                        list.profileImage
                          ? `https://pix.adoppix.com/public/${list.profileImage}`
                          : "https://pix.adoppix.com/image/adop.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex items-center ml-2">{list.username}</div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSearch;
