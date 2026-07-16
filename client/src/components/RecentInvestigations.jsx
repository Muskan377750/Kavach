import {
  FiFileText,
  FiUser,
  FiClock,
  FiChevronRight
} from "react-icons/fi";

import "../styles/recentInvestigations.css";


function RecentInvestigations({ investigations = [] }) {


  const getStatus = (status)=>{

    const value =
      (status || "Pending")
      .toLowerCase();

    return value;

  };


  return (

    <div className="investigation-panel">


      <div className="investigation-header">


        <div>

          <h2>
            Recent Investigations
          </h2>

          <p>
            Active security investigations and response tracking
          </p>

        </div>


        <FiFileText className="header-icon"/>


      </div>





      {

      investigations.length === 0 ?


      (

        <div className="investigation-empty">

          <FiFileText/>

          <h3>
            No Active Investigations
          </h3>

          <p>
            All security cases are currently clear
          </p>


        </div>

      )


      :


      (

        <div className="investigation-list">


        {

        investigations
        .slice(0,5)
        .map((item,index)=>(


          <div
            className="investigation-card"
            key={
              item._id ||
              item.id ||
              index
            }
          >


            <div className="case-icon">

              <FiFileText/>

            </div>





            <div className="case-content">


              <div className="case-top">


                <h3>

                  {
                    item.title ||
                    "Privilege Access Investigation"
                  }

                </h3>



                <span
                  className={
                    `case-status ${
                      getStatus(item.status)
                    }`
                  }
                >

                  {
                    item.status ||
                    "Pending"
                  }

                </span>


              </div>





              <div className="case-info">


                <span>

                  <FiUser/>

                  {
                    item.assignedTo ||
                    "Security Team"
                  }

                </span>



                <span>

                  <FiClock/>

                  {
                    item.createdAt
                    ?
                    new Date(
                      item.createdAt
                    )
                    .toLocaleDateString()
                    :
                    "Today"
                  }

                </span>


              </div>




              <div className="case-footer">


                <span>

                  Case #
                  {
                    item.caseId ||
                    "KVC-" + (index+100)
                  }

                </span>


                <FiChevronRight/>


              </div>


            </div>


          </div>


        ))

        }


        </div>

      )

      }


    </div>

  );

}


export default RecentInvestigations;