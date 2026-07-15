const Alert = require("../models/Alert");
const createAuditLog = require("../utils/createAuditLog");

// =======================
// GET ALL ALERTS
// =======================

const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("user", "name email department role")
      .sort({ createdAt: -1 });

    res.json(alerts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// INVESTIGATE ALERT
// =======================

const investigateAlert = async (req, res) => {
  try {
    console.log("JWT User:", req.user);
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: "Investigating",
      },
      {
        new: true,
      },
    );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    await createAuditLog({
      user: req.user._id,
      action: `Investigated alert: ${alert.alertType}`,
      status: "Success",
      ipAddress: req.ip,
      role: req.user.role,
      riskLevel: alert.riskLevel,
    });

    res.json({
      message: "Alert marked as Investigating",
      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// RESOLVE ALERT
// =======================

const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: "Resolved",
      },
      {
        new: true,
      },
    );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found",
      });
    }

    await createAuditLog({
      user: req.user._id,
      action: `Resolved alert: ${alert.alertType}`,
      status: "Success",
      ipAddress: req.ip,
      role: req.user.role,
      riskLevel: alert.riskLevel,
    });

    res.json({
      message: "Alert Resolved",
      alert,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAlerts,
  investigateAlert,
  resolveAlert,
};
