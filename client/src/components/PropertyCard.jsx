import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { addToFavorites ,removeFromFavorites} from "../redux/actions/PropertyAction";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"; 
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function PropertyCard({
  id,
  property,
  userNow,
  favorites_user
}) {
  const dispatch = useDispatch();

  const [favorites, setFavorites] = useState(favorites_user || []);

  const addFavorites = async (username, property_id) => {
    const result = await dispatch(addToFavorites(username, property_id));

    if (result && result.status) {

      setFavorites((prevFavorites) => {
        const safeFavorites = prevFavorites || []; 
        if (safeFavorites.includes(property_id)) {
          console.warn(`Property ID ${property_id} is already in favorites.`);
          return safeFavorites;
        }

        return [...safeFavorites, property_id];
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'เพิ่มรายการโปรดไม่สำเร็จ',
        text: 'กรุณา Login ก่อนเพิ่มรายการโปรด',
      });
    }
  };

  const removeFavorites = async (username, property_id) => {
    const result = await dispatch(removeFromFavorites(username, property_id));
    if (result && result.status) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== property_id)
      );
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-[1.02] border border-gray-100">
      <div>
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />

          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md transition duration-150 hover:bg-white"
            onClick={() => {
              if (favorites && favorites.includes(property.id)) {
                removeFavorites(userNow, property.id);
              } else {
                addFavorites(userNow, property.id);
              }
            }}
            aria-label="Toggle Favorite"
          >
            {property && favorites ? (
              favorites.includes(property.id) ? (
                <SolidHeartIcon className="h-6 w-6 text-amber-600" />
              ) : (
                <OutlineHeartIcon className="h-6 w-6 text-amber-600" />
              )
            ) : (
              <OutlineHeartIcon className="h-6 w-6 text-amber-600" />
            )}
          </button>
        </div>

        {/* รายละเอียด */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-stone-800 mb-1">
            {property.title}
          </h3>
          <p className="text-stone-500 text-md mb-3">📍 {property.location}</p>
          <p className="text-stone-500 text-sm mb-3">{property.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-amber-800">
              ฿{property.price}
            </span>
            <button className="bg-amber-600 text-white py-1 px-3 rounded-md text-sm hover:bg-amber-700 transition duration-150">
              รายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
