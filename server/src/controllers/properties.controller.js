const { getProperties } = require('./gobalfunction.controller');

exports.getProperties = async (req,res) => {
    try {
        console.log("Fetching properties...");
        const properties = await getProperties();
        res.status(200).json({
            status: true,
            data: properties,
            message: "Properties retrieved successfully."
        });
    } catch (error) {
        console.error("Error getting properties:", error);
        res.status(500).json({ status: false, message: "Internal server error during properties retrieval." });
    }
};