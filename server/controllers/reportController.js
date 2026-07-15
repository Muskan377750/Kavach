const User = require("../models/User");
const Alert = require("../models/Alert");
const AuditLog = require("../models/AuditLog");

const getReportStats = async (req, res) => {
  try {

    const totalEmployees = await User.countDocuments();

    const totalAlerts = await Alert.countDocuments();

    const criticalAlerts = await Alert.countDocuments({
      riskLevel: "Critical",
    });

    const resolvedAlerts = await Alert.countDocuments({
      status: "Resolved",
    });

    const openAlerts = await Alert.countDocuments({
      status: {
        $ne: "Resolved",
      },
    });

    const auditLogs = await AuditLog.countDocuments();

    const users = await User.find();

    const departmentData = [];

    for (const user of users) {

      const alerts = await Alert.countDocuments({
        user: user._id,
      });

      const existing = departmentData.find(
        (d) => d.department === user.department
      );

      if (existing) {

        existing.threats += alerts;

      } else {

        departmentData.push({
          department: user.department,
          threats: alerts,
        });

      }

    }

    res.json({
      totalEmployees,
      totalAlerts,
      criticalAlerts,
      resolvedAlerts,
      openAlerts,
      auditLogs,
      departmentData,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getReportStats,
};  