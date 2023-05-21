import { Outlet } from "react-router-dom";
import { WishList } from "./market-index/like/wishlist";
import { CartList } from "./market-index/like copy/cart";
import { useState } from "react";

export const Market = () => {
    const [i, setI] = useState(0);
    return(
        <div>
        <div className="  sticky pt-10 z-20">
        <div className=" flex mr-10 justify-end items-end  space-x-4">
          <WishList istate={i} />
          <CartList istate={i} />
        </div>
      </div>
            <Outlet />
        </div>
    )
}