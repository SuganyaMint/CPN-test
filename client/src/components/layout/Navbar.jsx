import React, { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import UserModal from "../UserModal.jsx"; // นำเข้า UserModal

export default function Navbar({ currentUserID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
     <header className="bg-white shadow-sm p-6 mb-8 sticky top-0 z-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-light text-amber-800 tracking-widest">
            SUGANYA ESTATE
          </h1>
          <nav className="hidden md:flex space-x-6 text-stone-600 items-center">
            <a href="#" className="hover:text-amber-800 transition">
              หน้าหลัก
            </a>
            <a href="#" className="hover:text-amber-800 transition">
              อสังหาฯ ทั้งหมด
            </a>
            <a href="#" className="hover:text-amber-800 transition">
              ติดต่อเรา
            </a>
            <div
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-full hover:bg-stone-100 transition"
              onClick={() => setIsModalOpen(true)}
            >
              <UserIcon className="w-6 h-6 text-stone-600 hover:text-amber-800" />
              <span className="text-sm font-medium text-amber-800">
                {currentUserID}
              </span>
            </div>
          </nav>
        </div>
              <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </header>
  )
}