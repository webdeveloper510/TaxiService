import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import locationimg from '../../../assets/images/location.png';
import { getRecentTrip, getTrip } from "../../../utils/api";
import moment from "moment";
import EmptyData from "../../EmptyData";
import AppLoader from "../../AppLoader";
import { Link } from 'react-router-dom';
//import background from '../assets/images/heroimg.png';
const tableExample = [
  {
  SrNo : '1',
  tripId: 'ID123',
  drivername: 'Yiorgos Avraamu',
  tripfrom: 'Shimla',
  tripto: 'Delhi',
  date: '16-09-2022',
  time:'10:10AM',
  vehicletype: 'AC',
  activity: 'In a Ride',
//  action: { checkicon: checkiconimg },
  },
  {
  SrNo : '2',
  tripId: 'ID456',
  drivername: 'Avraamu',
  tripfrom: 'Shimla',
  tripto: 'Delhi',
  date: '16-09-2022',
  time:'10:10AM',
  vehicletype: 'NON-AC',
  activity: 'Active',
    //  action: { checkicon: cibCcMastercard },
      },
      {
 SrNo : '3',
 tripId: 'ID456',
drivername: 'Avraamu',
 tripfrom: 'Shimla',
 tripto: 'Delhi',
 date: '16-09-2022',
  time:'10:10AM',
  vehicletype: 'SUV',
  activity: 'Offline',
          //  action: { checkicon: cibCcMastercard },
            },
]
const RecentTrips=({from})=> {
   
  const [pendinTrip, setPendingTrip] = useState([])
  const [loading, setLoading] = useState(false);
  const [search,setSearch] = useState("")
  useEffect(()=>{
    setLoading(true);
    getRecentTrip(from == "super","").then(res => {
      if (res?.code == 200) {
        setPendingTrip(res.result)
      }
    }).finally(()=>setLoading(false))
  },[search])

      return (
       <>
       {loading? <AppLoader/> :
   <div className="container-fluidd">
       
       {pendinTrip.length > 1 ?   <div className="col-md-12">
       
        <div>
        <div className="body flex-grow-1 px-1">    
          <div class="active-trip-outer" id="recent-trip-outer"> 
          <div className="trips-head d-flex justify-content-between">
            <div className="box-shd d-flex justify-content-between">
            <div className="left-trip-content">
          <h2>Recent Trips</h2>
          </div>
          <div className="right-trip-content">
          {/* <CButton className="fare_list">See All</CButton> */}
            </div>
            </div>
          </div>
          <CTable align="middle" className="mb-0" hover responsive>
          
                <CTableHead>
                
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                     <CTableHeaderCell className="text-center">S. No.</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Customer Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Time</CTableHeaderCell>
                    {/* <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">View Ride</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {pendinTrip?.slice(0,4).map((item, index) => {     
                         const status = item.trip_status;
                         let background = "#067A88"
                         if (status === 'Active') background = "linear-gradient(90deg, #FF6A00 0%, #FFA625 100%) "
                         else if (status === 'Accepted') background = 'linear-gradient(90deg, #FF6A00 0%, #FFA625 100%)'
                         else if (status === 'Booked') background = 'linear-gradient(90deg, #FF5370 0%, #FF869A 100%)'
                         else if (status === 'Completed') background= "linear-gradient(90deg, #05D41F 0%, rgba(38, 228, 15, 0.9) 100%)"
                         else if (status === 'Canceled') background= 'red'

                    return(                    
                       <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                      <CTableDataCell >
                        <div>{ index+1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.trip_id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.company_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.trip_from?.address}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.trip_to?.address}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{moment(item.pickup_date_time).format("MMM Do YY")}</div>
                      </CTableDataCell> 
                      <CTableDataCell>
                        <div>{moment(item.pickup_date_time).format("h:mm a")}</div>
                      </CTableDataCell>   
                      {/* <CTableDataCell>
                        <div>{item.vehicle_type}</div>
                      </CTableDataCell>                    */}
                      <CTableDataCell className="text-center location-icons">
                      <span style={{
                          background,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "8px",
                          borderRadius : "8px",
                          fontWeight: "normal",
                          color: "#fff",
                          width: '100px',
                          margin: '0 auto',
                         }}>{status}</span>  
                      </CTableDataCell>        
                      <CTableDataCell>
                        <div className="view_details_btn">
                        <Link to={`/trips/view-trip-details/${item._id}`}>
                          View Details
                          </Link>
                          </div>
                      </CTableDataCell>   
                    </CTableRow>
                    
                    )
                  })}
                </CTableBody>
              </CTable>
          
          </div>
        
        </div>
    </div>
      
       </div>: null}
       </div> }
       <br/>
       </>
      );
    };
  
   export default RecentTrips; 