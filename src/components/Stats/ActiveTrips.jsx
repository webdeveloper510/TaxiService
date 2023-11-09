import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import trips from "../../assets/images/bookedtrips.png"
import { getTripCompleted } from "../../utils/api";
//import background from '../assets/images/heroimg.png';

const ActiveTrips=()=> {

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
          <MDBCardBody className="d-flex booked-trips-card">
          <MDBCol sm='4'>
          <MDBCardImage position='top' alt='...' src={trips} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Active Trips</h5>
            <span>{data.bookedTrips}</span>
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
  
   export default ActiveTrips; 