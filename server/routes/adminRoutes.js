const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorize = require("../middlewares/roleMiddleware");

router.get("/dashboard",protect,authorize("Admin"),(req,res)=>{
    res.json({
        message: "Welcome Admin",
        user: req.user
    });
});

module.exports = router;