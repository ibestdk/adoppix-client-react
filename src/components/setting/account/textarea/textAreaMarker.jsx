// ElementMaker.js
import React from "react";
import "./textAreaMarker.scss";
import { BsFillEmojiSmileFill } from "react-icons/bs";
// Create an ElementMaker component
function TextAreaMaker(props, { onClose }) {
  const handleOnClose = (e) => {
    //console.log("ข้างนอก");
    if (e.target.id === "text-area") onClose();
  };

  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <div className="relative" onBlur={props.handleBlur}>
            <div>
              <textarea
                id="text-area"
                // onClick={handleOnClose}
                type="text"
                value={props.value}
                onChange={props.handleChange}
                autoFocus
                className="text-adopdark rounded-lg relative dark:bg-adopsoftdark dark:text-adoplight border-none outline-none ml-3 w-[600px] min-h-[100px] max-h-[450px]"
              >
                <div className="absolute right-2 bottom-5 text-xl">
                  <BsFillEmojiSmileFill className="hover:opacity-60 duration-200 cursor-pointer" />
                </div>
              </textarea>
            </div>
          </div>
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            className="ml-5 rounded-lg p-2 text-sm whitespace-pre-wrap bg-adopsoftdark w-[600px] min-h-[100px] h-auto"
            style={{
              display: "inline-block",

            }}
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default TextAreaMaker;
