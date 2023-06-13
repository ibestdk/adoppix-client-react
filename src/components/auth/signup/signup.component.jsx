import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isEmptyObject } from "jquery";

const SignUpCard = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confrimpassword: "",
    acceptterm: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(isEmptyObject);
  const [isSubmit, setIsSubmit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    //console.log(checked);
  };

  const handleChange = (e) => {
    //console.log("handleChange");
    //console.log("formErrors" + formErrors);
    const { name, value } = e.currentTarget;
    setFormValues({ ...formValues, [name]: value });
    // console.table(initialValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true); //ปิดด้วย
    //console.log("handlesubmit");
    //console.log("formErrors" + JSON.stringify(formErrors));
    //console.log(checked);
    if (JSON.stringify(formErrors) === "{}") {
      const data = new FormData(event.currentTarget);

      if (checked === true) {
        // //console.log({
        //   email: data.get("email"),
        //   password: data.get("password"),
        //   username: data.get("username"),
        // });

        const jsonData = {
          email: data.get("email"),
          password: data.get("password"),
          username: data.get("username"),
        };
        // //console.log("data for api : " + JSON.parse(jsonData));
        fetch("https://api.adoppix.com/api/Auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(jsonData),
        })
          .then((response) => response.json())
          .then((res) => {
            //console.log("Success:", res);
            if (res.status) {
              //sent data to authen services
              // sessionStorage.setItem("token", response.data)
              // //console.log("sessionStroage was stored")
              // authenicate(res, () => navigate("/"));
              //console.log("complete register");
              setSubmitSuccess(true);
              // localStorage.setItem("ut", res.data);
            } else {
              //console.log("call validate");
              setFormErrors(validateApi(res));
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else if (checked === false) {
        setFormErrors(validateChecked(checked));
        //console.log("case false");
      }
    }
  };

  useEffect(() => {
    //console.log("call useEffect")
    // //console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // //console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "กรุณากรอกชื่อผู้ใช้งาน";
    }
    if (!values.email) {
      errors.email = "กรุณากรอกอีเมล";
    } else if (!regex.test(values.email)) {
      errors.email = "รูปแบบของอีเมลไม่ถูกต้อง";
    }
    if (values.password !== values.confrimpassword) {
      errors.password = "รหัสผ่านไม่ตรงกัน";
      errors.confrimpassword = "รหัสผ่านไม่ตรงกัน";
    }

    if (!values.confrimpassword) {
      errors.confrimpassword = "กรุณากรอกยืนยันรหัสผ่าน";
    }
    if (values.acceptterm === false) {
      errors.confrimpassword =
        "ติ๊กถูกเพื่อยอมรับข้อตกลงการใช้งานก่อนทำการสมัคร";
    }
    if (!values.password) {
      errors.password = "กรุณากรอกรหัสผ่าน";
    } else if (values.password.length < 8) {
      errors.password = "รหัสผ่านควรจะมีความยาวมากกว่า 8 ตัวอักษร";
    }
    if (values.message === "Email aleady exists.") {
      errors.email = "มีอีเมลนี้อยู่ในระบบแล้ว";
    }
    return errors;
  };
  const validateApi = (values) => {
    const errors = {};

    if (values.message === "Email aleady exists.") {
      errors.email = "มีอีเมลนี้อยู่ในระบบแล้ว";
    }
    if (values.message === "Username aleady exists.") {
      errors.username = "มีผู้ใช้นี้อยู่ในระบบแล้ว";
    }
    return errors;
  };
  const validateChecked = (values) => {
    const errors = {};

    if (values === false) {
      errors.acceptterm = "กดยอมรับข้อตกลงการใช้งานก่อนทำการสมัคร";
    }

    return errors;
  };

  return (
    <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
      <div className="w-[350px] dark:bg-adopsoftdark bg-adoplight pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
        <div>
          <Link to="/">
            <div className="logo text-adoppix font-bold text-3xl text-center">
              AdopPix
            </div>
          </Link>
        </div>

        {submitSuccess && (
          <div className="pt-4">
            <div className="pb-8">
              <h1 className="text-center px-8   text-adopsoftdark dark:text-adoplight text-lg">
                ลิงค์สำหรับยืนยันอีเมล ถูกส่งไปยังอีเมลของคุณเเล้ว
              </h1>
            </div>
            <div className="pb-5">
              <img
                className="w-[200px] m-auto"
                src="
     https://cdn.discordapp.com/attachments/939012816839507998/1039876742287998976/send_mail_crop.gif"
                alt=""
              />
            </div>
            <div>
              <p>ในบางครั้งอีเมลอาจจะไปอยู่ในถังขยะของเมล</p>
            </div>
          </div>
        )}
        {!submitSuccess && (
          <div>
            <div className="text-center text-adopsoftdark dark:text-adoplight">
              <h1 className="text-lg">มาเป็นส่วนหนึ่งกับพวกเรา</h1>
              <h2 className="text-[13px]">
                สมัครมาชิกเพื่อเพลิดเพลินกับผลงานศิลปะที่พวกเรารัก
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="อีเมล" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  onChange={handleChange}
                  name="email"
                  placeholder="name@adoppix.com"
                />
                <p className="text-red-500">{formErrors.email}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="รหัสผ่าน" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                <p className="text-red-500">{formErrors.password}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confrimpassword" value="ยืนยันรหัสผ่าน" />
                </div>
                <TextInput
                  id="confrimpassword"
                  type="password"
                  name="confrimpassword"
                  onChange={handleChange}
                />
                <p className="text-red-500">{formErrors.confrimpassword}</p>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="id" value="AdopPix ID" />
                </div>
                <TextInput
                  id="id"
                  type="text"
                  name="username"
                  onChange={handleChange}
                />
                <p className="text-red-500">{formErrors.username}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="rounded-md"
                  type="checkbox"
                  onChange={handleCheck}
                  name="acceptterm"
                  id=""
                />
                <Label htmlFor="remember">
                  ยอมรับ<Link className="text-adoppix">ข้อตกลง</Link>การใช้งาน
                </Label>
              </div>
              <p className="text-red-500">{formErrors.acceptterm}</p>
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
        )}
      </div>
    </div>
  );
};

export default SignUpCard;
