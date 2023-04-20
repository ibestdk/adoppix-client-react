  import { useCallback, useEffect, useRef, useState } from "react";
  import React from "react";
  import { AiOutlineSearch } from "react-icons/ai";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import { getSearchUser } from "../../services/apiService";
  import { useNavigate } from "react-router-dom";
  import "./search.scss";
  const LiveSearchChat = ({selectUsername, setSelectUsername}) => {
    const [showResults, setShowResults] = useState(false);

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
    const selectUserName = (username) => {
      setShowResults(false);
      setSelectUsername(username);
    }
  
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    };
    const handleKeyDown = () => {};

    type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
      setSelectUsername(e.target.value);
    };

    useEffect(() => {
      (async () => {
        const results = await getSearchUser(selectUsername);
        setResult(results);
      })();
    }, [selectUsername]);

    useEffect(() => {
      const handleDocumentClick = (event: MouseEvent) => {
        if (!event.target || !(event.target instanceof Node)) {
          return;
        }
        const dropdownContainer = document.getElementById("dropdown-container");
        if (dropdownContainer && !dropdownContainer.contains(event.target)) {
          handleCloseSearch();
        }
      };

      document.addEventListener("click", handleDocumentClick);

      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }, []);

    return (
      <div
        className={` ${showResults ? "backdrop" : ""} z-50 w-6/12 sm:w-full`}
        id="dropdown-container"
        onFocus={handleOpenSearch}
        onClick={handleClick} 
      >
        <div className="relative">
          <div
            tabIndex={1}
            onKeyDown={handleKeyDown}
            className=""
          >
  
            <input
              value={selectUsername}
              onChange={handleChange}
              className="bg-transparent w-6/12 sm:w-auto text-adopsoftdark dark:text-adoplight"
              type="text"
              placeholder="ค้นหา"
            />
          </div>
          {showResults && (
            <div
              onFocus={handleOpenSearch}
              className="absolute mt-1 w-full p-2 max-h-[50vh] bg-white dark:bg-adopsoftdark shadow-lg  rounded-lg  overflow-y-auto overflow-x-hidden"
            >
              {result ? (
                <div>


                  
                  <div className="text-sm mt-2 mb-2 text-adopsoftdark dark:text-adoplight">ผู้ใช้</div>
                  {result.length > 0 ? (
                    result.map((list, index) => (
                      <div
                        onClick={() => selectUserName(list.username)}
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
                        <div className="flex items-center ml-2">
                          {list.username}
                        </div>
                      </div>
                    ))) : (<div className="text-center text-xs text-adopdark dark:text-white">ไม่พบผู้ใช้</div>)}
                </div>
              ): (<div className="flex items-center">
                <AiOutlineSearch className="p-1 rounded-full dark:bg-adopdark bg-adoplighticon"/>
                <div className="text-lg mx-2 text-adoplighticon dark:text-white">พิมพ์เพื่อค้นหาผู้ใช้</div>
              </div>)}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default LiveSearchChat;
