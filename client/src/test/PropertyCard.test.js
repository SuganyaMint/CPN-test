import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../components/PropertyCard';

// ⭐ แก้ไข mockProperty ให้ตรงกับโครงสร้างข้อมูลจริง
const mockProperty = {
  id: 101,
  title: 'คอนโดริมน้ำ The Aqua', // อัปเดตชื่อให้เต็ม
  location: 'กรุงเทพฯ',
  price: '7.5M',
  image: 'https://cdn-cms.pgimgs.com/news/2019/07/Politan-Rive-Overview-e1563123349908.jpg',
  description: 'ห้องสวย วิวแม่น้ำเจ้าพระยาแบบพาโนรามา เดินทางสะดวก ใกล้ BTS',
  isFavorite: false, // ⭐ เพิ่ม isFavorite: false เพื่อใช้ทดสอบสถานะเริ่มต้น
};

describe('PropertyCard', () => {
  // Test 1: ตรวจสอบการ Render ข้อมูลหลัก
  test('should render the property title and location', () => {
    // 1. Render คอมโพเนนต์
    render(<PropertyCard property={mockProperty} onFavoriteClick={() => {}} />);

    // 2. ใช้ screen.getByText เพื่อหาข้อความที่แสดงผล
    // ต้องอ้างอิงชื่อเต็มตาม Mock Data ใหม่
    expect(screen.getByText('คอนโดริมน้ำ The Aqua')).toBeInTheDocument(); 
    expect(screen.getByText('กรุงเทพฯ')).toBeInTheDocument();
  });

  // Test 2: ตรวจสอบการคลิกปุ่ม (ไม่มีการเปลี่ยนแปลง)
  test('should call onFavoriteClick when the button is clicked', () => {
    const mockClick = jest.fn(); 
    
    render(<PropertyCard property={mockProperty} onFavoriteClick={mockClick} />);

    // สมมติว่าปุ่มมีข้อความ "Toggle Fav" หรือคุณใช้ role="button"
    const button = screen.getByText(/Toggle Fav/i);

    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith(101); 
  });
  
  // ⭐ Test 3: ตรวจสอบสถานะรายการโปรด (แก้ไขให้ใช้ Spread syntax เพื่อเปลี่ยนสถานะ)
  test('should display the favorite status when isFavorite is true', () => {
    // สร้าง Object ใหม่โดยเปลี่ยนแค่ isFavorite เป็น true
    const favoriteProperty = { ...mockProperty, isFavorite: true }; 
    
    // 1. Render คอมโพเนนต์ที่มีสถานะ favorite
    render(<PropertyCard property={favoriteProperty} onFavoriteClick={() => {}} />);
    
    // 2. ตรวจสอบว่าข้อความ "⭐ Favorite" ถูกแสดงผล
    expect(screen.getByTestId('fav-status')).toBeInTheDocument();
  });
});