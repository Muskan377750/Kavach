import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ReportCard from "../components/ReportCard";
import ReportsChart from "../components/ReportsChart";
import ExportButtons from "../components/ExportButtons";

import useReports from "../hooks/useReports";

import "../styles/dashboard.css";
import "../styles/reports.css";


function Reports() {


  const {
    reports = {},
    loading,
    error
  } = useReports();



  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Navbar />


        <div className="dashboard-content">


          <div className="reports-page">


            <div className="reports-header">

              <div>

                <h1>
                  📊 Security Analytics Center
                </h1>


                <p>
                  Enterprise security performance and threat intelligence reports
                </p>

              </div>

            </div>



            {
              loading && (

                <div className="page-loading">

                  Loading Reports...

                </div>

              )
            }



            {
              error && (

                <div className="page-error">

                  {error}

                </div>

              )
            }




            {
              !loading && !error && (

                <>


                  <div className="reports-grid">


                    <ReportCard
                      title="Employees"
                      value={reports.totalEmployees || 0}
                      icon="👥"
                      color="#2563EB"
                    />


                    <ReportCard
                      title="Total Alerts"
                      value={reports.totalAlerts || 0}
                      icon="🚨"
                      color="#DC2626"
                    />


                    <ReportCard
                      title="Critical Alerts"
                      value={reports.criticalAlerts || 0}
                      icon="⚠️"
                      color="#EA580C"
                    />


                    <ReportCard
                      title="Resolved Alerts"
                      value={reports.resolvedAlerts || 0}
                      icon="✅"
                      color="#16A34A"
                    />


                    <ReportCard
                      title="Open Alerts"
                      value={reports.openAlerts || 0}
                      icon="📂"
                      color="#7C3AED"
                    />


                    <ReportCard
                      title="Audit Logs"
                      value={reports.auditLogs || 0}
                      icon="📜"
                      color="#0F766E"
                    />


                  </div>



                  <div className="dashboard-panel">

                    <ReportsChart
                      data={reports.departmentData || []}
                    />

                  </div>




                  <ExportButtons />


                </>

              )
            }



          </div>


        </div>


      </div>


    </div>

  );

}


export default Reports;