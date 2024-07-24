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

exports.createMedicine = async (req, res) => {
    try {
        const medicine = new Medicine(req.body);
        const savedMedicine = await medicine.save();
        res.json(savedMedicine);
    } catch (err) {
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
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(400).json({ message: "Invalid Medicine ID format." });
            return;
        }
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
        if (err.name === "CastError" && err.kind === "ObjectId") {
            res.status(400).json({ message: "Invalid Medicine ID format." });
            return;
        }
        console.log(err);
        res.status(500).json({ message: "Internal server error." });
    }
};