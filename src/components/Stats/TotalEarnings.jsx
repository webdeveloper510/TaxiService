import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCol,
    MDBCardImage,
  
  } from 'mdb-react-ui-kit';
import earningimg from "../../assets/images/earnings.png"
import { getTransaction } from "../../utils/api";

const TotalEarnings=()=> {
  const [loader, setLoader] = useState(false);
  const [earning, setEarning] = useState({
    "totalEarning": 0,
    "totalEarningLastSevenDays": 0,
    "totalEarningFromMonth": 0,
    "totalEarningFromYear": 0
  })
  useEffect(() => {
    getTransaction("SUPER_ADMIN")
      .then((res) => {
        if (res?.code == 200) {
          setEarning(res)
        }
      })
    
    
  }, []);
      return (
       <>
       <br/>
      <MDBCard>
          <MDBCardBody className="d-flex total-earinings">
          <MDBCol sm='4' className="booked-trip-icon">
          <MDBCardImage position='top' alt='...' src={earningimg} />
          </MDBCol>
          <MDBCol sm='8'>
            <MDBCardText>
              <div>
                <h5>Total Earnings</h5>
                <span>{earning.totalEarning} €</span>
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
  
   export default TotalEarnings; 