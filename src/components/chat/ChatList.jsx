import { getToken, getUser } from "../../services/authorize";
import { useState, useEffect, useRef } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { FaAngleDoubleUp } from "react-icons/fa";
import {
  IoSendSharp,
  IoImage,
  IoChatbubblesSharp,
  IoAdd,
} from "react-icons/io5";
import soundFile from "./pop.wav";
import moment from "moment";
import axios from "axios";
import "./chatList.scss";
import * as signalR from "@microsoft/signalr";
import ModalAddChat from "./create/modalCreate";
import { ChatCard } from "./chatCard/chatCard";



export const ChatList = () => {
  if (localStorage.getItem("token") === null) {
    return null; // Render nothing while redirecting
  }

  const [adopLetter, setadopLetter] = useState(false);
  const [chatopen, setChatopen] = useState(false);
  const [chatList, setChatList] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [userData, setUserData] = useState();
  const [chatSelect, setChatSelect] = useState();
  const [audio] = useState(new Audio(soundFile));

  const handleOnClose = () => setAddModal(false);

  const playSound = () => {
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play();
  };

  const token = getToken();

  const handleOpenAdopLetter = () => {
    setadopLetter(!adopLetter);
  };
  const handleOpenChat = (roomkey, name) => {
    setRoomId(roomkey);
    getChat(roomkey);
    setChatopen(true);
    setChatSelect(name);
  };
  const handleCloseChat = () => {
    setRoomId(null);
    setChatopen(false);
    setChatMessage([]);
    setChatSelect();
    getChatList();
  };

  if (token == null) return null;

  // ดึงข้อมูลผู้ใช้ที่เราแชทด้วย
  const getChatList = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "get",
      url: "https://api.adoppix.com/api/Chat/rooms",
      headers: headers,
    }).catch((err) => console.log(err.response));

    if (result && result.data && result.data.data) {
      const chatListWithRelativeTime = result.data.data.map((chat) => ({
        ...chat,
        relativeTime: getRelativeTime(chat.lastTime),
      }));
      playSound();
      setChatList(chatListWithRelativeTime);
    }
  };

  const getChat = async (roomkey) => {
    setRoomId(roomkey);
    // if (roomkey !== null) return null;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "get",
      url: `https://api.adoppix.com/api/Chat?chatRoomId=${roomkey}&take=20&page=0`,
      headers: headers,
    }).catch((err) => console.log(err.response));
    
    setChatMessage([...result.data.data]);
  };

  // const getChatSignalR = async () => {
  //   console.log("roomId :" + roomId);
  //   // if (roomkey !== null) return null;
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   };

  //   let result = await axios({
  //     method: "get",
  //     url: `https://api.adoppix.com/api/Chat?chatRoomId=${roomId}&take=20&page=0`,
  //     headers: headers,
  //   }).catch((err) => console.log(err.response));

  //   console.log(result.data.data);
  //   setChatMessage(result.data.data);
  // };

  const getRelativeTime = (datetime) => {
    const now = moment();
    const then = moment(datetime);
    const duration = moment.duration(now.diff(then));

    if (duration.asSeconds() < 60) {
      return "ตอนนี้";
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())} นาที${
        duration.asMinutes() > 1 ? "" : ""
      }`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())} ชม.${
        duration.asHours() > 1 ? "" : ""
      }`;
    } else if (duration.asDays() < 7) {
      return `${Math.floor(duration.asDays())} วัน${
        duration.asDays() > 1 ? "" : ""
      }`;
    } else if (duration.asDays() < 30) {
      return `${Math.floor(duration.asDays() / 7)} สัปดาห์${
        duration.asDays() > 7 ? "" : ""
      }`;
    } else if (duration.asDays() < 365) {
      return `${Math.floor(duration.asDays() / 30)} เดือน${
        duration.asDays() > 30 ? "" : ""
      }`;
    } else {
      return `${Math.floor(duration.asDays() / 365)} ปี${
        duration.asDays() > 365 ? "" : ""
      }`;
    }
  };

  const [inputMessageBox, setInputMessageBox] = useState();

  const handleInputChat = (event) => {
    setInputMessageBox(event.target.value);
  };

  const handleSubmitMessage = async () => {
    const bodyData = new FormData();
    if (inputMessageBox) bodyData.append("Message", inputMessageBox);
    bodyData.append("Type", "text");
    if (roomId) bodyData.append("ChatRoomId", roomId);
    bodyData.append("Username", userData.username);

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "post",
      url: "https://api.adoppix.com/api/Chat",
      data: bodyData,
      headers: headers,
    }).catch((err) => console.log(err.response));
    //getChat(roomId);
    const newMessages = [result.data.data, ...chatMessage];
    setChatMessage(newMessages);
    setInputMessageBox("");
    document.getElementById("chatInput").value = "";
  };

  //const [connection, setConnection] = useState(null);

  // useEffect(() => {
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl(`https://api.adoppix.com/hub/chat`)
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(newConnection);
  // }, []);

  const [newMessage, setNewMessage] = useState({});
  useEffect(() => {
    const chatHub = new signalR.HubConnectionBuilder()
    .withUrl('https://api.adoppix.com/hub/chat')
    .withAutomaticReconnect()
    .build();

    chatHub.start().then(() => {}).catch((err) => { console.log(err); });

    chatHub.on(roomId, (messageData) => {
      setNewMessage(messageData);
    });
  }, [roomId]);

  useEffect(() => {
    const newListMessages = [newMessage, ...chatMessage];
    setChatMessage([...newListMessages]);
  }, [newMessage]);

  useEffect(() => {
;
  }, [chatMessage]);

  // useEffect(() => {
  //   console.log(roomId);
  //   if (roomId) {
  //     if (connection) {
  //       connection
  //         .start()
  //         .then(() => {
  //           // console.log("hub SignalR Chat Connected! ✨");
  //         })
  //         .catch((error) => console.log(`SignalR error: ${error}`));

  //       connection.on(`${roomId}`, (message) => {
  //         getChatSignalR();

  //         let newChatArray = [message, ...chatMessage]
  //         setChatMessage(newChatArray);
  //         // Do something with the received message
  //       });
  //     }
  //   }
  // }, [connection]);

  useEffect(() => {
    getChatList();
    const userD = getUser();
    setUserData(userD);
  }, []);

  useEffect(() => {
    getChatList();
  }, [addModal]);

  return (
    <div className="fixed z-40 right-4 bottom-0 cursor-pointer">
      {chatopen ? (
        <div>
          <div
            className={`duration-300  py-2 bg-adoppix  text-adoplight rounded-t-lg ${
              adopLetter ? "h-[500px]" : "h-[60px]"
            } sm:w-[300px] w-[300px] text-center `}
          >
            <div className="py-2 flex justify-between px-4">
              <div className="flex">
                <div onClick={handleCloseChat}>
                  <AiOutlineCaretLeft />
                </div>
                <div>{chatSelect && chatSelect}</div>
              </div>
              <div onClick={handleOpenAdopLetter}>
                <FaAngleDoubleUp
                  className={`${adopLetter ? "rotate-180" : ""}  duration-300 `}
                />
              </div>
            </div>
            {adopLetter && (
              <div
                className={`bg-adoplight pt-3 dark:bg-adopsoftdark w-full ${
                  adopLetter ? "h-[85%]" : "h-[0px]"
                }   duration-300 overflow-y-scroll  cursor-default flex flex-col-reverse`}
              >
                <div className="mb-5 "></div>
                {chatMessage &&
                  chatMessage.map((chat, index) => (
                    <div key={index} className=" mx-2 mt-3">
                      {chat.username === userData.username ? (
                        <div className="flex justify-end">
                          <div className="pr-2">
                            <div className="bg-adoplighticon dark:bg-adopsoftdark brightness-150 px-2 py-1 rounded-lg text-lg">
                              {chat.message}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex">
                          <div className="my-auto">
                            <img
                              className="w-[28px] h-[28px] rounded-full"
                              src={
                                chat.profileImage
                                  ? `https://pix.adoppix.com/public/${chat.profileImage}`
                                  : "https://pix.adoppix.com/image/adop.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="pl-2">
                            <div className="bg-adoplighticon dark:bg-adopsoftdark brightness-150 px-2 py-1 rounded-lg text-lg">
                              {chat.message}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            {adopLetter && (
              <div className="flex justify-between">
                <div className="my-auto mx-4 ">
                  <button>
                    <IoImage className="text-white" />
                  </button>
                </div>
                <div className="bg-adoplighticon dark:bg-adopsoftdark  rounded-full  py-1 px-2 mt-1">
                  <input
                    id="chatInput"
                    onChange={handleInputChat}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSubmitMessage();
                      }
                    }}
                    className="bg-adoplighticon dark:bg-adopsoftdark  text-sm h-[20px] my-auto px-auto"
                    type="text"
                  />
                </div>
                <div className="my-auto mx-4">
                  <button className=" mx-auto" onClick={handleSubmitMessage}>
                    <IoSendSharp className="text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`duration-300  py-2 bg-adoppix  text-adoplight rounded-t-lg ${
              adopLetter ? "h-[500px]" : "h-[60px]"
            } sm:w-[300px] ${
              adopLetter ? "w-[300px]" : "w-[80px]"
            } text-center`}
          >
            <div
              onClick={handleOpenAdopLetter}
              className="py-2 flex px-3 justify-between"
            >
              <div className="flex">
                {" "}
                <IoChatbubblesSharp className="text-white mx-2" />{" "}
                <div className="sm:flex hidden">AdopLetter</div>{" "}
              </div>
              <div className="flex">
                <FaAngleDoubleUp
                  className={`${adopLetter ? "rotate-180" : ""}  duration-300 `}
                />
              </div>
            </div>
            {adopLetter && (
              <div
                className={`bg-adoplight dark:bg-adopsoftdark w-full relative ${
                  adopLetter ? "h-[90%]" : "h-[0px]"
                }  duration-300 cursor-default`}
              >
                {chatList &&
                  chatList.map((list, index) => (
                    <ChatCard
                      key={index}
                      list={list}
                      index={index}
                      openChat={handleOpenChat}
                    />
                  ))}
                <div
                  onClick={() => setAddModal(true)}
                  className="absolute right-2 bottom-2 bg-adoppix text-white rounded-full"
                >
                  <IoAdd className="text-white text-[2rem] m-1" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <ModalAddChat onClose={handleOnClose} visible={addModal} />
    </div>
  );
};
