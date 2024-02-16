import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import canceltrip from "../../assets/images/cancelled-trip.png"


const NewUsers = ({ data }) => {
  return (
    <>
      <br />
      <MDBCard>
        <MDBCardBody className="d-flex total-earinings">
          <MDBCol sm='4' className="booked-trip-icon">
            <MDBCardImage position='top' alt='...' src={canceltrip} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Completed Trips</h5>
                <span>{data?.completedTrip || 0}</span>
                <hr></hr>
                {/* <p>60% increase in 20 days</p> */}
              </div>
            </MDBCardText>
          </MDBCol>
        </MDBCardBody>
      </MDBCard>

    </>
  );
};

export default NewUsers; 