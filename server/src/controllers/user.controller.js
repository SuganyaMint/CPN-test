const { getAllUser, getUserByUserName, createUser } = require('./gobalfunction.controller');

exports.get_AllUser = async (req, res) => {
  try {
    const user = await getAllUser();
    res.status(200).json({
      status: true,
      data: user,
      message: "Properties retrieved successfully."
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ status: false, message: "Internal server error during properties retrieval." });
  }
};

exports.get_UserByUserName = async (req, res) => {
  try {
    console.log("Received username:", req.params.username);
    const user_name = req.params.username;
    if (!user_name) {
      return res.status(400).json({ status: false, message: "User ID is required." });
    }
    const user = await getUserByUserName(user_name);
    console.log("Retrieved user:", user);
    res.status(200).json({
      status: true,
      data: user,
      message: "Properties retrieved successfully."
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ status: false, message: "Internal server error during properties retrieval." });
  }
};

//post user
exports.post_User = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(` Username=${username}`);
    await createUser(username);

    res.status(201).json({ status: true, message: "User added successfully." });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ status: false, message: "Internal server error during user addition." });
  }
};

exports.register_User = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ status: false, message: "Username is required." });
    }
    const user = await getUserByUserName(username);
    if (user && user.username === username) {
      res.status(200).json({ status: true, message: "Login successfully" });
    }else{
      const create_user = await createUser(username);
    if (!create_user) {
      return res.status(500).json({ status: false, message: "Failed to create user." });
    } else {
      res.status(201).json({ status: true, message: "User registered and login successfully." });
    }
    }
    


  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: false, message: "Internal server error during user registration." });
  }
}