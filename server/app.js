const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const securityRoutes = require("./routes/securityRoutes");
const auditRoutes = require("./routes/auditRoutes");
const alertRoutes = require("./routes/alertRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/security",securityRoutes);
app.use("/api/audit",auditRoutes);
app.use("/api/alerts",alertRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

app.get("/",(req,res)=>{
    res.json({
        message: "Welcome to Bank Security System API"
    });
});

module.exports = app;