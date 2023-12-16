import React, { useEffect, useState } from 'react';
import AppLoader from '../AppLoader';
import { useNavigate, useParams } from 'react-router';
import SidebarDriver from './Sidebar';
import AppHeader from '../TopBar/AppHeader';
import { failedTripCommission } from '../../utils/api';
import { CCol, CRow } from '@coreui/react';


const CancelPaymentPage = () => {
  const cancel = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true)
      failedTripCommission(cancel.id).then((res)=>{
        console.log("🚀 ~ file: Cancel.jsx:16 ~ failedTripCommission ~ res:", res)
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
              <h1 class="heading-for-every-page">Trip</h1>
             
              {/* <div class="active-trip-outer"> */}
               {loading? <AppLoader/>: 
               <CRow>
               <CCol xs={2}></CCol>
               <CCol xs={8}>
                 <div style={{
                   height:"50vh"
                 }} class="active-trip-outer text-center d-flex justify-content-center align-items-center mx-5 p-4">
                 <div>
                 <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" 
                 style={{color:"red", marginBottom:"20px"}} class="bi bi-x-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg>
<h1>Payment Canceled!</h1>
           <p>Please payment again</p>
                 </div>
                 </div>
               </CCol>
               <CCol xs={2}></CCol>
             </CRow>
}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CancelPaymentPage;