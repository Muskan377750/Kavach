import {
  FiShield,
  FiCheckCircle,
  FiCpu,
  FiDatabase,
  FiServer,
} from "react-icons/fi";

import "../styles/securityHealth.css";

function SecurityHealth() {

  const score = 96;

  const metrics = [
    {
      title: "Firewall",
      value: "Healthy",
      progress: 100,
      icon: <FiShield />,
      color: "#22C55E",
    },
    {
      title: "IDS / IPS",
      value: "Running",
      progress: 98,
      icon: <FiCpu />,
      color: "#3B82F6",
    },
    {
      title: "Database",
      value: "Protected",
      progress: 94,
      icon: <FiDatabase />,
      color: "#F59E0B",
    },
    {
      title: "Servers",
      value: "Operational",
      progress: 97,
      icon: <FiServer />,
      color: "#8B5CF6",
    },
  ];

  return (

    <div className="security-card">

      {/* Header */}

      <div className="security-header">

        <div>

          <h3>

            <FiShield />

            Security Health

          </h3>

          <p>
            Real-time protection status
          </p>

        </div>

        <div className="security-score">

          <span>{score}</span>

          <small>/100</small>

        </div>

      </div>

      {/* Metrics */}

      <div className="security-grid">

        {metrics.map((item) => (

          <div
            className="security-item"
            key={item.title}
          >

            <div className="security-icon">

              {item.icon}

            </div>

            <div className="security-info">

              <div className="security-top">

                <span>{item.title}</span>

                <strong>{item.value}</strong>

              </div>

              <div className="progress">

                <div
                  className="progress-fill"
                  style={{
                    width: `${item.progress}%`,
                    background: item.color,
                  }}
                ></div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="security-footer">

        <FiCheckCircle />

        All enterprise protection services are operating normally.

      </div>

    </div>

  );

}

export default SecurityHealth;