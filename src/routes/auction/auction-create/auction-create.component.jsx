import "./radio.scss"

export const AuctionCreate = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${"https://cdn.discordapp.com/attachments/681151360305201169/1067714984852856852/103323116_p0.png"})`,
      }}
      className="dark:bg-adopdark bg-adoplight min-h-screen bg-full bg-cover  bg-no-repeat bg-scroll"
    >
      <div className=" w-screen backdrop-blur-sm ">
        <div className="relative container m-auto">
          <div className="mx-[20%] bg-white dark:bg-adopsoftdark/70  h-[2000px]  p-14  text-opacity-100">
            <div className="text-center text-6xl text-adoppix">
              สร้างการประมูล
            </div>
            <div className="mx-32">
              <div >
                <div >
                  <h3 className="text-left text-xl pt-5 text-adopdark dark:text-adoplight" >เชิงพาณิชย์</h3>
                </div>
                <div>
                  <div class="wrapper">
                    <input type="radio" name="select" id="option-1" checked />
                    <input type="radio" name="select" id="option-2" />
                    <label for="option-1" class="option option-1">
                      <div class="dot"></div>
                      <span>อนุญาติ</span>
                    </label>
                    <label for="option-2" class="option option-2">
                      <div class="dot"></div>
                      <span>ไม่อนุญาติ</span>
                    </label>
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
