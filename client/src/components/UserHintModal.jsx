import React , {useEffect} from 'react';
import { alluser } from "../redux/actions/UserAction";
import { useDispatch ,useSelector} from "react-redux";

// โค้ดนี้สมมติว่าคุณส่ง props เข้ามาในรูปแบบ { allUser, isOpen, onClose }
export default function UserHintModal({  isOpen, onClose }) {
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(alluser());
  }, [dispatch]);
    if (!isOpen) return null; // ไม่แสดงผลถ้า Modal ปิดอยู่

    // 1. สร้าง String รายชื่อ Username ที่มีอยู่ทั้งหมด (สำหรับแสดงในรายละเอียด)
    const existingUsernames = allUser && allUser.length > 0
        ? allUser.map(user => user.username).join(', ')
        : 'ยังไม่มี User ในระบบ (Guest)';

    return (
        // Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-prompt">
            
            {/* Modal Container */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-6">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-semibold text-stone-800">
                        🔑 คำแนะนำ: การเข้าสู่ระบบ/ลงทะเบียน
                    </h2>
                    <button onClick={onClose} className="text-stone-400 hover:text-amber-800 transition text-2xl">
                        &times; {/* ใช้ x แทนไอคอน XMarkIcon หากไม่ได้ติดตั้ง Heroicons */}
                    </button>
                </div>

                {/* เนื้อหาคำแนะนำ */}
                <div className="space-y-4 text-stone-700">
                    <p className="text-lg font-medium">
                        เมื่อคุณกรอก User ID และกด "เข้าสู่ระบบ/เปลี่ยน User" ระบบจะดำเนินการดังนี้:
                    </p>

                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>
                            <span className="font-bold text-green-600">ถ้า User ID นี้มีอยู่แล้ว:</span> 
                            ระบบจะทำการ **Login** ด้วย User ID นั้นทันที และคุณจะสามารถใช้งานฟังก์ชันที่ต้องเข้าสู่ระบบได้
                        </li>
                        <li>
                            <span className="font-bold text-amber-600">ถ้า User ID นี้ไม่เคยมีมาก่อน:</span> 
                            ระบบจะทำการ **Register** (ลงทะเบียน) User ID นั้นให้ใหม่ทันที แล้วทำการ Login เข้าสู่ระบบด้วย User ใหม่นั้น
                        </li>
                    </ul>

                    <hr className="border-stone-200" />
                    
                    {/* รายละเอียด User ที่มีอยู่ (Mockup Data) */}
                    <h3 className="text-lg font-semibold text-stone-800 pt-2">
                        👥 รายละเอียด User ที่มีอยู่แล้ว (สำหรับทดสอบ)
                    </h3>
                    <p className="text-sm text-stone-600 break-words">
                        **Username ทั้งหมด:** <span className="font-bold text-amber-800">
                            {existingUsernames}
                        </span>
                    </p>
                    <p className="text-xs text-stone-500 italic">
                        (คุณสามารถใช้ ID ที่ตรงกับ User Name เหล่านี้เพื่อทดสอบการ Login ได้ทันที)
                    </p>
                </div>

                {/* Footer / ปิด Modal */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-amber-700 transition duration-150"
                    >
                        เข้าใจแล้ว
                    </button>
                </div>

            </div>
        </div>
    );
}