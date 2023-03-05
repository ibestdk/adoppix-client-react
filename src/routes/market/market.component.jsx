import { Outlet } from "react-router-dom";

export const Market = () => {
    return(
        <div>
            {/* <div className="flex justify-end">
                <div  className="hover:bg-adoplighticon duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                    <FaStar className="h-11 w-11 p-2 text-adopdark dark:text-adoplight"/>
                </div>
                <div className="hover:bg-adoplighticon duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                    <AiOutlineShoppingCart className="p-2 h-11 w-11 text-adopdark dark:text-adoplight"/>
                </div>
            </div> */}
            <Outlet />
        </div>
    )
}