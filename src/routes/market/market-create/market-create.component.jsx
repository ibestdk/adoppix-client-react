import ImageUploading from "react-images-uploading";
import React from 'react';
import { useState } from "react";
import Chips from "../../../components/input/chips/chips";
import { AiFillSetting } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const MarketCreate = () => {
    const navigate = useNavigate();

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    // product type button
    const [typeProductState, setTypeProductState] = useState(false);
    const typeProductClicked = () => {
        setProductType(!typeProductState);
        setTypeProductState(!typeProductState);
        setImages();
    }

    // commercial button
    const commercialAllowClicked = () => {
        setcommercialAllowState(!commercialAllowState);
    }

    // sell type button
    const [sellTypeState, setSellTypeState] = useState(false);
    const sellTypeClicked = () => {
        setSellTypeState(!sellTypeState);
    }

    // data
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [productType, setProductType] = useState(false);
    const [commercialAllowState, setcommercialAllowState] = useState(false);
    const [amount, setAmount] = useState();
    const [tagsData, setTagsData] = useState([]);
    const [price, setPrice] = useState();
    // StickerCover Paramiter API
    const [stickerCover, setStickerCover] = useState([]);

    const titleSet = (e) => {
        setTitle(e.target.value);
    }

    const descriptionSet = (e) => {
        setDescription(e.target.value);
    }

    const priceSet = (e) => {
        setPrice(e.target.value);
    }

    const amountSet = (e) => {
        setAmount(e.target.value);
    }

    // data function
    const handleSubmit = async () => {
        const bodyData = new FormData();
        if (commercialAllowState) bodyData.append("CanCommercial", commercialAllowState);
        if (images)
            images.forEach((image) => bodyData.append("Images", image.file));
        if (stickerCover)
            stickerCover.forEach((image) => bodyData.append("StickerCover", stickerCover.file));
        if (title) bodyData.append("Title", title);
        if (description) bodyData.append("Description", description);
         if (productType){
            bodyData.append("ProductTypeId", 2);
         }
         else{
            bodyData.append("ProductTypeId", 1);
         }
        if (sellTypeState == false){
            bodyData.append("Amount", amount);
        }
        if (price) bodyData.append("Price", price);
        if (tagsData) tagsData.forEach((tag) => bodyData.append("Tags", tag));
        console.log(bodyData);
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        let result = await axios({
            method: "post",
            url: "https://api.adoppix.com/api/Product",
            data: bodyData,
            headers: headers,
        }).catch((err) => console.log(err.response));
        console.log(result.data);
        navigate(`${result.data}`);
    };

    

    return (
        <div className="dark:bg-adopdark bg-adoplight h-fit overflow-hidden relative">
            {/* <img className="w-full" src="https://i.pinimg.com/originals/09/ed/f3/09edf38f25419af1cf30e0bbf8d9e6df.jpg" alt="" /> */}
            <img className="flex-shrink-0 min-w-full h-[1800px] object-cover" src="https://www.enjpg.com/img/2020/4k-for-mobile-3.jpg" alt="" />
            <div className="h-full absolute w-full min-w-full min-h-full top-0  container m-auto grid grid-cols-1 gap-4 place-items-center">
                <div className=' grid grid-cols-1 bg-white dark:bg-adopsoftdark/70 text-opacity-100 w-3/5 h-full'>
                    <div className='w-2/3 mx-auto text-adopdark'>
                        <div className="my-14 text-center">
                            <b className="text-adoppix text-4xl opacity-100">
                                สร้างสินค้า
                            </b>
                        </div>
                        <div className="my-6">
                            <p className="text-start text-adopdark dark:text-adoplight">
                                ประเภทสินค้า
                            </p>
                            {typeProductState == false && (
                                <div className="bg-adoppix text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center mt-4 cursor-default duration-300">
                                    <b>
                                        ภาพวาด
                                    </b>
                                </div>
                            )}
                            {typeProductState == true && (
                                <div onClick={typeProductClicked} className="bg-adoplighticon text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center hover:bg-adoppix hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        ภาพวาด
                                    </b>
                                </div>
                            )}
                            {typeProductState == true && (
                                <div className="bg-adoppix text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center mt-4 cursor-default duration-300">
                                    <b>
                                        สติ้กเกอร์
                                    </b>
                                </div>
                            )}
                            {typeProductState == false && (
                                <div onClick={typeProductClicked} className="bg-adoplighticon text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center hover:bg-adoppix hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        สติ้กเกอร์
                                    </b>
                                </div>
                            )}
                        </div>
                        <div className="my-6">
                            <p className="text-start text-adopdark dark:text-adoplight">
                                สามารถใช้เชิงพาณิชย์
                            </p>
                            {commercialAllowState == false && (
                                <div className="bg-adoppix text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center mt-4 cursor-default duration-300">
                                    <b>
                                        ใช่
                                    </b>
                                </div>
                            )}
                            {commercialAllowState == true && (
                                <div onClick={commercialAllowClicked} className="bg-adoplighticon text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center hover:bg-adoppix hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        ใช่
                                    </b>
                                </div>
                            )}
                            {commercialAllowState == true && (
                                <div className="bg-adoppix text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center mt-4 cursor-default duration-300">
                                    <b>
                                        ไม่
                                    </b>
                                </div>
                            )}
                            {commercialAllowState == false && (
                                <div onClick={commercialAllowClicked} className="bg-adoplighticon text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center hover:bg-adoppix hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        ไม่
                                    </b>
                                </div>
                            )}
                        </div>

                        <div className="my-6">
                            <div className="App">
                                {/* Images */}
                                {typeProductState == false && (
                                    <ImageUploading
                                        value={images}
                                        onChange={onChange}
                                        dataURLKey="data_url"
                                        acceptType={["jpg", "png"]}
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper">
                                                <div onClick={onImageUpload} {...dragProps} style={isDragging ? { opacity: 0.75 } : undefined}
                                                    className="relative min-h-[240px] h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                                                    {/* <button
                                                    className="h-full w-full opacity-0 bg-transparent"
                                                    style={isDragging ? { color: 'adoppix' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                </button> */}
                                                    <p className="absolute z-40 top-1/2 cursor-default m-auto text-adoplight">
                                                        คลิก หรือ ลางวางเพื่ออัพโหลดรูปภาพ
                                                    </p>
                                                    {imageList.map((image, index) => (
                                                        <div key={index} className="image-item m-auto z-50 min-w-[400px] bg-adoppix rounded-md">
                                                            <img className="max-h-[800px] w-full m-auto inline-flex rounded-md" src={image['data_url']} alt="" width="100" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex mt-2">
                                                    <div onClick={onImageUpdate} className="p-2 mx-1 bg-adoppix text-adoplight text-base rounded-md cursor-pointer hover:scale-105 duration-300">
                                                        อัพเดทรูป
                                                    </div>
                                                    <div onClick={onImageRemove} className="p-2 mx-1 bg-red-500 text-adoplight text-base rounded-md cursor-pointer hover:scale-105 duration-300">
                                                        ลบรูป
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </ImageUploading>
                                )}
                                {/* Sticker */}
                                {typeProductState == true && (
                                    <ImageUploading
                                        value={images}
                                        multiple
                                        onChange={onChange}
                                        maxNumber={12}
                                        dataURLKey="data_url"
                                        acceptType={["jpg", "png"]}
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                            onImageRemove,
                                            onImageRemoveAll,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper">
                                                <div className="relative min-h-[240px] h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                                                    {/* <button
                                                className="h-full w-full opacity-0 bg-transparent"
                                                style={isDragging ? { color: 'adoppix' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                            </button> */}
                                                    <p onClick={onImageUpload} {...dragProps} style={isDragging ? { opacity: 0.75 } : undefined} className="absolute z-40 top-1/2 cursor-default m-auto text-adoplight">
                                                        คลิก หรือ ลางวางเพื่ออัพโหลดสติ้กเกอร์
                                                    </p>
                                                    <div className="grid grid-cols-3 gap-2 my-3">
                                                        {imageList.map((image, index) => (
                                                            <div key={index} className="image-item w-full rounded-md m-0 z-50 relative">
                                                                <img className="h-[240px] w-[240px] rounded-md object-cover overflow-hidden" src={image['data_url']} alt="" width="100" />
                                                                <AiFillSetting onClick={() => onImageUpdate(index)} className="text-adoplight p-1 rounded-md text-3xl bg-adoppix absolute right-12 bottom-2" />
                                                                <AiFillDelete onClick={() => onImageRemove(index)} className="text-adoplight p-1 rounded-md text-3xl bg-red-500 absolute right-2 bottom-2" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex mt-2">
                                                    <div onClick={onImageUpload} className="p-2 mx-1 bg-adoppix text-adoplight text-base rounded-md cursor-pointer hover:scale-105 duration-300">
                                                        เพิ่มสติ้กเกอร์
                                                    </div>
                                                    <div onClick={onImageRemoveAll} className="p-2 mx-1 bg-red-500 text-adoplight text-base rounded-md cursor-pointer hover:scale-105 duration-300">
                                                        ลบสติ้กเกอร์ทั้งหมด
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </ImageUploading>
                                )}
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start my-4 text-adopdark dark:text-adoplight">
                                ชื่อสินค้า
                            </p>
                            <div className="bg-adoppix rounded-md w-full opacity-100">
                                <input onChange={titleSet} className="rounded-md w-full outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon" type="text" />
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start my-4 text-adopdark dark:text-adoplight">
                                คำอธิบาย
                            </p>
                            <div className="bg-adoppix rounded-md w-full opacity-100">
                                <textarea onChange={descriptionSet} className="rounded-md w-full outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon resize-none h-40" type="text" />
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start text-adopdark dark:text-adoplight">
                                จำนวนสินค้า
                            </p>
                            {sellTypeState == false && (
                                <div onClick={sellTypeClicked} className="my-2 bg-adoplighticon text-adoplight rounded-md py-1 w-44 text-base text-center hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        ไม่จำกัดจำนวนสินค้า
                                    </b>
                                </div>
                            )}
                            {sellTypeState == true && (
                                <div className="bg-adoppix text-adoplight rounded-md py-1 w-44 text-base mr-2 text-center cursor-default mb-2 inline-block mt-2">
                                    <b>
                                        ไม่จำกัดจำนวนสินค้า
                                    </b>
                                </div>
                            )}
                            {sellTypeState == false && (
                                <div>
                                    <div className="bg-adoppix text-adoplight rounded-md py-1 w-44 text-base mr-2 text-center cursor-default mb-2 inline-block">
                                        <b>
                                            จำกัดจำนวนสินค้า
                                        </b>
                                    </div>
                                    <p className="text-base inline-block text-adopdark dark:text-adoplight">
                                        ระบุจำนวน
                                    </p>
                                    <div className="text-adopsoftdark rounded-md w-20 mx-2 outline outline-adoplighticon text-center mb-2 inline-block hover:scale-105 duration-300 h-10">
                                        <input className="w-20" type="number" />
                                    </div>
                                    <p className="text-base inline-block text-adopdark dark:text-adoplight">
                                        ชิ้น
                                    </p>
                                </div>
                            )}
                            {sellTypeState == true && (
                                <div onClick={sellTypeClicked} className="mt-1 mb-9 bg-adoplighticon text-adoplight rounded-md py-1 w-44 text-base text-center hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        จำกัดจำนวนสินค้า
                                    </b>
                                </div>
                            )}

                        </div>

                        <div className="my-6">
                            {/* บัคกด Enter แล้วมันรับ Tag ว่าง */}
                            <p className="text-start my-4 text-adopdark dark:text-adoplight">
                                แท็ค
                            </p>
                            <div className="mt-2 text-adopdark dark:text-adoplight">
                                <Chips tagsData={tagsData} setTagsData={setTagsData} />
                            </div>

                            <div className="my-6">
                                <p className="text-start my-4 text-adopdark dark:text-adoplight">
                                    ราคา
                                </p>
                                <div className="bg-adoppix rounded-md w-1/5 opacity-100 inline-block">
                                    <input onChange={priceSet} className="rounded-md w-full outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon" type="number" />
                                </div>
                                <div className="inline-block text-adoppix ml-3">
                                    Adop Coins
                                </div>
                            </div>

                            <div className="my-6">

                                <div className="w-fit text-base text-center mt-4 mx-auto cursor-default">
                                    <div className="py-2">
                                        <p className="text-center text-sm text-adopdark dark:text-adoplight">
                                            โปรดอ่าน
                                            <b className="text-adoppix px-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300">
                                                Term of use
                                            </b>
                                            และ
                                            <b className="text-adoppix px-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300">
                                                Term of payment
                                            </b>
                                            ก่อนการสร้างสินค้า เพื่อตัวของผู้ใช้เอง
                                        </p>
                                    </div>
                                    <p onClick={handleSubmit} className="bg-adoppix text-adoplight rounded-md py-2 px-4 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300">
                                        ฉันยอมรับ Term of use & Term of payment และ รับทราบแล้ว
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}