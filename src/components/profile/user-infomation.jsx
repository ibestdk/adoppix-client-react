const UserProfileInfomation = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <div>
            <div className="relative">
              <div>
                <img
                  className="shadow-lg rounded-b-2xl m-auto h-[300px]  w-full object-cover"
                  src="https://pix.adoppix.com/public/368443ba-e19e-4207-85b3-d51bb8c5d401.jpg"
                ></img>
              </div>
            </div>
          </div>
          <div className="absolute top-52 left-24 border-[20px] rounded-full dark:border-adopdark border-adoplight shadow-lg">
            <div className="relative">
              <div>
                <img
                  className="shadow-lg m-auto h-[180px]  w-[180px] rounded-full object-cover "
                  src="https://pix.adoppix.com/public/1f535da9-d0ae-4519-b513-26e29c7cfde2.jpg"
                ></img>
              </div>
              <div className="absolute top-0 left-0 text-4xl w-[180px] h-[180px]"></div>
            </div>
          </div>
          <div className="relative left-[30%]">
            <div>ibestdk</div>
            <div>5352 คนกำลังวิ่งตาม</div>
            <div className="w-[600px]">
              สำหรับบรรยากาศภายใน ทางร้านอยากเน้นในทุก ๆ โซน
              แวดล้อมไปด้วยบรรยากาศสบาย ๆ และเป็นกันเองมากที่สุด
              จึงเลือกตกแต่งร้านด้วยโทนสีขาวเป็นหลัก เฟอร์นิเจอร์ไม้สีอ่อน
            </div>
          </div>
          <div className="shadow-xl py-5">
            <div className="flex w-[400px] m-auto">
              <div className="m-auto text-adoppix">หน้าหลัก</div>
              <div className="m-auto">feeds</div>
              <div className="m-auto">auction</div>
            </div>
          </div>
          <div className="absolute right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfomation;
