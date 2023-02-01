import "./radio.scss"
import "./scrollbar.scss";
import { useState, useEffect } from "react";
import React from "react";
import ImageUploading from 'react-images-uploading';
import { BsImage, BsTrash, BsPencil } from 'react-icons/bs';
import Chips from "../../../components/input/chips/chips";
import { getToken } from "../../../services/authorize";
import axios from "axios";
export const AuctionCreate = () => {
  //froms states
  const [hotClose, setHotClose] = useState(false);

  //froms 
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [hourCount, setHourCount] = useState();
  const [openPrice, setOpenPrice] = useState();
  const [minimumBid, setMinimumBid] = useState();
  const [hotClosePrice, setHotClosePrice] = useState();
  const [tagsData, setTagsData] = useState([]);


  function dataURLtoFile(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = window.atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], generateRandomString(), { type: mime });
  }

  function base64ArrayToFiles(base64DataArray) {
    return base64DataArray.map((base64Data, i) => {
      const arr = base64Data.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `file-${i}.jpeg`, { type: mime });
    });
  }


  function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleDescription = (e) => {
    setDescription(e.target.value);
  }
  const handleHourCount = (e) => {
    setHourCount(e.target.value);
  }
  const handleOpenPrice = (e) => {
    setOpenPrice(e.target.value);
  }
  const handleMinimumBid = (e) => {
    setMinimumBid(e.target.value);
  }
  const handleHotClosePrice = (e) => {
    setHotClosePrice(e.target.value);
  }


  const maxNumber = 10;


  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  const handleHotClose = (e) => {
    setHotClose(str2bool(e.target.value));
  }

  var str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  }


  const handleSubmit = () => {
    const fromdata = {};

    if (images) {
      console.log(images)
      fromdata.Images = images.map(image => image.file)
    }
    if (title) {
      fromdata.Title = title;
    }
    if (description) {
      fromdata.Description = description;
    }
    if (hourCount) {
      fromdata.HourCount = hourCount;
    }
    if (openPrice) {
      fromdata.OpenPrice = openPrice;
    }
    if (minimumBid) {
      fromdata.MinimumBid = minimumBid;
    }
    if (hotClose) {
      fromdata.HotClose = hotClosePrice;
    }
    if (tagsData) {
      fromdata.Tags = tagsData;
    }
    console.log(fromdata);
    const token = getToken();
    console.log(token);
    // const fromData = fromdata;
    // console.log(fromData);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    axios.post("https://api.adoppix.com/api/Auction", fromdata, { headers })
      .then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err.response);
      })

  };



  return (
    <div
      style={{
        backgroundImage: `url(${"https://cdn.discordapp.com/attachments/681151360305201169/1067714984852856852/103323116_p0.png"})`,
      }}
      className="dark:bg-adopdark bg-adoplight min-h-screen bg-full bg-cover  bg-no-repeat bg-scroll"
    >
      <div className=" backdrop-blur-sm ">
        <div className="relative container m-auto">
          <div className="mx-[20%] bg-white dark:bg-adopsoftdark/70  h-[2300px]  p-14  text-opacity-100">
            <div className="text-center text-6xl text-adoppix">
              สร้างการประมูล
            </div>
            <div className="mx-32">
              <div >
                <div >
                  <h3 className="text-left text-xl pt-5 text-adopdark dark:text-adoplight" >เชิงพาณิชย์</h3>
                </div>
                <div>
                  <div className="wrapper">
                    <input type="radio" name="select" id="option-1" />
                    <input type="radio" name="select" id="option-2" />
                    <label htmlFor="option-1" className="option option-1">
                      <div className="dot"></div>
                      <span>อนุญาติ</span>
                    </label>
                    <label htmlFor="option-2" className="option option-2">
                      <div className="dot"></div>
                      <span>ไม่อนุญาติ</span>
                    </label>
                  </div>
                </div>
                <div className="mt-4">
                  <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    acceptType={["jpg", "png"]}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps
                    }) => (
                      // write your building UI
                      <div className="upload__image-wrapper">
                        <div className="border-dashed overflow-y-hidden   border-[3px] w-full h-[300px] rounded-lg relative ">
                          <button className={`hover:opacity-30 hover:bg-adopsoftdark hover:bg-opacity-70 duration-500  w-full h-full ${isDragging ? " opacity-30 " : ""}`}
                            style={isDragging ? {} : null}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <div className="text-center mx-auto w-auto flex align-middle ">
                              <div className="mx-auto flex">
                                <div className="mx-3">
                                  <BsImage className="p-auto" />
                                </div>
                                <div className="">
                                  คลิกหรือลากวาง
                                </div>
                              </div>
                            </div>
                          </button>

                          <div className="absolute top-0 m-5 flex ">
                            <div  >
                              <div className=" overflow-x-scroll  space-x-2 " style={{ display: "ruby" }}>
                                {imageList.map((image, index) => (
                                  <div key={index} className=" bg-red-400" >
                                    <div className="image-item relative">
                                      <img src={image.data_url} alt="" className="h-[220px] w-full  object-contain" />
                                      <div className="image-item__btn-wrapper absolute right-0 top-0">
                                        <div>
                                          <button onClick={() => onImageUpdate(index)}><BsPencil /></button>
                                        </div>
                                        <div>
                                          <button onClick={() => onImageRemove(index)}>  <BsTrash /></button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        &nbsp;
                        <div className="w-full relative">
                          <button className="right-0 text-lg absolute hover:opacity-50 duration-200" onClick={onImageRemoveAll}>
                            <div>
                              <div className="flex ">
                                <div className="m-auto">
                                  <BsTrash />
                                </div>
                                <div>
                                  ลบทั้งหมด
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>

                      </div>
                    )}
                  </ImageUploading>
                </div>
                <div className="mt-14">
                  <div className="mt-4">
                    <label htmlFor="">ชื่อการประมูล</label>
                    <input onChange={handleTitle} type="text" id="default-input" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">รายละเอียดการประมูล</label>
                    <textarea onChange={handleDescription} type="text" id="default-input" className="mt-2 h-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">ระยะเวลาการประมูล</label>
                    <input onChange={handleHourCount} type="number" id="default-input" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">ราคาเริ่มต้น</label>
                    <input onChange={handleOpenPrice} type="number" id="default-input" className="mt-2 bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">จำนวนบิดขั้นต่ำ</label>
                    <input onChange={handleMinimumBid} type="number" id="default-input" className="mt-2 bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-adopsoftdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" />
                  </div>
                  <div className="mt-4">
                    <div >
                      <h3 className="text-left text-xl pt-5 text-adopdark dark:text-adoplight" >ปิดเมื่อราคาถึง</h3>
                    </div>
                    <div>
                      <div className="wrapper" onChange={handleHotClose}>
                        <input type="radio" name="select2" defaultChecked={hotClose === true} value={true} id="hotclose" />
                        <input type="radio" name="select2" defaultChecked={hotClose === false} value={false} id="nohotcost" />
                        <label htmlFor="hotclose" className="option hotclose">
                          <div className="dot"></div>
                          <span>มี</span>
                        </label>
                        <label htmlFor="nohotcost" className="option nohotcost">
                          <div className="dot"></div>
                          <span>ไม่มี</span>
                        </label>
                      </div>
                      {hotClose &&
                        <div className="flex">
                          <p className="text-sm my-auto">
                            ระบุจำนวน
                          </p>
                          <input onChange={handleHotClosePrice} pattern="[0-9]" className="bg-adopsoftdark m-4 rounded-lg dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400" type="number" />
                        </div>
                      }
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">เเท็ก</label>
                    <div className="mt-2">
                      <Chips tagsData={tagsData} setTagsData={setTagsData} />
                    </div>
                  </div>



                  <div className="mt-4">
                    <label htmlFor="">กฎและข้อตกลงของเว็บไซต์</label>
                    <div className="mt-2 border-dashed border-[2px] rounded-lg bg-adopsoftdark bg-opacity-80">
                      <span
                        className="  text-sm whitespace-pre-wrap  p-2 indent-4"
                        style={{
                          display: "inline-block",

                        }}
                      >
                        การลงผลงานในทุกรูปแบบจะต้องอยู่ในกฏการใช้งานของทางเว็บไซต์หากผิดกับเงื่อนไขการใช้งานหรือ กฏที่มี  ทางเว็บไซต์จะมีสิทธิ์ในการระงับผลงานดังกล่าวรวมถึงผู้ใช้ที่กระทำผิดโดยที่มิต้องแจ้งล่วงหน้าโดย ทันที หากมีการระงับบัญชีผู้ใช้ที่มีความผิดอย่างถาวร currency ของเว็บที่ผู้ใช้ถือไว้จะถือว่าเป็นผลประโยชน์ ของเว็บไซต์ทันที
                      </span>
                      <span
                        className="  text-sm whitespace-pre-wrap  p-2 indent-4"
                        style={{
                          display: "inline-block",

                        }}
                      >
                        หากผลงานมีความเฉพาะเจาะจงกับความชอบของผู้ใช้บางกลุ่ม หรือมีความเสี่ยง สามารถลด ความเสี่ยงได้โดยการเพิ่ม Tag (warning) ที่มี Sensor ให้กับ content เฉพาะเจาะจง แต่ไม่ขัดกับกฏของ เว็บไซต์
                      </span>
                      <span
                        className="  text-sm whitespace-pre-wrap p-2 indent-4"
                        style={{
                          display: "inline-block",

                        }}
                      >
                        กฏของเว็บไซต์จะสามารถเปลี่ยนแปลงได้ตลอดเวลา และหากมีการเปลี่ยนแปลงกฏ จะมีการลงโทษ ย้อนหลัง โดยการลงโทษจะขึ้นอยู่กับดุลยพินิจของผู้ดูแล โดยที่การลงโทษที่ต่ำที่สุดคือระงับ content ดังกล่าวออกจากระบบ
                      </span>
                      <span
                        className="  text-sm whitespace-pre-wrap p-2 indent-4"
                        style={{
                          display: "inline-block",

                        }}
                      >
                        ทั้งนี้ หากมีการกระทำผิดภายนอกเว็บไซต์ หรือนอกเหนือการดูแลของระบบทางเว็บไซต์จะไม่มีส่วน เกี่ยวข้องกับผู้ใช้ที่กระทำผิด พร้อมทั้งยินยอมการให้การ ช่วยเหลือกับทางเจ้าหน้าที่โดยการเข้าถึงข้อมูล ผู้ใช้ที่กระทำผิดได้โดยทันที ผ่าน ระบบกฏหมาย
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-center">
                      <button onClick={handleSubmit} className="bg-adoppix mx-auto mt-5 rounded-lg py-2 px-4 text-center hover:bg-[#2B6FA0] duration-200 text-lg" type="submit" >ยอมรับกฏและทำการสร้างการประมูล</button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
