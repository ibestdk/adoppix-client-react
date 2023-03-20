import { Outlet } from "react-router-dom";
import BackToTopButton from "../../components/backToTop/backToTop";
export const Feeds = () => {
  return (
    <div>
      <div>
        <BackToTopButton />
        <div className="px-[25%] pt-5 bg-adopdark">
          <div className="container rounded-lg  mx-auto ">
            <div className="flex">
              <div className="sticky top-12 h-screen w-40 ">
                <div>asdasdasd</div>
                <div>asdasdasd</div>
                <div>asdasdasd</div>
                <div>asdasdasd</div>
                <div>asdasdasd</div>
              </div>
              <main className="flex-1">
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
