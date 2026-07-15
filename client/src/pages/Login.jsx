import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { motion } from "framer-motion";

import { loginUser } from "../services/authService";

import "../styles/login.css";

function Login() {
const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const data = await loginUser(email, password);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/dashboard");
  } catch (err) {
    setError(
      err.response?.data?.message || "Unable to login. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      {/* LEFT SIDE */}

      <motion.div
        className="left-panel"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="logo">
          <MdSecurity />
        </div>

        <h1>BankGuard AI</h1>

        <h3>Security Operations Center</h3>

        <p>
          Intelligent monitoring platform for detecting privileged access
          misuse, insider threats and suspicious employee behaviour.
        </p>

        <div className="features">
          <div>✔ Real-Time Threat Detection</div>

          <div>✔ Audit Log Monitoring</div>

          <div>✔ Role Based Access Control</div>

          <div>✔ Risk Score Engine</div>

          <div>✔ JWT Authentication</div>

          <div>✔ Live Security Dashboard</div>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}

      <motion.div
        className="right-panel"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Welcome Back 👋</h2>

          <p>Login to continue monitoring your bank infrastructure.</p>

          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="eye"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <span>Forgot Password?</span>
          </div>
{
  error && (
    <p
      style={{
        color: "#ff4d4f",
        textAlign: "center",
        marginBottom: "15px",
        fontWeight: "600",
      }}
    >
      {error}
    </p>
  )
}
          <button type="submit" disabled={loading}>{loading ? "Authenticating..." : "Secure Login"}</button>

          <div className="security-status">
            <div>🟢 Firewall Active</div>

            <div>🟢 Threat Engine Running</div>

            <div>🟢 Database Connected</div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
