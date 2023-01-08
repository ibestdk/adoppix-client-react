import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
const SignUpCard = () => {
  return (
    <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
      <Card className="w-[350px]">
        <div>
          <Link to='/'>
            <div className="logo text-adoppix font-bold text-3xl text-center">
              AdopPix
            </div>
          </Link>
        </div>
        <div className="text-center text-adopsoftdark">
          <h1 className="text-lg">มาเป็นส่วนหนึ่งกับพวกเรา</h1>
          <h2 className="text-[13px]">
            สมัครมาชิกเพื่อเพลิดเพลินกับผลงานศิลปะที่พวกเรารัก
          </h2>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="อีเมล" />
            </div>
            <TextInput
              id="email1"
              type="email"
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

export default SignUpCard;
