import React, { useState, useRef, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export const ChatCard = ({ list, index, openChat }) => {
  const [connection, setConnection] = useState(null);
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://api.adoppix.com/hub/chat`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (list.chatRoomId) {
      if (connection) {
        connection
          .start()
          .then(() => {
            console.log("hub SignalR Chat Connected! ✨");
          })
          .catch((error) => console.log(`SignalR error: ${error}`));

        connection.on(`${list.chatRoomId}`, (message) => {
          console.log("received heart beat from chat 💖");
          console.log("New message received: ", message);

          // Do something with the received message
        });
      }
    }
  }, [connection]);

  return (
    <div
      key={list.chatRoomId}
      className="hover:brightness-75 cursor-pointer duration-200 bg-red-600 dark:bg-adopsoftdark px-4 py-2 flex"
    >
      <div
        className="flex"
        onClick={() => {
          openChat(list.chatRoomId);
        }}
      >
        <div className="mx-2">
          <img
            className=" rounded-full w-[50px] h-[50px]"
            src={`https://pix.adoppix.com/public/${list.profileImage}`}
            alt=""
          />
        </div>
        <div>
          <div className="text-adopdark dark:text-adoplight text-lg text-left">
            {list.name}
          </div>
          <div className="text-adoplighticon text-sm text-left">
            {list.lastMessage} - {list.relativeTime}
          </div>
        </div>
      </div>
    </div>
  );
};
