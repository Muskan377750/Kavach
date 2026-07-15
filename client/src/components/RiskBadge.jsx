import "../styles/users.css";

function RiskBadge({ score }) {
  let level = "Low";
  let className = "risk-low";

  if (score >= 75) {
    level = "Critical";
    className = "risk-critical";
  } else if (score >= 50) {
    level = "High";
    className = "risk-high";
  } else if (score >= 25) {
    level = "Medium";
    className = "risk-medium";
  }

  return <span className={className}>{level}</span>;
}

export default RiskBadge;