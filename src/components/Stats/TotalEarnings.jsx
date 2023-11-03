import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import earningimg from "../../assets/images/earnings.png"

const TotalEarnings=()=> {
   
      return (
       <>
       <br/>
      <MDBCard>
          <MDBCardBody className="d-flex total-earinings">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={earningimg} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Total Earnings</h5>
            <span>0</span>
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
  
   export default TotalEarnings; 