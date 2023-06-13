import { Card, Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { authenicate } from "../../../services/authorize";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { isEmptyObject } from "jquery";

const ResetPasswordCard = () => {
  const initialValues = {
    password: "",
    confrimpassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(isEmptyObject);
  const [isSubmit, setIsSubmit] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    setFormErrors(validate(formValues));
    setIsSubmit(true); //ปิดด้วย
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // //console.log({
    //   email: data.get("password"),
    // });

    if (JSON.stringify(formErrors) === "{}") {
      const jsonData = {
        email: data.get("password"),
      };

      //https://api.adoppix.com/api/Auth/f53493d7-78e1-4261-8b5c-fa4c6ce8da0c/forget-password  PUT METHOD  RESET PASSWORD Pess New Password Two Time
      // //console.log(`https://api.adoppix.com/api/Auth/${jsonData.email}/forget-password`)
      fetch(`https://api.adoppix.com/api/Auth/${token}/forget-password`, {
        method: "GET",
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
            navigate("/forgetpassword/mailsended");

            // localStorage.setItem("ut", res.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  useEffect(() => {
    //console.log("call useEffect");
    // //console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // //console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};

    if (values.password !== values.confrimpassword) {
      errors.password = "รหัสผ่านไม่ตรงกัน";
      errors.confrimpassword = "รหัสผ่านไม่ตรงกัน";
    }

    if (!values.confrimpassword) {
      errors.confrimpassword = "กรุณากรอกยืนยันรหัสผ่าน";
    }

    if (!values.password) {
      errors.password = "กรุณากรอกรหัสผ่าน";
    } else if (values.password.length < 8) {
      errors.password = "รหัสผ่านควรจะมีความยาวมากกว่า 8 ตัวอักษร";
    }

    return errors;
  };
  return (
    <div className="dark:bg-adopdark">
      <div className="max-w-sm m-auto flex items-center justify-center h-screen ">
        <div className="w-[350px] dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_10px_black] rounded-lg">
          <div>
            <Link to="/">
              <div className="logo pb-3 text-adoppix font-bold text-3xl text-center cursor-pointer">
                AdopPix
              </div>
            </Link>
          </div>
          <div className="pb-8">
            <h1 className="text-center text-adopsoftdark dark:text-adoplight text-lg">
              กรุณากรอกรหัสผ่านใหม่ของคุณ
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="pb-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="รหัสผ่านใหม่" />
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder=""
                onChange={handleChange}
              />
              <p className="text-red-500">{formErrors.password}</p>
            </div>

            <div className="pb-8">
              <div className="mb-2 block">
                <Label htmlFor="confrimpassword" value="ยืนยันรหัสผ่านใหม่" />
              </div>
              <TextInput
                id="confrimpassword"
                type="password"
                name="confrimpassword"
                placeholder=""
                onChange={handleChange}
              />
              <p className="text-red-500">{formErrors.confrimpassword}</p>
            </div>

            <Button className="bg-adoppix" type="submit">
              ยืนยันเปลี่ยนรหัสผ่าน
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordCard;
