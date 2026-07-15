const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
  user,
  action,
  status = "Success",
  ipAddress,
  role,
  riskLevel = "Low",
}) => {
  try {
    await AuditLog.create({
      user,
      action,
      status,
      ipAddress,
      role,
      riskLevel,
    });
  } catch (err) {
    console.error("Audit Log Error:", err.message);
  }
};

module.exports = createAuditLog;