export const Auction = () => {
  return (
    <div className="bg-adoplight dark:bg-adopdark">
      <div className="container flex flex-row m-auto">
        <div className="columns-3 rounded-lg m-5 h-[400px] w-[350px] bg-adopsoftdark shadow-lg"></div>
        <div className="columns-9 rounded-lg m-5 h-[1000px] w-full bg-adopsoftdark shadow-lg "></div>
      </div>

      <div className="container m-auto">
        <div className="grid grid-cols-12 gap-4">
          <div className="bg-adopsoftdark ml-5 mr-5 col-span-3 h-[600px] rounded-lg">4</div>
          <div className="bg-adopsoftdark mr-5 col-span-9 h-[1000px] rounded-lg">7</div>
        </div>
      </div>
    </div>
  );
};
