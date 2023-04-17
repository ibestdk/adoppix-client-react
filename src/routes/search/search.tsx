import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { getSearchUser } from "../../services/apiService";
const LiveSearch = () => {
  const [showResults, setShowResults] = useState(true);
  const [defaultValue, setDefaultValue] = useState("");
  const [result, setResult] = useState<User[]>([]);

  interface User {
    profileImage: string;
    username: string;
  }

  const handleOpenSearch = () => {
    setShowResults(true);
  };
  const handleCloseSearch = () => {
    setShowResults(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleKeyDown = () => {};

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    setDefaultValue(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const results = await getSearchUser(defaultValue);
      setResult(results);
    })();
  }, [defaultValue]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!event.target || !(event.target instanceof Node)) {
        return;
      }
      const dropdownContainer = document.getElementById('dropdown-container');
      if (dropdownContainer && !dropdownContainer.contains(event.target)) {
        handleCloseSearch();
      }
    };
  
    document.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);


  return (
    <div
    className={` ${showResults ? "backdrop-blur-sm" : ""} z-50`}
    id="dropdown-container"
    onFocus={handleOpenSearch}
    onClick={handleClick} // prevent losing focus on click
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
        {showResults && (
          <div
            onFocus={handleOpenSearch}
            className="absolute mt-1 w-full p-2 h-[50vh] bg-white dark:bg-adopsoftdark shadow-lg  rounded-lg  overflow-y-auto overflow-x-hidden"
          >
            <div>
              ;sflgdfgsd;'flgsdf;glksdfgsd;lfkg'
            </div>
            {result &&
              result.map((list, index) => (
                <Link
                  to={list.username}
                  className="flex px-2 py-2 hover:brightness-50 hover:dark:bg-adopdark duration-200 rounded-lg cursor-pointer"
                  key={index}
                >
                  <div>
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
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSearch;
