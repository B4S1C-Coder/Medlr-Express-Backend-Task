const Medicine = require("./model");
const redisClient = require("../redisClient");

exports.getMedicineById = async (req, res) => {
    try {

        const id = req.params.id;

        if ((id === undefined) || (id === null)) {
            res.status(400).json({message: "Medicine id was not provided"});
            return;
        }

        // Check if it exists in cache
        const cacheKey = `MedicineID:${id}`;

        const cachedResult = await redisClient.get(cacheKey);
        if (cachedResult) {
            return res.json({ ...JSON.parse(cachedResult), cached: true });
        }

        const medicine = await Medicine.findById(id);

        if (!medicine) {
            res.status(404).json({ message: `Medicine : ${id} was not found.` });
            return;
        }

        // Save to cache for 10 mins
        await redisClient.setEx(cacheKey, 600, JSON.stringify(medicine));

        res.json({ ...medicine._doc, cached: false });
    } catch (err) {
        // Check if id is invalid
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(400).json({ message: "Invalid Medicine ID format." });
            return;
        }
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.createMedicine = async (req, res) => {
    try {
        const medicine = new Medicine(req.body);
        const savedMedicine = await medicine.save();
        res.json(savedMedicine);
    } catch (err) {
        // Check if it is a validation error
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map((error) => error.message);
            res.status(400).json({ message: "Invalid creation parameters", ...errors });
            return;
        }
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.updateMedicineById = async (req, res) => {
    try {
        let updatedMedicine;
        if (req.method === "PUT") {
            updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
                new: true, runValidators: true
            });
        } else if (req.method === "PATCH") {
            updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
                $set: req.body}, { new: true, runValidators: true });
        } else {
            res.status(405).json({ message: "Method not allowed" });
            return;
        }
        if (!updatedMedicine) {
            res.status(404).json({ message: `Medicine : ${req.params.id} was not found.` });
            return;
        }
        res.json(updatedMedicine);
    } catch (err) {
        // Check if id is invalid
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(400).json({ message: "Invalid Medicine ID format." });
            return;
        }
        // Check if it is a validation error
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map((error) => error.message);
            res.status(400).json({ message: "Invalid creation parameters", ...errors });
            return;
        }
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.deleteMedicineById = async (req, res) => {
    try {
        const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedMedicine) {
            res.status(404).json({ message: `Medicine : ${req.params.id} was not found.` });
            return;
        }
        res.status(204).end();
    } catch (err) {
        // Check if id is invalid
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(400).json({ message: "Invalid Medicine ID format." });
            return;
        }
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};