import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../../services/authorize";
export const Feeds = () => {


  return (
    <div>
      <div>
        <div className="sm:px-[25%]   pt-5 bg-adopdark">
          <div className="container rounded-lg  mx-auto ">
            <div className="flex">
              <div className="sticky top-12 h-screen w-40 hidden sm:block">
{    /*            <div>asdasdasd</div>
                <div>asdasdasd</div>
                <div>asdasdasd</div>
                <div>asdasdasd</div>
  <div>asdasdasd</div> */}
              </div>
              <main className="sm:flex-1 ">
                <Outlet />
              </main>
              <div className="sticky top-12 h-screen w-40 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
