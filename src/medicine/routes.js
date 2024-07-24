const express = require("express");
const router = express.Router();
const controller = require("./controller");

// CRUD Routes
router.get("/:id", controller.getMedicineById);
router.post("/:id", controller.createMedicine);
router.put("/:id", controller.updateMedicineById);
router.patch("/:id", controller.updateMedicineById);
router.delete("/:id", controller.deleteMedicineById);

module.exports = router;