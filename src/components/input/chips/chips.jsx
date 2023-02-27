
import React, { useState, useRef } from "react";
import { BsXCircle} from "react-icons/bs";
import "./chips.scss";

import TextField from '@mui/material/TextField';


export default function Chips({ tagsData , setTagsData }) {


    // interface tagsData {
    //     key: number;
    //     label: string;
    // }



    const handleDelete = (chipToDelete) => () => {
        setTagsData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };
    const handleAdd = (newChip) => () => {
        // setTagsData(newChip)
        setTagsData([...tagsData, newChip]);
    };

    const handleKeyDown = (newChip ) => {
        if (newChip.key === 'Enter') {
          // 👇 Get input value
          // console.log(newChip.target.value);
          setTagsData([...tagsData, newChip.target.value]);
          newChip.target.value = '';
        }
      };







    return (
        <div className="p-3 border-dashed border-[2px] rounded-lg bg-adopsoftdark bg-opacity-75">
            <div className="w-full flex space-x-2 flex-wrap">


                {tagsData && tagsData.map((data, chipIndex) => (
                    <div key={chipIndex} className="py-1 px-4 bg-adopsoftdark rounded-lg m-1 flex shadow-lg ">
                        <p className="text-sm cursor-default">
                            {data}
                        </p>
                        <BsXCircle className="text-lg my-1 ml-3 hover:opacity-50 duration-150" onClick={handleDelete(data)}
                        />
                       
                    </div>


                ))}


                <input placeholder="เขียนบางสิ่ง" type="text" className="bg-transparent focus:border-none border-transparent focus:border-transparent focus:ring-0" onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}
