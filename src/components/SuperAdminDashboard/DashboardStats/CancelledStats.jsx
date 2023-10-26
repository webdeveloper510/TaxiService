import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import canceltrip from "../../../assets/images/cancelled-trip.png"
import { getCountDashboard } from "../../../utils/api";

const CancelledStats=()=> {

  const [count , setCount] = useState([])
  useEffect(()=>{
    getCountDashboard().then((res)=>{
      console.log("dashborad count response=============", res)
      setCount(res.result)
    }).catch((error)=>{
      console.log(error)
    })
  },[])
   
      return (
       <>
      <MDBCard>
          <MDBCardBody className="d-flex cancelled-trips">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={canceltrip} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Cancelled Trips</h5>
            <span>{count.cancelTrips}</span>
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
  
   export default CancelledStats; 