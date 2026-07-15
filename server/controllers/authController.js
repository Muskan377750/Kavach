const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const logActivity = require("../utils/auditLogger");
const createAlert = require("../utils/createAlert");


// =========================
// REGISTER
// =========================

const register = async (req, res) => {
  try {
    const { name, email, password, role, department } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    await logActivity(
      user._id,
      "User Registered",
      "Success",
      req.ip,
      user.role,
      "Low"
    );

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// =========================
// LOGIN
// =========================

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // User not found
    if (!user) {

      await logActivity(
        null,
        "Unknown User Login",
        "Failed",
        req.ip,
        "Unknown",
        "Medium"
      );

      return res.status(400).json({
        message: "Invalid Email or Password",
      });

    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      user.failedLoginAttempts += 1;
      await user.save();

      await logActivity(
        user._id,
        "Failed Login",
        "Failed",
        req.ip,
        user.role,
        "Medium"
      );

      // Create alert after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {

        await createAlert(
          user._id,
          "Multiple Failed Logins",
          "More than five failed login attempts detected",
          "High"
        );

      }

      return res.status(400).json({
        message: "Invalid Email or Password",
      });

    }

    // Reset failed attempts
    user.failedLoginAttempts = 0;
    user.lastLogin = new Date();

    await user.save();

    // JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Successful login audit
    await logActivity(
      user._id,
      "User Logged In",
      "Success",
      req.ip,
      user.role,
      "Low"
    );

    // Late Night Login Alert
    const hour = new Date().getHours();

    if (hour >= 22 || hour <= 5) {

      await createAlert(
        user._id,
        "Late Night Login",
        "Privileged account logged in during unusual hours",
        "Medium"
      );

    }

    // Admin login
    if (user.role === "Admin") {

      await createAlert(
        user._id,
        "Administrator Login",
        "Administrator accessed the system.",
        "Low"
      );

    }

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  register,
  login,
};