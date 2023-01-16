import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { authenicate } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const navigate = useNavigate();

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
      <Card className="w-[350px]">
        <div>
          <Link to="/">
            <div className="logo text-adoppix font-bold text-3xl text-center cursor-pointer">
              AdopPix
            </div>
          </Link>
        </div>
        <div>
          <h1 className="text-center text-adopsoftdark text-lg">เข้าสู่ระบบ</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="อีเมล" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              placeholder="name@adoppix.com"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="รหัสผ่าน" />
            </div>
            <div className="flex">
              <TextInput
                className="w-[90%]"
                id="password"
                name="password"
                type="password"
                required={true}
              />
              <div className="m-auto">
                <input className="rounded-full" type="checkbox" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input className="rounded-md" type="checkbox" name="" id="" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit">Login</Button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginCard;
