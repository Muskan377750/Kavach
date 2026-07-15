const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const { getUsers } = require("../controllers/userController");

router.get(
  "/",
  protect,
  authorize("Admin", "SecurityAnalyst"),
  getUsers
);

module.exports = router;