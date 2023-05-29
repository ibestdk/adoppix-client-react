import ImageUploading from "react-images-uploading";
import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import Chips from "../../../components/input/chips/chips";
import { AiFillSetting } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BarChart from "./BarChart.component";

import Chart from 'chart.js/auto';


export const MarketDashBord = () => {

    const [user, setUser] = useState();
    const userSet = (e) => {
        setUser(e.target.value);
    }

    return (
        <div>
            <div className="mt-40 mx-auto w-full h-full min-h-screen">
                <div className="mx-auto pl-80">
                    <div>
                        <div className="text-white">
                            สินค้าที่ขายออกทั้งหมด 3 เดือน
                        </div>
                        <div className="max-h-[600px]">
                            <BarChart />
                        </div>
                    </div>
                    <div className="my-20">
                        <div className="text-white">
                            สินค้าที่ขายออกทั้งหมด 3 เดือน ของผู้ใช้
                            <div className="ml-5 inline-block rounded-md">
                                <input onChange={userSet} className="text-adopdark rounded-md outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon" type="text" />
                            </div>
                        </div>
                        <div className="max-h-[600px]">
                            <BarChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}