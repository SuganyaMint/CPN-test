const { addFavorite , removeFavorite } = require('./gobalfunction.controller');

exports.add_favorite = async (req, res) => {
    const { username, property_id } = req.body;
    const result = await addFavorite(username, property_id);
    res.status(result.status ? 200 : 400).json(result);
};

exports.remove_favorite = async (req, res) => {
    const { username, property_id } = req.body;
    const result = await removeFavorite(username, property_id);
    res.status(result.status ? 200 : 400).json(result);
}