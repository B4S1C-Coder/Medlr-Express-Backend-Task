const express = require("express");
const router = express.Router();
const controller = require("./controller");
const search = require("./search");

// Search Routes
// Example search query
// http://localhost:3000/medicine/search?name=Guaif&manufacturer=Des&limit=20&sortField=manufacturer&sortOrder=desc
router.get("/search", search.executeSearch);

// CRUD Routes
router.get("/:id", controller.getMedicineById);
router.post("", controller.createMedicine);
router.put("/:id", controller.updateMedicineById);
router.patch("/:id", controller.updateMedicineById);
router.delete("/:id", controller.deleteMedicineById);

module.exports = router;