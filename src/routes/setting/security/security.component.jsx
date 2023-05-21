import React, { useState, useEffect } from "react";
import { changePasswordAPI } from "../../../services/authorize";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Security = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordMatchError(false);
    setEmptyInputError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(false);
    setEmptyInputError(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === "" || confirmPassword === "") {
      setEmptyInputError(true);
      setPasswordMatchError(false);
    } else if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
      setEmptyInputError(false);
    } else {
      const bodyData = {
        currentPassword: oldPassword,
        newPassword: newPassword,
      };

      try {
        const response = await changePasswordAPI(bodyData);
        console.log("Success", response);
        // Perform any necessary actions upon successful password change
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordMatchError(false);
        setEmptyInputError(false);
        setShowSuccessPopup(true); // Show success popup
      } catch (error) {
        console.log("Error", error);
        // Handle any error occurred during password change
      }
    }
  };

  useEffect(() => {
    let timer;
    if (showSuccessPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false); // Hide success popup after 5 seconds
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessPopup]);

  return (
    <div>
      <div>การตั้งค่าความปลอดภัย</div>
      <div className="w-[400px] m-4 pt-10">
        <div className="text-xl ">เปลี่ยนรหัสผ่าน</div>
        <div className="m-4">
          {emptyInputError && (
            <div className="text-red-500 text-lg">กรุณากรอกข้อมูลที่จำเป็น</div>
          )}
          <div className="flex flex-col">
            <label className="m-2 text-lg">รหัสผ่านเก่า</label>
            <input
              className="rounded-lg bg-adopsoftdark"
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label className="m-2 text-lg">รหัสผ่านใหม่</label>
            <div className="relative">
              <input
                className="rounded-lg bg-adopsoftdark pr-10 w-full"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </div>
            </div>
            {passwordMatchError && (
              <div className="text-red-500 text-lg">รหัสผ่านไม่ตรงกัน</div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="m-2 text-lg">ยืนยันรหัสผ่านใหม่</label>
            <div className="relative">
              <input
                className="rounded-lg bg-adopsoftdark pr-10 w-full"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </div>
            </div>
          </div>
          {passwordMatchError && (
            <div className="text-red-500 text-lg">รหัสผ่านไม่ตรงกัน</div>
          )}
          <div className="mt-4 flex justify-end">
            <button
              className="bg-adoppix text-white text-lg rounded-xl px-8 py-2"
              onClick={handleSubmit}
            >
              เปลี่ยน
            </button>
          </div>
        </div>
      </div>
      {showSuccessPopup && (
        <div className="fixed inset-x-0 rounded-lg bottom-3 left-3 z-50 flex items-center justify-center w-[300px] h-16 bg-green-500 text-white duration-300 animate-fade-in">
          <div className="text-lg">เปลี่ยนรหัสผ่านสำเร็จ</div>
        </div>
      )}
    </div>
  );
};

export default Security;
