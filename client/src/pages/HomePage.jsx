import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { properties } from "../redux/actions/PropertyAction";
import { alluser_id } from "../redux/actions/UserAction";

import { UserIcon } from "@heroicons/react/24/outline";
import UserModal from "../components/UserModal.jsx"; // ⭐ นำเข้า UserModal
import PropertyCard from "../components/PropertyCard.jsx";

export default function HomePage() {
  const dispatch = useDispatch();
  const propertiesState = useSelector((state) => state.properties);
  const propertiesData = propertiesState.properties;
  const isLoading = propertiesState.isFetching;
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userNow = localStorage.getItem("user_now");
  console.log("userNow in HomePage:", userNow);

  const currentUserID = userNow || "Guest";
  const user_detail = useSelector((state) => state.user.user_id);
  const favorites_user =
    user_detail && user_detail.favorites ? user_detail.favorites : [];
  console.log("favorites_user in HomePage:", favorites_user);
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(false);
      await dispatch(properties());

      // ⭐ เรียก API ดึง User Detail ใหม่ทุกครั้งที่ userNow เปลี่ยน
      await dispatch(alluser_id(userNow));
      setLoading(true);
    };

    fetchUserData();
  }, [dispatch, userNow]);
  const filteredProperties = useMemo(() => {
    if (!searchTerm) {
      return propertiesData;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return propertiesData.filter(
      (property) =>
        property.title.toLowerCase().includes(lowercasedTerm) ||
        property.location.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, propertiesData]);

  if (isLoading || !propertiesData) {
    // เพิ่มเช็ค propertiesData เผื่อยังไม่มีข้อมูล
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-light text-stone-700">
          กำลังโหลดอสังหาริมทรัพย์...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 font-sans">
      <header className="bg-white shadow-sm p-6 mb-8 sticky top-0 z-10 border-b border-stone-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-light text-amber-800 tracking-widest">
            **MINIMAL ESTATE**
          </h1>
          <nav className="hidden md:flex space-x-6 text-stone-600 items-center">
            {/* ⭐ เพิ่ม items-center ที่นี่ */}
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
              onClick={() => setIsModalOpen(true)} // ⭐ เมื่อคลิก ให้เปิด Modal
            >
              <UserIcon className="w-6 h-6 text-stone-600 hover:text-amber-800" />
              <span className="text-sm font-medium text-amber-800">
                {currentUserID}
              </span>
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="mb-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-light text-stone-700 mb-4 font-prompt">
            ค้นหาอสังหาริมทรัพย์ของคุณ 🔍
          </h2>
          <input
            type="text"
            placeholder="ค้นหาตามชื่อหรือสถานที่ (เช่น กรุงเทพฯ, บ้านเดี่ยว)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150 text-stone-700"
          />
        </section>
        <hr className="border-stone-200 mb-8" />
        {loading == true ? (
          <section>
            <h2 className="text-3xl font-light text-stone-800 mb-8">
              {searchTerm
                ? `ผลการค้นหาสำหรับ "${searchTerm}"`
                : "รายการอสังหาริมทรัพย์แนะนำ"}
            </h2>
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    userNow={userNow}
                    favorites_user={favorites_user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-lg">
                <p className="text-xl text-stone-500">
                  ไม่พบอสังหาริมทรัพย์ที่ตรงกับคำค้นหา **"
                  {searchTerm}"**
                </p>
              </div>
            )}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen bg-stone-100">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-light text-stone-700">
              กำลังโหลดอสังหาริมทรัพย์...
            </p>
          </div>
        )}
      </main>
      <footer className="bg-stone-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-stone-600 text-sm">
          &copy; 2025 Minimal Estate. All rights reserved. |
          ออกแบบด้วยความมินิมอล
        </div>
      </footer>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
