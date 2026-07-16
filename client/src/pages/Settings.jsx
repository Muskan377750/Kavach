import {
  FiSettings,
  FiShield,
  FiBell,
  FiLock,
  FiUser
} from "react-icons/fi";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/settings.css";


function Settings() {


  const [security, setSecurity] = useState(true);
  const [alerts, setAlerts] = useState(true);



  return (

    <div className="dashboard-layout">


      <Sidebar />


      <div className="dashboard-main">


        <Navbar />


        <div className="dashboard-content">


          <div className="settings-page">


            <div className="settings-header">


              <h1>
                <FiSettings />
                Security Settings
              </h1>


              <p>
                Manage KAVACH platform preferences
              </p>


            </div>




            <div className="settings-grid">



              <div className="settings-card">


                <FiShield />


                <div>

                  <h3>
                    Security Mode
                  </h3>


                  <p>
                    Enterprise Protection Active
                  </p>

                </div>



                <button
                  className={security ? "active" : ""}
                  onClick={() => setSecurity(!security)}
                >

                  {security ? "ON" : "OFF"}

                </button>


              </div>





              <div className="settings-card">


                <FiBell />


                <div>

                  <h3>
                    Alert Notifications
                  </h3>


                  <p>
                    Real-time threat notifications
                  </p>

                </div>



                <button
                  className={alerts ? "active" : ""}
                  onClick={() => setAlerts(!alerts)}
                >

                  {alerts ? "ON" : "OFF"}

                </button>


              </div>






              <div className="settings-card">


                <FiLock />


                <div>

                  <h3>
                    Authentication
                  </h3>


                  <p>
                    JWT + Role Based Access Control
                  </p>

                </div>


                <span className="active">
                  SECURE
                </span>


              </div>







              <div className="settings-card">


                <FiUser />


                <div>

                  <h3>
                    Administrator Profile
                  </h3>


                  <p>
                    Security Officer
                  </p>

                </div>


              </div>



            </div>


          </div>


        </div>


      </div>


    </div>


  );

}


export default Settings;