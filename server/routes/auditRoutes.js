const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLog");
const protect = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get("/",protect,authorize("Admin","SecurityAnalyst"),async(req,res)=>{
    const logs = await AuditLog.find()
    .populate("user","name email")
    .sort({createdAt:-1});
    res.json(logs);
}); 

module.exports = router;