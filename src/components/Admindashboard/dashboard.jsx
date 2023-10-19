import React from "react";
import AppHeader from "../TopBar/AppHeader";
import Map from "../TaxiMap/Map";
import Sidebar2 from "../Admindashboard/SideBar2";
import DashboardStats from "../Stats/DashBoardStats";
import RecentTrips from "./Trips/recenttrips";
//import BookingRequestTable from "./BookingRequestTable";
//import background from '../assets/images/heroimg.png';
import RiderStatusTable from '../Stats/RiderStatusTable'

const Dashboard=()=> {
   
      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
        <Sidebar2/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
    
        <div className="body flex-grow-1 px-3">
          <h1 className="heading-for-every-page">Dashboard</h1>
          <div class="map-outer"> 
          <h2>Taxi Live Location</h2>
          <Map /></div>
          
          {/* <div className="home-dashobard-chart">
            <DashboardGraph/>
          </div> */}
          <div className="stats-outer">
            <DashboardStats/>
          </div>

          <div className="row driver-recent-trips">
     
      <div className="col-md-8 dashboard-grph-img">
      <RecentTrips/>
        
        </div>
       <div className="col-md-4">

        <div className="booked-trips-outer">
        <RiderStatusTable/>

          </div>
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
  
   export default Dashboard; 