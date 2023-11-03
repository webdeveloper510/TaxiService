import React from "react";
import AppHeader from "../../TopBar/AppHeader";
import RecentTrips from "../../Hotel/Trips/recenttrips";
//import BookingRequestTable from "./BookingRequestTable";
//import background from '../assets/images/heroimg.png';
import RiderStatusTable from "../../Stats/RiderStatusTable";
//import { useSearchParams } from "react-router-dom";
import SuperAdminSideBar from "../Sidebar/SideBar";
import SuperTaxiMap from "./SuperMap";
import SuperStats from "./SuperStats";

const SuperDashboard = () => {


  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SuperAdminSideBar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />

              <div className="body flex-grow-1 px-3">
                {/* <h1 className="heading-for-every-page">Dashboard</h1> */}
                {/* <div class="map-outer super-map-outer">
                  <h2>Taxi Live Location </h2>
                  <SuperTaxiMap />
                </div> */}

                {/* <div className="home-dashobard-chart">
            <DashboardGraph/>
          </div> */}


                <div className=" row col-md-12">
                  <div className="col-md-12 stats-outer">

                   <SuperStats/>
                  </div>


                </div>
                <div className="row driver-recent-trips">

                  <div className="col-md-12 dashboard-grph-img">
                    <RecentTrips from={"super"} />

                  </div>



                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default SuperDashboard; 