import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
const SignUpCard = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
      confrimpassword: data.get("confirmpassword"),
      adoppixid: data.get("adoppixid"),
      term: data.get("term"), //true only
    };

    fetch("https://testapi.adoppix.com/api/Auth/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("Success:", res);
        if (res.successful) {
          //sent data to authen services
          // sessionStorage.setItem("token", response.data)
          // console.log("sessionStroage was stored")
          authenicate(res, () => navigate("/"));

          // localStorage.setItem("ut", res.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };




  return (
    <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
      <div className="w-[350px] dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
        <div>
          <Link to='/'>
            <div className="logo text-adoppix font-bold text-3xl text-center">
              AdopPix
            </div>
          </Link>
        </div>
        <div className="text-center text-adopsoftdark dark:text-adoplight">
          <h1 className="text-lg">มาเป็นส่วนหนึ่งกับพวกเรา</h1>
          <h2 className="text-[13px]">
            สมัครมาชิกเพื่อเพลิดเพลินกับผลงานศิลปะที่พวกเรารัก
          </h2>
        </div>
        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="อีเมล" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              placeholder="name@adoppix.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="รหัสผ่าน" />
            </div>
            <TextInput id="password1" type="password" required={true} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="ยืนยันรหัสผ่าน" />
            </div>
            <TextInput id="password2" type="password" required={true} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id" value="AdopPix ID" />
            </div>
            <TextInput id="id" type="text" required={true} />
          </div>
          <div className="flex items-center gap-2">
            <input className="rounded-md" type="checkbox" name="" id="" />
            <Label htmlFor="remember">ยอมรับ<Link className="text-adoppix">ข้อตกลง</Link>การใช้งาน</Label>
          </div>
          <Button type="submit">Sign Up</Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            จำรหัสผ่านของคุณได้เเล้ว?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              กลับหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpCard;
