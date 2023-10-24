import React from "react";
import {
 
    MDBRow,
    MDBCol,
  
  } from 'mdb-react-ui-kit';
import BookedStats from "./BookedStats";
import CancelledStats from "./CancelledStats";
import UsersStats from "./UsersStats";
import EarningStats from "./EaringStats";
//import DashboardGraph from "../Admindashboard/DashboardChart/dashboardgraph";

const AllDashboardStats=()=> {
   
      return (
       <>
       <br/>
       <div className="container-fluidd">
       
        <div className="col-md-12 body flex-grow-1 px-0">
       
        <div>
       
      <div className="row">
     
      {/* <div className="col-md-6 dashboard-grph-img">
        <DashboardGraph/>
        
        </div> */}
       <div className="col-md-6">

        <div className="booked-trips-outer">
        <MDBRow>
        <MDBCol sm='6' className="booked-trips">
      <BookedStats/>
      </MDBCol>
      <MDBCol sm='6' className="cancelledtrips">
      <CancelledStats/>
      </MDBCol>
      <MDBCol sm='6' className="newUsers">
       < UsersStats/>
      </MDBCol>
      <MDBCol sm='6' className="totalEarnings">
       < EarningStats/>
      </MDBCol>
    </MDBRow>

          </div>
        </div>
       
      
      </div>
    </div>
   
       </div>
       </div>
       <br/>
       
       
       </>
      );
    };
  
   export default AllDashboardStats; 