import React from "react";
import {
 
    MDBRow,
    MDBCol,
  
  } from 'mdb-react-ui-kit';
import NewUsers from '../../Stats/NewUsers'
import TotalEarnings from "../../Stats/TotalEarnings";
import ActiveTrips from "../../Stats/ActiveTrips";
import PendingTrips from "../../Stats/PendingTrips";

const SuperStats=()=> {
   
      return (
       <>
       <br/>
       <div className="container-fluidd">
       
        <div className="col-md-12 body flex-grow-1 px-0">
       
        <div>
       
      <div className="row">
     
       <div className="col-md-12">

        <div className="booked-trips-outer">
        <MDBRow>
        <MDBCol sm='6' className="booked-trips">
       <ActiveTrips/>
      </MDBCol>
      <MDBCol sm='6' className="cancelledtrips">
       <PendingTrips/>
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
       
      
      </div>
    </div>
   
       </div>
       </div>
       <br/>
       
       
       </>
      );
    };
  
   export default SuperStats; 