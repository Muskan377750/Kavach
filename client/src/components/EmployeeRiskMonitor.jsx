import {
  FiUser,
  FiShield,
  FiAlertTriangle,
  FiChevronRight
} from "react-icons/fi";

import "../styles/employeeRisk.css";


function EmployeeRiskMonitor({ employees = [] }) {


  const getRiskLevel = (score) => {

    if(score >= 80)
      return "critical";

    if(score >= 50)
      return "high";

    if(score >= 25)
      return "medium";

    return "low";

  };



  return (

    <div className="employee-monitor">


      <div className="employee-header">


        <div>

          <h2>
            Employee Risk Monitor
          </h2>

          <p>
            Privileged user behavior analysis
          </p>

        </div>


        <div className="employee-count">

          <FiShield />

          {employees.length} Users

        </div>


      </div>





      {
        employees.length === 0 ?


        (

          <div className="employee-empty">

            <FiUser/>

            <p>
              No risky employees detected
            </p>

          </div>

        )


        :


        (

          <div className="employee-list">


          {
            employees
            .slice(0,6)
            .map((employee,index)=>(


              <div
                className="employee-card"
                key={
                  employee._id ||
                  index
                }
              >



                <div className="employee-avatar">

                  {
                    employee.name
                    ?
                    employee.name
                    .charAt(0)
                    .toUpperCase()
                    :
                    "U"
                  }

                </div>





                <div className="employee-details">


                  <h3>

                    {
                      employee.name ||
                      "Unknown Employee"
                    }

                  </h3>


                  <span>

                    {
                      employee.department ||
                      "Security Department"
                    }

                  </span>


                </div>





                <div className="risk-section">


                  <div className="risk-score">


                    <FiAlertTriangle/>


                    {
                      employee.riskScore ??
                      0
                    }


                  </div>



                  <span
                    className={
                      `employee-risk ${
                        getRiskLevel(
                          employee.riskScore || 0
                        )
                      }`
                    }
                  >

                    {
                      getRiskLevel(
                        employee.riskScore || 0
                      )
                    }

                  </span>


                </div>




                <FiChevronRight 
                  className="employee-arrow"
                />


              </div>


            ))

          }


          </div>


        )

      }


    </div>

  );

}


export default EmployeeRiskMonitor;