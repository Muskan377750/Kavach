const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
  getAlerts,
  investigateAlert,
  resolveAlert,
} = require("../controllers/alertController");

router.get(
  "/",
  protect,
  authorize("Admin", "SecurityAnalyst"),
  getAlerts
);

router.put(
  "/:id/investigate",
  protect,
  authorize("Admin", "SecurityAnalyst"),
  investigateAlert
);

router.put(
  "/:id/resolve",
  protect,
  authorize("Admin", "SecurityAnalyst"),
  resolveAlert
);

module.exports = router;