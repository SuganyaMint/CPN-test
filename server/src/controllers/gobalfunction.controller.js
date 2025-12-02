const fs = require('fs');
const path = require('path');

const PROPERTIES_PATH = path.join(__dirname, '../../database/properties.json');
const FAVORITES_PATH = path.join(__dirname, '../../database/favorites.json');
const USER_PATH = path.join(__dirname, '../../database/user.json');


const readJsonFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return filePath === FAVORITES_PATH ? {} : [];
    }
};

const writeJsonFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};


exports.getProperties = async () => {
    try {
        const data = fs.readFileSync(PROPERTIES_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error getting properties:", error);
        return { status: false, message: "Internal server error during properties retrieval." };
    }
};

exports.getFavorites = async (user_name) => {
    if (!user_name) {
        return { status: false, message: "User ID is required." };
    }
    try {
        const data = fs.readFileSync(FAVORITES_PATH, 'utf8');
        const favorites = JSON.parse(data); 
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
        const users = JSON.parse(data); 
        const foundUser = users.find(user => user.username === user_name);
        return foundUser
    } catch (error) {
        if (error.code === 'ENOENT') {
            return { status: false, message: "User data file not found." };
        }

        console.error("Error retrieving user data:", error.message);
        return { status: false, message: "Internal server error during user retrieval." };
    }
};

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
    if (!user_name || !property_id) {
        return { status: false, message: "Username and Property ID are required." };
    }
    const propId = Number(property_id); 
    const cleanUsername = user_name.trim();

    try {

        const users = readJsonFile(USER_PATH); 
        const userIndex = users.findIndex(user => user.username === cleanUsername);

        if (userIndex === -1) {
            return { status: false, message: `User '${cleanUsername}' not found.` };
        }
        const user = users[userIndex];
        if (user.favorites.includes(propId)) {
            return { 
                status: true, 
                message: "Property is already in favorites.",
                favorites: user.favorites
            };
        }

        user.favorites.push(propId);
        
        users[userIndex] = user; 

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
    if (!user_name || !property_id) {   
        return { status: false, message: "Username and Property ID are required." };
    }
    const propId = Number(property_id);
    const cleanUsername = user_name.trim();

    try {
        const users = readJsonFile(USER_PATH); 
        const userIndex = users.findIndex(user => user.username === cleanUsername);

        if (userIndex === -1) {
            return { status: false, message: `User '${cleanUsername}' not found.` };
        }

        const user = users[userIndex];
 
        if (!user.favorites.includes(propId)) {
            return { 
                status: false, 
                message: "Property is not in favorites.",
                favorites: user.favorites
            };
        }

        user.favorites = user.favorites.filter(id => id !== propId);
        
        users[userIndex] = user; 
        
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