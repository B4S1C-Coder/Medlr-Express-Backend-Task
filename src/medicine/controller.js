const Medicine = require("./model");

exports.getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            res.status(404).json({ message: `Medicine : ${req.params.id} was not found.` });
            return;
        }

        res.json(medicine);
    } catch (err) {
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(400).json({ message: "Invalid Medicine ID format." });
            return;
        }
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};