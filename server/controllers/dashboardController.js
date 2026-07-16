const User = require("../models/User");
const Alert = require("../models/Alert");
const AuditLog = require("../models/AuditLog");

const getDashboardData = async (req, res) => {
  try {

    // ===========================
    // Dashboard Counts
    // ===========================

    const [
      activeEmployees,
      openAlerts,
      auditLogs,
      highRiskUsers,
    ] = await Promise.all([
      User.countDocuments(),
      Alert.countDocuments({ status: "Open" }),
      AuditLog.countDocuments(),
      Alert.distinct("user", {
        riskLevel: { $in: ["High", "Critical"] },
        status: "Open",
      }),
    ]);

    // ===========================
    // Recent Alerts (FOR THREAT FEED)
    // ===========================

    const recentAlerts = await Alert.find()
      .populate("user", "name department")
      .sort({ createdAt: -1 })
      .limit(8);

    // ===========================
    // Top Risk Employees
    // ===========================

    const users = await User.find().select("-password");

    const topRiskEmployees = await Promise.all(
      users.map(async (user) => {

        const alerts = await Alert.find({
          user: user._id,
        });

        let riskScore = 0;

        alerts.forEach((alert) => {

          switch (alert.riskLevel) {

            case "Low":
              riskScore += 10;
              break;

            case "Medium":
              riskScore += 25;
              break;

            case "High":
              riskScore += 45;
              break;

            case "Critical":
              riskScore += 65;
              break;

            default:
              break;
          }

        });

        riskScore = Math.min(riskScore, 100);

        return {

          name: user.name,

          department: user.department,

          role: user.role,

          riskScore,

        };

      })
    );

    topRiskEmployees.sort(
      (a, b) => b.riskScore - a.riskScore
    );

    // ===========================
    // Recent Investigations
    // ===========================

    const recentInvestigations = await Alert.find()
      .populate("user", "name department")
      .sort({ updatedAt: -1 })
      .limit(5);

    // ===========================
    // Response
    // ===========================

    res.json({

      activeEmployees,

      openAlerts,

      auditLogs,

      highRiskUsers: highRiskUsers.length,

      recentAlerts,

      topRiskEmployees: topRiskEmployees.slice(0, 5),

      recentInvestigations,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardData,
};