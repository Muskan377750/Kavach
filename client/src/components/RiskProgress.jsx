import "../styles/employeeModal.css";

function RiskProgress({ score }) {
  let color = "#22c55e";

  if (score >= 75) {
    color = "#dc2626";
  } else if (score >= 50) {
    color = "#f97316";
  } else if (score >= 25) {
    color = "#3b82f6";
  }

  return (
    <div className="risk-progress">
      <div
        className="risk-fill"
        style={{
          width: `${score}%`,
          background: color,
        }}
      ></div>
    </div>
  );
}

export default RiskProgress;