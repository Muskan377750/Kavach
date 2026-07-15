const User = require("../models/User");
const Alert = require("../models/Alert");
const AuditLog = require("../models/AuditLog");

const calculateRisk = require("../utils/riskEngine");

// =======================================
// Get All Employees
// =======================================

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const employees = await Promise.all(
      users.map(async (user) => {

        const alerts = await Alert.find({
          user: user._id,
        });

        const auditLogs = await AuditLog.find({
          user: user._id,
        });

        const alertCount = alerts.length;

        const auditCount = auditLogs.length;

        const risk = calculateRisk(
          user,
          alerts,
          auditLogs
        );

        return {
          ...user.toObject(),

          alertCount,

          auditCount,

          riskScore: risk.score,

          riskLevel: risk.level,
        };
      })
    );

    // Highest risk first
    employees.sort(
      (a, b) => b.riskScore - a.riskScore
    );

    res.json(employees);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getUsers,
};