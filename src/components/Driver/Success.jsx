import React, { useEffect, useState } from 'react';
import AppLoader from '../AppLoader';
import { useNavigate, useParams } from 'react-router';
import SidebarDriver from './Sidebar';
import AppHeader from '../TopBar/AppHeader';
import { successTripCommission } from '../../utils/api';


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
              <h1>Payment Successful!</h1>
              <p>Thank you for your payment.</p>
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