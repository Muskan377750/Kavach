const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    alertType:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    riskLevel:{
        type:String,
        enum:["Low","Medium","High","Critical"],
        default:"Low"
    },

    riskScore:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:["Open","Investigating","Resolved"],
        default:"Open"
    },

    assignedTo: {
    type: String,
    default: "Unassigned",
    },

    ipAddress:{
        type:String,
        default:"127.0.0.1"
    },

    location:{
        type:String,
        default:"Hoshiarpur, Punjab"
    },

    browser:{
        type:String,
        default:"Chrome"
    },

    device:{
        type:String,
        default:"Windows Laptop"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Alert",alertSchema);