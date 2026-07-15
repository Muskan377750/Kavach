function NotificationDropdown({ notifications }) {

  return (

    <div className="notification-dropdown">

      <h3>Latest Alerts</h3>

      {

        notifications.length===0?

        (

          <p className="empty-notification">

            No alerts

          </p>

        )

        :

        notifications.slice(0,6).map((alert)=>(

          <div
            key={alert._id}
            className="notification-item"
          >

            <div>

              <strong>

                {alert.riskLevel}

              </strong>

              <p>

                {alert.alertType}

              </p>

            </div>

            <small>

              {
                new Date(
                  alert.createdAt
                ).toLocaleString()
              }

            </small>

          </div>

        ))

      }

    </div>

  );

}

export default NotificationDropdown;