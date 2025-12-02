import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { properties } from "../redux/actions/PropertyAction";
import { alluser_id } from "../redux/actions/UserAction";
import PropertyCard from "../components/PropertyCard.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function HomePage() {
  const dispatch = useDispatch();
  const propertiesState = useSelector((state) => state.properties);
  const propertiesData = propertiesState.properties;
  const isLoading = propertiesState.isFetching;
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const userNow = localStorage.getItem("user_now");

  const currentUserID = userNow || "Guest";
  const user_detail = useSelector((state) => state.user?.user_id);
  const favorites_user =
    user_detail && user_detail.favorites ? user_detail.favorites : [];
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(false);
      await dispatch(properties());

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
      <Navbar currentUserID={currentUserID}/>
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
      <Footer/>
    </div>
  );
}
