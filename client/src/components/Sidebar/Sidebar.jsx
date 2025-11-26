import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const location = useLocation();
  const role = localStorage.getItem("Role");
  const [linkActive, setLinkActive] = useState("");

  useEffect(() => {
    setLinkActive(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            COMPLAINT SYSTEMS
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            {/* <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li> */}
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Venine Test
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid  border-gray-500 placeholder-gray-300 text-gray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-gray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              แนะนำ
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (linkActive === "/"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-gray-500")
                  }
                  to="/"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (linkActive === "/" ? "opacity-75" : "text-gray-300")
                    }
                  ></i>{" "}
                  หน้าหลัก
                </Link>
              </li>
              
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (linkActive === "/create-complaint"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-gray-500")
                  }
                  to="/create-complaint"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (linkActive === "/create-complaint"
                        ? "opacity-75"
                        : "text-gray-300")
                    }
                  ></i>{" "}
                  สร้างใบร้องเรียน
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (linkActive === "/complaint"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-gray-500")
                  }
                  to="/complaint"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (linkActive === "/complaint"
                        ? "opacity-75"
                        : "text-gray-300")
                    }
                  ></i>{" "}
                  รายการใบร้องเรียน
                </Link>
              </li>
              {/* <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (linkActive === "/create-request"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-gray-500")
                  }
                  to="/create-request"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (linkActive === "/create-request"
                        ? "opacity-75"
                        : "text-gray-300")
                    }
                  ></i>{" "}
                  สร้างใบดำเนินการ
                </Link>
              </li> */}

              {/* <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (linkActive === "/request"
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-700 hover:text-gray-500")
                  }
                  to="/request"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (linkActive === "/request"
                        ? "opacity-75"
                        : "text-gray-300")
                    }
                  ></i>{" "}
                  รายการใบคำร้อง
                </Link>
              </li>
              {role === "ผู้ตรวจสอบ" ? (
                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (linkActive === "/adm-member"
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-gray-700 hover:text-gray-500")
                    }
                    to="/adm-member"
                  >
                    <i
                      className={
                        "fas fa-tv mr-2 text-sm " +
                        (linkActive === "/adm-member"
                          ? "opacity-75"
                          : "text-gray-300")
                      }
                    ></i>{" "}
                    รายชื่อ ADM
                  </Link>
                </li>
              ) : null} */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
