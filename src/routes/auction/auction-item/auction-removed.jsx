import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from 'react-icons/bi';
export const AuctionRemoved = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/auction');
      }, 6000);
  
      return () => clearTimeout(timer);
    }, [navigate]);
  
    
 
    return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center  text-xl">
      <BiErrorCircle className="text-[10rem]"/>
        <div className="text-2xl">ไม่พบหน้าการประมูล</div>
        <div className="opacity-60">กำลังนำคุณกลับไปยังหน้าการประมูลหลัก</div>
      </div>
    </div>
  );
};
