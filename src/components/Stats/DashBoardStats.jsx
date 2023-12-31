import React from "react";
import {
 
    MDBRow,
    MDBCol,
  
  } from 'mdb-react-ui-kit';
  import BookedTrips from "./BookedTrips";
import CancelledTrips from "./CancelledTrips";
import NewUsers from "./NewUsers";
import TotalEarnings from "./TotalEarnings";
import RiderStatusTable from "./RiderStatusTable";

const DashboardStats=()=> {
   
      return (
       <>
       <br/>
       <div className="container-fluidd">
       
        <div className="col-md-12 body flex-grow-1 px-0">
       
        <div>
       
      <div className="row">
     
  
       <div className="col-md-6">

        <div className="booked-trips-outer">
        <MDBRow>
        <MDBCol sm='6' className="booked-trips">
       < BookedTrips/>
      </MDBCol>
      <MDBCol sm='6' className="cancelledtrips">
       < CancelledTrips/>
      </MDBCol>
      <MDBCol sm='6' className="newUsers">
       < NewUsers/>
      </MDBCol>
      <MDBCol sm='6' className="totalEarnings">
       < TotalEarnings/>
      </MDBCol>
    </MDBRow>

          </div>
        </div>
       
        <div className="col-md-6">
        <RiderStatusTable/>
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