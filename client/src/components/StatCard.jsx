import "../styles/dashboard.css";

function StatCard({ title, value, color }) {

  return (

    <div className="stat-card">

      <div className="stat-header">

        <h4>{title}</h4>

        <div
          className="stat-dot"
          style={{ background: color }}
        ></div>

      </div>

      <h1 style={{ color }}>{value}</h1>

      <p className="stat-footer">

        ↑ Updated just now

      </p>

    </div>

  );

}

export default StatCard;