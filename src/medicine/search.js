const Medicine = require("./model");

exports.executeSearch = async (req, res) => {
    try {
        const { name, manufacturer } = req.query;
        const searchResults = await Medicine.find({
            $or: [
                { name: { $regex: name, $options: "i" } },
                { manufacturer: { $regex: manufacturer, $options: "i" } }
            ]
        });
        res.json(searchResults);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Interna server error." });
    }
};