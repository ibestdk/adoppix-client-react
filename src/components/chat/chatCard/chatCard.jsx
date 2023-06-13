import React, { useState, useRef, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const ChatCard = ({ list, index, openChat }) => {
  //const [connection, setConnection] = useState(null);

  // useEffect(() => {
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl(`https://api.adoppix.com/hub/chat`)
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(newConnection);
  // }, []);
  const [lastMessage, setLastMessage] = useState(list);

  useEffect(() => {
    console.log(list)
    setLastMessage(list);
    console.log(lastMessage)
  }, []);

  const chatHub = new signalR.HubConnectionBuilder()
    .withUrl('https://api.adoppix.com/hub/chat')
    .withAutomaticReconnect()
    .build();
  
  chatHub.start().then(() => {
    console.log('Hub chat connect')
  }).catch(err => console.log(err));

  let count = 0;
  chatHub.on(list.chatRoomId, (messageData) => {;
    if (count === 0) {
      console.log('---------------------');
      console.log(lastMessage)

      let newLastMessage = lastMessage;
      newLastMessage.lastMessage = messageData.message;
      newLastMessage.lastMessageType = messageData.type;
      newLastMessage.lastTime = messageData.created;
      // newLastMessage.relativeTime = getRelativeTime(messageData.created);

      console.log(messageData);
      console.log('---------------------');
      setLastMessage(newLastMessage);
      count++;
    }
  });

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

  // useEffect(() => {
  //   console.log(list)
  //   if (list.chatRoomId) {
  //     if (connection) {
  //       connection
  //         .start()
  //         .then(() => {
  //           //console.log("hub SignalR Chat Connected! ✨");
  //         })
  //         .catch((error) => console.log(`SignalR error: ${error}`));

  //       connection.on(`${list.chatRoomId}`, (message) => {
  //         // Do something with the received message
  //         let newLastMessage = lastMessage;
  //         newLastMessage.lastMessage = message.message;
  //         newLastMessage.lastMessageType = message.type;
  //         newLastMessage.lastTime = message.created;
  //         setLastMessage(newLastMessage);
  //         console.log(list);
  //         console.log(message);
  //       });
  //     }
  //   }
  // }, [connection]);

  return (
    <div
      key={list.chatRoomId}
      className="hover:brightness-75 cursor-pointer duration-200 bg-red-600 dark:bg-adopsoftdark px-4 py-2 flex"
    >
      <div
        className="flex"
        onClick={() => {
          openChat( lastMessage.chatRoomId , lastMessage.name);
        }}
      >
        <div className="mx-2">
          <img
            className=" rounded-full w-[50px] h-[50px]"
            src={
              lastMessage.profileImage
                ? `https://pix.adoppix.com/public/${lastMessage.profileImage}`
                : "https://pix.adoppix.com/image/adop.png"
            }
            alt=""
          />
        </div>
        <div>
          <div className="text-adopdark dark:text-adoplight text-lg text-left">
            {lastMessage.name}
          </div>
          <div className="text-adoplighticon text-sm text-left">
            {lastMessage.lastMessage} - {lastMessage.relativeTime}
          </div>
        </div>
      </div>
    </div>
  );
};
