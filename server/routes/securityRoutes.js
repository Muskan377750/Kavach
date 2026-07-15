const express = require("express");
const router = express.Router();

const authorize = require("../middlewares/roleMiddleware");
const protect = require("../middlewares/authMiddleware");

router.get("/alerts",protect,authorize("Admin","SecurityAnalyst"),(req,res)=>{
    res.json({
        message: "Security Alerts Page",
        user: req.user
    });
});

module.exports = router;