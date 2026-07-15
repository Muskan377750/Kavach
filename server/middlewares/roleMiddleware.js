const logActivity = require("../utils/auditLogger");
const createAlert = require("../utils/createAlert");

const authorize = (...roles)=>{
    return async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            await logActivity(
                req.user.id,
                "Unauthorized Access Attempt",
                "Failed",
                req.ip,
                req.user.role,
                "High"
            )
            await createAlert(
                req.user.id,
                "Unauthorized Access",
                `${req.user.role} attempted to access restricted resource`,
                "High" 
            );
            return res.status(403).json({
                message: "Access Denied"
            });
        }
        next();
    };
};

module.exports = authorize;