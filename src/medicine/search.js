const Medicine = require("./model");
const redisClient = require("../redisClient");

exports.executeSearch = async (req, res) => {
    try {
        const { name, manufacturer, sortField = "name", sortOrder = "asc", limit = 10 } = req.query;

        // Checking if this search exists in cache
        const cacheKey = `search:${name || "all"}:${manufacturer || "all"}`;

        const cachedResults = await redisClient.get(cacheKey);
        if (cachedResults) {
            return res.json({ cached: true, normal: JSON.parse(cachedResults) });
        }

        // Not found in cache, so perform search on MongoDB
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

        // Save to Redis cache for 10 minutes
        await redisClient.setEx(cacheKey, 600, JSON.stringify(searchResults));

        res.json({ cached: false, normal: searchResults });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};