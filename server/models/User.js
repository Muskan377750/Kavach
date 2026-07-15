const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Admin","SecurityAnalyst","Employee"],
        default:"Employee",
    },
    department:{
        type:String,
        default:"General",
    },
    failedLoginAttempts:{
        type:Number,
        default:0,
    },
    lastLogin:{
        type:Date,
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema);