import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";


export const WishListCardSkeleton = () => {
    return ( 
      <div className="my-5 grid grid-cols-6 gap-4 place-items-center">
                  <div className="dark:bg-adopsoftdark bg-adoplighticon col-span-2 rounded-md w-60 h-40 mr-2 flex animate-pulse">
                    <div className="rounded-md w-full h-full"></div>
                  </div>
                  <div className="inline-block col-span-3 animate-pulse">
                    <div className="h-8 w-full rounded-md bg-adoplighticon dark:bg-adopsoftdark"></div>
                    <div className="h-5 w-full rounded-md bg-adoplighticon dark:bg-adopsoftdark mt-3"></div>
                    <div className="my-2 cursor-default">
                      <div className="inline-block mx-1">
                        <div className="rounded-full h-6 w-6 bg-adoplighticon dark:bg-adopsoftdark"></div>
                      </div>
                      <div className="inline-block h-5 w-32 rounded-md bg-adoplighticon dark:bg-adopsoftdark mt-3 mr-2"></div>
                      <div className="inline-block">
                        <GoVerified className="text-adoplighticon dark:text-adopsoftdark h-5 w-5"></GoVerified>
                      </div>
                    </div>
                    <hr />
                    <div className="mt-2">
                      <div className="inline-block text-adoplighticon dark:text-adopsoftdark">
                        <div className="inline-block px-1">
                          <FaTrash className="text-lg"></FaTrash>
                        </div>
                        <div className="inline-block h-5 w-5 rounded-md bg-adoplighticon dark:bg-adopsoftdark"></div>
                      </div>
                      <div className="inline-block px-2 cursor-default text-adoplighticon">
                        |
                      </div>
                      <div className="inline-block text-adoplighticon dark:text-adopsoftdark">
                        <div className="inline-block px-1">
                          <AiOutlineShoppingCart className="text-lg"></AiOutlineShoppingCart>
                        </div>
                        <div className="inline-block h-5 w-20 rounded-md bg-adoplighticon dark:bg-adopsoftdark"></div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md h-8 w-32 bg-adoplighticon dark:bg-adopsoftdark animate-pulse"></div>
                </div>
    )
}