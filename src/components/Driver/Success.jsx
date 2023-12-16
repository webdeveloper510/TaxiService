import React, { useEffect, useState } from 'react';
import AppLoader from '../AppLoader';
import { useNavigate, useParams } from 'react-router';
import SidebarDriver from './Sidebar';
import AppHeader from '../TopBar/AppHeader';
import { successTripCommission } from '../../utils/api';
import { CCol, CRow } from '@coreui/react';


const SuccessPaymentPage = () => {
    const success = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        successTripCommission(success.id).then((res)=>{
            console.log("🚀 ~ file: PastTrips.jsx:25 ~ payTripCommission ~ res:", res)
            setLoading(false)
            setTimeout(() => {
                navigate("/past-trips")
            },3000)
          })
    
    }, [])
    
  return (
    <div>
    <div className="container-fluidd">
      <div className="col-md-12">
        <div>
          <SidebarDriver />
          <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader />
            <div
              className="body flex-grow-1 px-3"
              style={{ paddingBottom: "20px" }}
            >
              <h1 class="heading-for-every-page">Trip Payment Done</h1>

             
              {/* <div class="active-trip-outer"> */}
               {loading? <AppLoader/>: 
              <div>
              <CRow>
                  <CCol xs={2}></CCol>
                  <CCol xs={8}>
                    <div style={{
                      height:"50vh"
                    }} class="active-trip-outer text-center d-flex justify-content-center align-items-center mx-5 p-4">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" 
                    style={{color:"green", marginBottom:"20px"}}
                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>
                    <h1>Payment Successful!</h1>
              <p>Thank you for your payment.</p>
                    </div>
                    </div>
                  </CCol>
                  <CCol xs={2}></CCol>
                </CRow>
            </div>
}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SuccessPaymentPage;