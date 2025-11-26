import React from "react";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import Swal from "sweetalert2";
import BG from "../assets/venineFac1.png";

export default function LoginPage() {
  const handleSummit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
        const res = await API.post(ApiRouter.login, {
          empcode: data.username,
          ip: "any",
        });

        if (res.data.status === true) {
          Swal.fire("เข้าสู่ระบบสำเร็จ", "", "success");
          //delay 2 sec ก่อนไป process ถัดไป
          await new Promise((resolve) => setTimeout(resolve, 2000));
          localStorage.setItem("token", res.data.data);
          window.location.href = "/";
        } else {
          Swal.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            text: "กรุณาตรวจสอบรหัสพนักงานของท่าน",
          });
        }

  };

  return (
    <>
      <main>
        <section className="relative w-full h-full py-60 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${BG})`,
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-500 font-bold">
                        ระบบร้องเรียน
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSummit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          รหัสพนักงาน
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="รหัสพนักงาน"
                          name="username"
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                        >
                          เข้าสู่ระบบ
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2"></div>
                  <div className="w-1/2 text-right">
                    <a
                      href="https://teams.microsoft.com/l/call/0/0?users=sabtawee_s@veninecable.com"
                      className=" text-white"
                    >
                      <small>ติดต่อผู้ดูแลระบบ</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}