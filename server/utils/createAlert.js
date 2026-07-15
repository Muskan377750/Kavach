const Alert = require("../models/Alert");
const { getIO } = require("../socket");

const createAlert = async (
  user,
  alertType,
  message,
  riskLevel
) => {
  try {
    console.log("🔥 createAlert() called");

    const alert = await Alert.create({
      user,
      alertType,
      message,
      riskLevel,
    });

    // Populate user so frontend receives complete data
    await alert.populate(
      "user",
      "name email department role"
    );

    const io = getIO();

    io.emit("new-alert", alert);

    console.log("📢 Socket Event Sent");

    return alert;

  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createAlert;