import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import newuserimg from "../../assets/images/newuser.png"
import { getTripCompleted } from "../../utils/api";

const NewUsers=({data})=> {
   
      return (
       <>
       <br/>
      <MDBCard>
          <MDBCardBody className="d-flex new-users">
          <MDBCol sm='4' className="booked-trip-icon">
          <MDBCardImage position='top' alt='...' src={newuserimg} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Completed Trips</h5>
            <span>{data?.completedTrip}</span>
            <hr></hr>
            <p>60% increase in 20 days</p>
            </div>
            </MDBCardText>
            </MDBCol>
          </MDBCardBody>
        </MDBCard>
       
       </>
      );
    };
  
   export default NewUsers; 