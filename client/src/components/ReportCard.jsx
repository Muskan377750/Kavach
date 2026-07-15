function ReportCard({ title, value, icon, color }) {
  return (
    <div
      className="report-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div className="report-icon">
        {icon}
      </div>

      <div>

        <h4>{title}</h4>

        <h2>{value}</h2>

      </div>

    </div>
  );
}

export default ReportCard;