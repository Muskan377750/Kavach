import "../styles/dashboard.css";

function IncidentTimeline({ investigations = [] }) {
  if (!investigations.length) {
    return (
      <div className="incident-timeline">

        <div className="section-header">

          <h2>🚨 Incident Timeline</h2>

          <span className="live-badge">
            LIVE
          </span>

        </div>

        <div className="empty-state">

          No recent investigations.

        </div>

      </div>
    );
  }

  return (
    <div className="incident-timeline">

      <div className="section-header">

        <h2>🚨 Incident Timeline</h2>

        <span className="live-badge">
          LIVE
        </span>

      </div>

      {investigations.map((item) => (

        <div
          className="timeline-item"
          key={item._id}
        >

          <div
            className={`timeline-dot ${item.status.toLowerCase()}`}
          ></div>

          <div className="timeline-content">

            <div className="timeline-top">

              <h3>{item.alertType}</h3>

              <span className="timeline-time">

                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}

              </span>

            </div>

            <p>

              <strong>Employee:</strong>{" "}
              {item.user?.name || "Unknown"}

            </p>

            <p>

              <strong>Status:</strong>{" "}

              <span
                className={`status-pill ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

            </p>

          </div>

        </div>

      ))}

    </div>
  );
}

export default IncidentTimeline;