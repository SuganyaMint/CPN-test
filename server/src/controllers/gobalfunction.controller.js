const fs = require('fs');
const path = require('path');

const PROPERTIES_PATH = path.join(__dirname, '../../database/properties.json');
const FAVORITES_PATH = path.join(__dirname, '../../database/favorites.json');
const USER_PATH = path.join(__dirname, '../../database/user.json');


// --- Utility Functions สำหรับ File-based Storage ---
const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // หากไฟล์ไม่มีอยู่หรืออ่านไม่ได้ ให้คืนค่าเริ่มต้น
        return filePath === FAVORITES_PATH ? {} : [];
    }
};

const writeJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};


exports.getProperties = async () => {
    try {
        // const properties = readJsonFile(PROPERTIES_PATH);
        const data = fs.readFileSync(PROPERTIES_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error getting properties:", error);
        return { status: false, message: "Internal server error during properties retrieval." };
    }
};

exports.getFavorites = async (user_name) => {
    // 1. ตรวจสอบความถูกต้องของ ID ก่อน
    if (!user_name) {
        return { status: false, message: "User ID is required." };
    }
    try {
        const data = fs.readFileSync(FAVORITES_PATH, 'utf8');
        const favorites = JSON.parse(data); // favorites คือ Array ของข้อมูลที่ถูกบันทึกเป็นรายการโปรด
        const foundFavorites = favorites.find(fav => fav.username === user_name);
        return foundFavorites
    } catch (error) {
        console.error("Error getting Favorites:", error);
        return { status: false, message: "Internal server error during Favorites retrieval." };
    }
};

exports.getAllUser = async () => {
    try {
        const data = fs.readFileSync(USER_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error getting user:", error);
        return { status: false, message: "Internal server error during user retrieval." };
    }
};

exports.getUserByUserName = async (user_name) => {
    if (!user_name) {
        return { status: false, message: "User ID is required." };
    }
    try {
        const data = fs.readFileSync(USER_PATH, 'utf8');
        const users = JSON.parse(data); // users คือ Array ของข้อมูลผู้ใช้
        const foundUser = users.find(user => user.username === user_name);
        return foundUser
    } catch (error) {
        // จัดการกรณีที่ไฟล์ไม่มีอยู่, อ่านไม่ได้, หรือ JSON ผิดรูปแบบ
        if (error.code === 'ENOENT') {
            // 'ENOENT' = Error NO ENTry (File not found)
            return { status: false, message: "User data file not found." };
        }

        console.error("Error retrieving user data:", error.message);
        return { status: false, message: "Internal server error during user retrieval." };
    }
};

//create user
exports.createUser = async (username) => {
    try {
        const data = fs.readFileSync(USER_PATH, 'utf8');
        const users_old = JSON.parse(data);
        const lastUser = users_old[users_old.length - 1];
        const newID = lastUser ? lastUser.user_id + 1 : 1;
        const users = readJsonFile(USER_PATH);
        const newUser = { user_id: newID, username: username, favorites: [] };
        users.push(newUser);
        writeJsonFile(USER_PATH, users);
        return { status: true, message: "User created successfully." };
    } catch (error) {
        console.error("Error creating user:", error);
        return { status: false, message: "Internal server error during user creation." };
    }
};


exports.addFavorite = async (user_name, property_id) => {
    // 1. ตรวจสอบความถูกต้องของ Input
    if (!user_name || !property_id) {
        return { status: false, message: "Username and Property ID are required." };
    }
    const propId = Number(property_id); // แปลง property_id ให้เป็นตัวเลข
    const cleanUsername = user_name.trim();

    try {
        // --- 1. อ่านข้อมูล Users ทั้งหมด ---
        // สมมติว่า 'this.readJsonFile' ดึง Array ข้อมูลผู้ใช้จาก USER_PATH
        const users = readJsonFile(USER_PATH); 

        // --- 2. ค้นหา User ที่ต้องการ ---
        // ใช้ findIndex เพื่อหา Index ของ User ที่ตรงกับ username
        const userIndex = users.findIndex(user => user.username === cleanUsername);

        if (userIndex === -1) {
            return { status: false, message: `User '${cleanUsername}' not found.` };
        }

        const user = users[userIndex];
        
        // --- 3. ตรวจสอบและเพิ่มรายการโปรด ---
        
        // 3.1 ตรวจสอบว่า Property ID นั้นเป็นรายการโปรดอยู่แล้วหรือไม่
        if (user.favorites.includes(propId)) {
            return { 
                status: true, 
                message: "Property is already in favorites.",
                favorites: user.favorites
            };
        }

        // 3.2 เพิ่ม Property ID เข้าไปใน Array favorites
        user.favorites.push(propId);
        
        // 3.3 อัปเดต Array Users หลัก
        users[userIndex] = user; 
        
        // --- 4. บันทึกข้อมูลกลับเข้าไปในไฟล์ ---
        // สมมติว่า 'this.writeJsonFile' ใช้บันทึก Array users กลับไปที่ USER_PATH
        writeJsonFile(USER_PATH, users);

        return { 
            status: true, 
            message: `Property ID ${propId} added to favorites for user ${cleanUsername}.`,
            favorites: user.favorites
        };

    } catch (error) {
        console.error("Error adding favorite:", error);
        return { status: false, message: "Internal server error during adding favorite." };
    }
};

exports.removeFavorite = async (user_name, property_id) => {
    // 1. ตรวจสอบความถูกต้องของ Input
    if (!user_name || !property_id) {   
        return { status: false, message: "Username and Property ID are required." };
    }
    const propId = Number(property_id); // แปลง property_id ให้เป็นตัวเลข
    const cleanUsername = user_name.trim();

    try {
        // --- 1. อ่านข้อมูล Users ทั้งหมด ---
        const users = readJsonFile(USER_PATH); 

        // --- 2. ค้นหา User ที่ต้องการ ---
        const userIndex = users.findIndex(user => user.username === cleanUsername);

        if (userIndex === -1) {
            return { status: false, message: `User '${cleanUsername}' not found.` };
        }

        const user = users[userIndex];
        
        // --- 3. ตรวจสอบและลบรายการโปรด ---
        
        // 3.1 ตรวจสอบว่า Property ID นั้นอยู่ในรายการโปรดหรือไม่
        if (!user.favorites.includes(propId)) {
            return { 
                status: false, 
                message: "Property is not in favorites.",
                favorites: user.favorites
            };
        }

        // 3.2 ลบ Property ID ออกจาก Array favorites
        user.favorites = user.favorites.filter(id => id !== propId);
        
        // 3.3 อัปเดต Array Users หลัก
        users[userIndex] = user; 
        
        // --- 4. บันทึกข้อมูลกลับเข้าไปในไฟล์ ---
        writeJsonFile(USER_PATH, users);

        return { 
            status: true, 
            message: `Property ID ${propId} removed from favorites for user ${cleanUsername}.`,
            favorites: user.favorites
        };

    } catch (error) {
        console.error("Error removing favorite:", error);
        return { status: false, message: "Internal server error during removing favorite." };
    }
}