const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        action:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum:["Success","Failed"],
            default:"Success"
        },
        ipAddress:{
            type:String
        },
        role:{
            type:String
        },
        riskLevel:{
            type:String,
            enum:["Low","Medium","High"],
            default:"Low"
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("AuditLog",auditLogSchema);