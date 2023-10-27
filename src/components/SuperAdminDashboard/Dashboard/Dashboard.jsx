import React from "react";
import AppHeader from "../../TopBar/AppHeader";
import DashboardStats from "../../Stats/DashBoardStats";
import RecentTrips from "../../Admindashboard/Trips/recenttrips";
//import BookingRequestTable from "./BookingRequestTable";
//import background from '../assets/images/heroimg.png';
import RiderStatusTable from "../../Stats/RiderStatusTable";
//import SideBar2 from "../../Admindashboard/SideBar2";
import SuperSideBar from "../SiderNavBar/Sidebar";
import SuperMap from "../../TaxiMap/Map";
import AllDashboardStats from "../DashboardStats/AllStats";
import { useSearchParams } from "react-router-dom";

const SuperAdminDashboard=()=> {
   
  
      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
       <SuperSideBar/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
    
        <div className="body flex-grow-1 px-3">
          <h1 className="heading-for-every-page">Dashboard</h1>
          <div class="map-outer"> 
          <h2>Taxi Live Location</h2>
          <SuperMap/>
          </div>
          
          {/* <div className="home-dashobard-chart">
            <DashboardGraph/>
          </div> */}
         

          <div className=" row col-md-12">
          <div className="col-md-6 stats-outer">
          
          <AllDashboardStats/>
           </div>
<div className="col-md-6 booked-trips-outer">
<RiderStatusTable/>

  </div>

</div>
          <div className="row driver-recent-trips">
     
      <div className="col-md-12 dashboard-grph-img">
      <RecentTrips/>
        
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
  
   export default SuperAdminDashboard; 