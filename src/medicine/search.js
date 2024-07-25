const Medicine = require("./model");

exports.executeSearch = async (req, res) => {
    try {
        const { name, manufacturer, sortField = "name", sortOrder = "asc", limit = 10 } = req.query;

        // This is unreliable (maynot work if indices not setup correctly)
        // Uncomment to use and remember to include it in response!
        // const indicesSearchResults = await Medicine.find({
        //     $text: { $search: `${name} ${manufacturer}`.trim() }
        // });

        // A reliable fallback
        const searchResults = await Medicine.find({
            // search query
            $or: [
                { name: { $regex: String(name), $options: "i" } },
                { manufacturer: { $regex: String(manufacturer), $options: "i" } }
            ]
        })
            // sort accordingly
            .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
            // the maxmum number of responses
            .limit(parseInt(limit));

        res.json({normal: searchResults});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};