import React from "react";
import {
 
    MDBRow,
    MDBCol,
  
  } from 'mdb-react-ui-kit';
  import BookedTrips from "./BookedTrips";
import CancelledTrips from "./CancelledTrips";
import NewUsers from "./NewUsers";
import DashboardGraph from "../Hotel/DashboardChart/dashboardgraph";
import PendingTrips from "./PendingTrips";
const DashboardStats=()=> {
   
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
       <div className="col-md-12 hotel-stats">

        <div className="booked-trips-outer">
        <MDBRow>
        <MDBCol md='6' className="booked-trips all_same">
       < BookedTrips/>
      </MDBCol>
      <MDBCol sm='6' className="pendingtrips all_same">
    <PendingTrips/>
      </MDBCol>
      <MDBCol md='6' className="cancelledtrips all_same">
       < CancelledTrips/>
      </MDBCol>
      <MDBCol md='6' className="newUsers all_same">
       < NewUsers/>
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
  
   export default DashboardStats; 