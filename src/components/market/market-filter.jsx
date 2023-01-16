import shadows from "@mui/material/styles/shadows";
import { margin, rgbToHex } from "@mui/system";

const MarketFilter = () => {
    const gridStyle = {
        margin: "1rem 0",
        boxShadow: "0 0 5px lightgray",
        padding: "1rem",
        borderRadius: ".5rem"
    };
    const inputTextStyle = {
        outline: "none !important",
        borderColor: "rgb(212,212,212) !important",
        width: "100%"
    };
    const inputRadioStyle = {
        outline: "none !important",
        borderColor: "rgb(212,212,212) !important"
    };
    return (
      <div className="container">
        <div className="row h-7 pt-10 pb-5 mb-10">
            <div className="flex relative">
                <p className="text-left absolute left-6 text-3xl font-bold no-underline duration-300 text-adopdark dark:text-adoplight">
                    Market Item
                </p>
            </div>
        </div>

        <div className="row mt-5 m-auto">
            <div className="row mt-4">
                <button className="text-center w-full px-4 py-2 rounded-md bg-adoppix hover:opacity-90 duration-300 text-white shadow-md">
                    Market Item
                </button>
            </div>
            <div className="row mt-4">
                <button className="text-center w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 dark:text-adoplight hover:dark:bg-adoppix 
                hover:bg-adoppix hover:text-white duration-300 text-adopsoftdark shadow-md">
                    My Shop
                </button>
            </div>
            <div className="row">
                <div className="dark:bg-adopsoftdark dark:text-adoplight dark:shadow-md" style={gridStyle}>
                    <div className="mt-2">
                        <h5>
                            ชื่อสินค้า
                        </h5>
                        <hr />
                        <form action="">
                            <div className="flex mt-3">
                                <input type="text" className="shadow-md ml-2 mr-1 mb-1 mt-1 inline-block rounded-md text-adopdark" style={inputTextStyle} />
                            </div>
                        </form>
                    </div>
                    <div className="mt-2">
                        <h5>
                            ชื่อศิลปิน
                        </h5>
                        <hr />
                        <form action="">
                            <div className="flex mt-3">
                                <input type="text" className="shadow-md ml-2 mr-1 mb-1 mt-1 inline-block rounded-md text-adopdark" style={inputTextStyle} />
                            </div>
                        </form>
                    </div>
                    <div className="mt-2">
                        <h5>
                            แท็ก
                        </h5>
                        <hr />
                        <form action="">
                            <div className="flex mt-3">
                                <input type="text" className="shadow-md ml-2 mr-1 mb-1 mt-1 inline-block rounded-md text-adopdark" style={inputTextStyle} />
                            </div>
                            <h5 className="mt-2">
                                แท็กที่ถูกค้นหาบ่อย
                            </h5>
                            <hr />
                            <div className="flex">
                                <input type="radio" name="tag" className="shadow-md m-1  inline-block rounded-md" style={inputRadioStyle} />
                                <label className="flex shadow-md"> Cat</label>
                            </div>
                        </form>
                    </div>
                    <div className="mt-2">
                        <h5>
                            ความใหม่ของสินค้า
                        </h5>
                        <hr />
                        <form action="">
                            <div className="flex">
                                <input type="radio" style={inputRadioStyle} name="productLife" className="shadow-md m-1 inline-block rounded-md" />
                                <label className="flex shadow-md">ใหม่</label>
                            </div>
                            <div className="flex">
                                <input type="radio" style={inputRadioStyle} name="productLife" className="shadow-md m-1 inline-block rounded-md" />
                                <label className="flex shadow-md">เก่า</label>
                            </div>
                        </form>
                    </div>
                    <div className="mt-2">
                        <h5>
                            ราคา
                        </h5>
                        <hr />
                    </div>
                    <div className="mt-2 w-full">
                        <button type="submit" className="w-full inline-block align-middle p-3 bg-adoppix shadow-lg rounded-md">
                            <p className="mb-0"> <i className=""></i> ค้นหา</p>
                        </button>
                    </div>  
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default MarketFilter;