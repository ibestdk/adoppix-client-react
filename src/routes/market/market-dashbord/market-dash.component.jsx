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
    useEffect(() => {
        fetchData();
        allDash();
    }, []);

    const [user, setUser] = useState();
    const userSet = (e) => {
        setUser(e.target.value);
    }

    const [datas, setDatas] = useState();
    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.adoppix.com/api/Dashbord');
            setDatas(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [all, setall] = useState();
    const allDash = async () => {
        try {
            const response = await axios.get('https://api.adoppix.com/api/Dashbord/All');
            setall(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [dataNs, setDataNs] = useState();
    const dashByName = async (name) => {
        try {
            const response = await axios.get(`https://api.adoppix.com/api/Dashbord/${name}`);
            setDataNs(response.data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            {datas && all && (
                <div className="mt-40 mx-auto w-full h-full min-h-screen">
                    <div className="mx-auto pl-80">
                    <div>
                            <div className="text-adoppix text-3xl my-10 pl-[405px]">
                                สินค้าที่ขายออกทั้งหมดในเว็บ {all && all.data} ชิ้น
                            </div>
                        </div>
                        <div>
                            <div className="text-white">
                                สินค้าที่ขายออกทั้งหมด 3 เดือน
                            </div>
                            <div className="max-h-[600px]">
                                <BarChart datas={datas} labels={"ยอดขายสินค้าทั้งหมดในเว็บประจำเดือน"} />
                            </div>
                        </div>
                        <div className="my-20">
                            <div className="text-white">
                                สินค้าที่ขายออกทั้งหมด 3 เดือน ของผู้ใช้
                                <div className="ml-5 inline-block rounded-md">
                                    <input onChange={userSet} className="text-adopdark rounded-md outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon" type="text" />
                                </div>
                                <p onClick={() => dashByName(user)} className="inline-block ml-5 bg-adoppix text-adoplight rounded-md py-2 px-4 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300">
                                    ดูกราฟ
                                </p>    
                            </div>
                            {dataNs && (
                                <div className="max-h-[600px]">
                                    <BarChart datas={dataNs} labels={"ยอดขายประจำเดือนของผู้ใช้"} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}