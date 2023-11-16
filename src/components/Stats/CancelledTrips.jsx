import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import canceltrip from "../../assets/images/cancelled-trip.png"
import { getTripCompleted } from "../../utils/api";

const CancelledTrips=()=> {

  const [ data , setData] = useState([])
  useEffect(()=>{
    getTripCompleted().then((res)=>{
      console.log("response get book trip", res)
      if(res?.code == 200){
        setData(res.result)
      }
    }).catch((error)=>{
      console.log(error)
    })
  },[])
   
      return (
       <>
      <MDBCard>
          <MDBCardBody className="d-flex cancelled-trips">
          <MDBCol sm='4' className="booked-trip-icon">
          <MDBCardImage position='top' alt='...' src={canceltrip} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Cancelled Trips</h5>
            <span>{data.cancelTrips}</span>
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
  
   export default CancelledTrips; 