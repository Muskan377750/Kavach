const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorize = require("../middlewares/roleMiddleware");

const {
  getReportStats,
} = require("../controllers/reportController");

router.get(
  "/",
  protect,
  authorize("Admin", "SecurityAnalyst"),
  getReportStats
);

module.exports = router;