import { Outlet } from "react-router-dom";

export const TopUp = () => {
  return (
    <div className="bg-adoplight dark:bg-adopdark   overflow-y-hidden ">
      <Outlet />
    </div>
  );
};

