// ElementMaker.js
import React from "react";
import "./elementMarker.scss"
// Create an ElementMaker component
function ElementMaker(props) {
  return (
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
            className="text-adopdark rounded-lg dark:bg-adopsoftdark dark:text-adoplight border-none outline-none w-[200px] m-3 ml-5"
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            className="m-5 bg-adopsoftdark p-2 rounded-lg inline-block text-lg w-[200px]"
           
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default ElementMaker;