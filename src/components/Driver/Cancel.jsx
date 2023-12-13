import React, { useEffect, useState } from 'react';
import AppLoader from '../AppLoader';
import { useNavigate, useParams } from 'react-router';
import SidebarDriver from './Sidebar';
import AppHeader from '../TopBar/AppHeader';
import { failedTripCommission } from '../../utils/api';


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
              <div>
              <h1>Payment Canceled!</h1>
              <p>Please payment again</p>
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

export default CancelPaymentPage;