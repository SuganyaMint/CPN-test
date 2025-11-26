const fs = require('fs');
const path = require('path');

const PROPERTIES_PATH = path.join(__dirname, '../../database/properties.json');
const FAVORITES_PATH = path.join(__dirname, '../../databasefavorites.json');

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

exports.writeJsonFile = (filePath, data) => {
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