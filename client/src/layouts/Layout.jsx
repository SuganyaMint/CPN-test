import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import FooterComponent from "../components/Footer/FooterComponent";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout({ name, empcode }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-100">
        <NavbarComponent  name={name} empcode={empcode}/>
        <div className="px-4 md:px-10 mx-auto w-full mt-8">
          <Outlet empcode={empcode}></Outlet>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}

export default Layout;
