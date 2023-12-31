import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import newuserimg from "../../assets/images/newuser.png"

const NewUsers=()=> {
   
      return (
       <>
       <br/>
      <MDBCard>
          <MDBCardBody className="d-flex new-users">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={newuserimg} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>New Users</h5>
            <span>450</span>
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