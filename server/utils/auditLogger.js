const AuditLog = require("../models/AuditLog");

const logActivity = async(
    user,
    action,
    status,
    ipAddress,
    role,
    riskLevel
)=>{
    try{
        await AuditLog.create({
            user,
            action,
            status,
            ipAddress,
            role,
            riskLevel
        });
    }catch(error){
        console.log(error.message);
    }
};

module.exports = logActivity;