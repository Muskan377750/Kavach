import {
  FaShieldAlt,
  FaCheckCircle,
  FaRobot,
  FaWifi,
} from "react-icons/fa";

import "../styles/dashboard.css";

function SecurityHealth() {

  const score = 96;

  return (

    <div className="security-health">

      <div className="health-header">

        <div>

          <h2>Security Health</h2>

          <p>Enterprise Protection Status</p>

        </div>

        <div className="live-chip">

          <span className="pulse-dot"></span>

          LIVE

        </div>

      </div>

      <div className="health-circle">

        <div className="circle">

          <div className="circle-inner">

            <FaShieldAlt className="health-shield"/>

            <h1>{score}%</h1>

            <span>Protected</span>

          </div>

        </div>

      </div>

      <div className="health-grid">

        <div className="health-box">

          <FaCheckCircle/>

          <div>

            <h4>Threat Detection</h4>

            <span>Operational</span>

          </div>

        </div>

        <div className="health-box">

          <FaRobot/>

          <div>

            <h4>AI Engine</h4>

            <span>Monitoring</span>

          </div>

        </div>

        <div className="health-box">

          <FaWifi/>

          <div>

            <h4>Network</h4>

            <span>Stable</span>

          </div>

        </div>

      </div>

      <div className="security-score">

        <div className="score-row">

          <span>Firewall</span>

          <span>100%</span>

        </div>

        <div className="progress">

          <div className="progress-fill firewall"></div>

        </div>

        <div className="score-row">

          <span>Authentication</span>

          <span>95%</span>

        </div>

        <div className="progress">

          <div className="progress-fill auth"></div>

        </div>

        <div className="score-row">

          <span>Endpoint Security</span>

          <span>92%</span>

        </div>

        <div className="progress">

          <div className="progress-fill endpoint"></div>

        </div>

      </div>

    </div>

  );

}

export default SecurityHealth;