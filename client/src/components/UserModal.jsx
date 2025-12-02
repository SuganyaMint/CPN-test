import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // สำ
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { register, alluser_id } from "../redux/actions/UserAction";
import UserHintModal from "./UserHintModal.jsx";
import Swal from "sweetalert2";

export default function UserModal({ isOpen, onClose }) {
  const [inputID, setInputID] = useState("");
  const dispatch = useDispatch();
  const userNow = localStorage.getItem("user_now");
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputID.trim()) {
      const cleanInputID = inputID.trim();
      const res = await dispatch(register(cleanInputID));

      if (res && (res.status == 201 || res.status == 200)) {
        localStorage.setItem("user_now", cleanInputID);

        await dispatch(alluser_id(cleanInputID));

        Swal.fire({
          icon: "success",
          title: res.data.message || "เข้าสู่ระบบสำเร็จ",
        });
        setInputID("");
        onClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text:
            res && res.data && res.data.message
              ? res.data.message
              : "Something went wrong! ตรวจสอบ User ID",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอก User ID",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_now");
    localStorage.removeItem("favorites_user");
    dispatch(alluser_id(null));
    Swal.fire({
      icon: "success",
      title: "ออกจากระบบสำเร็จ",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 font-prompt">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-stone-800">
            จัดการบัญชีผู้ใช้
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-amber-800 transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-between w-full mb-4">
          <p className="text-md text-stone-600 mb-0">
            ผู้ใช้งานปัจจุบัน:
            {userNow ? (
              <span className="font-bold text-green-600"> {userNow}</span>
            ) : (
              <span className="font-bold text-amber-800"> Guest</span>
            )}
          </p>
          <div
            className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-stone-100 transition"
            onClick={() => setIsHintModalOpen(true)}
          >
            <QuestionMarkCircleIcon className="w-6 h-6 text-stone-600 hover:text-amber-800" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="userID"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              เปลี่ยน User ID/เข้าสู่ระบบ
            </label>
            <input
              id="userID"
              type="text"
              value={inputID}
              onChange={(e) => setInputID(e.target.value)}
              placeholder="กรอก User ID ใหม่"
              className="w-full p-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition text-stone-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-700 transition duration-150"
          >
            เข้าสู่ระบบ/เปลี่ยน User
          </button>
          {userNow ? (
            <button
              type="button"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-150"
              onClick={() => {
                handleLogout();
              }}
            >
              ออกจากระบบ
            </button>
          ) : null}
        </form>
      </div>
      <UserHintModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
      />
    </div>
  );
}
