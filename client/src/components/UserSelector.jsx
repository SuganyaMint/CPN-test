import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setUserId, fetchFavorites } from '../store/favoritesSlice';
import { favorites } from "../redux/actions/UserAction";
const sampleUsers = [
  { id: 'user_a', name: 'User A (คุณสมชาย)' },
  { id: 'user_b', name: 'User B (คุณสมหญิง)' },
  { id: 'guest', name: 'Guest' },
];

const UserSelector = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.favorites.currentUserId);
  const favoritesStatus = useSelector((state) => state.favorites.status);
  const [isLoading, setIsLoading] = React.useState(false);
    const properties_list = useSelector(
    (state) => state.properties.properties || []
  );

  console.log("Properties from Redux:", properties_list);
  
  // useEffect(() => {
  //   if (currentUserId && favoritesStatus === 'idle') {
  //       dispatch(fetchFavorites(currentUserId));
  //   }
  // }, [currentUserId, favoritesStatus, dispatch]);

      useEffect(() => {
      setIsLoading(true);
          if (currentUserId && favoritesStatus === 'idle') {
        dispatch(favorites()).finally(() => {
        setIsLoading(false);
      });
    }
      dispatch(favorites()).finally(() => {
        setIsLoading(false);
      });
    }, [currentUserId, favoritesStatus, dispatch]);
  
  // const handleChange = (e) => {
  //   const userId = e.target.value;
  //   dispatch(setUserId(userId));
  // };

  return (
    // <div className="p-4 bg-amber-50 rounded-lg shadow-inner mb-6">
    //   <label htmlFor="user-select" className="block text-sm font-medium text-amber-900 mb-2">
    //     👤 เลือก User ID:
    //   </label>
    //   <select
    //     id="user-select"
    //     value={currentUserId || ''}
    //     onChange={handleChange}
    //     className="w-full p-2 border border-amber-200 rounded-md focus:ring-amber-500 focus:border-amber-500 bg-white"
    //   >
    //     <option value="" disabled>--- โปรดเลือกผู้ใช้ ---</option>
    //     {sampleUsers.map((user) => (
    //       <option key={user.id} value={user.id}>
    //         {user.name}
    //       </option>
    //     ))}
    //   </select>
    //    {currentUserId && favoritesStatus === 'loading' && (
    //       <p className="text-sm mt-2 text-amber-700">กำลังโหลดรายการโปรด...</p>
    //    )}
    // </div>
    <></>
  );
};

export default UserSelector;