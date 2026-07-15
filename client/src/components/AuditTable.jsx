import { FaSearch, FaDownload } from "react-icons/fa";
import useAuditLogs from "../hooks/useAuditLogs";
import "../styles/auditlogs.css";

function AuditTable() {

  const { logs, loading, error } = useAuditLogs();

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (

    <div className="audit-table">

      <div className="audit-header">

        <h2>📋 Audit Logs</h2>

        <div className="audit-actions">

          <input
            type="text"
            placeholder="Search employee..."
          />

          <button>

            <FaDownload />

            Export

          </button>

        </div>

      </div>

      <table>

        <thead>

          <tr>

            <th>Employee</th>

            <th>Action</th>

            <th>Status</th>

            <th>Risk</th>

            <th>IP Address</th>

            <th>Time</th>

          </tr>

        </thead>

        <tbody>

          {logs.map((log)=>(

            <tr key={log._id}>

              <td>{log.user?.name}</td>

              <td>{log.action}</td>

              <td>

                <span className={log.status.toLowerCase()}>

                  {log.status}

                </span>

              </td>

              <td>

                <span className={log.riskLevel.toLowerCase()}>

                  {log.riskLevel}

                </span>

              </td>

              <td>{log.ipAddress}</td>

              <td>

                {new Date(log.createdAt).toLocaleString()}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AuditTable;