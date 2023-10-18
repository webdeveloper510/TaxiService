import React from "react";
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
const RecentTrips=()=> {
   
      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
        <div className="body flex-grow-1 px-0">    
          <div class="active-trip-outer" id="recent-trip-outer"> 
          <div className="trips-head d-flex justify-content-between">
            <div className="box-shd d-flex justify-content-between">
            <div className="left-trip-content">
          <h2>Recent Trips</h2>
          </div>
          <div className="right-trip-content">
          <CButton className="fare_list">See All</CButton>
            </div>
            </div>
          </div>
          <CTable align="middle" className="mb-0" hover responsive>
          
                <CTableHead>
                
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                     <CTableHeaderCell className="text-center">Sr.No</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Driver Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                      <CTableDataCell >
                        <div>{item.SrNo}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.tripId}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.drivername}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.tripfrom}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.tripto}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.date}</div>
                      </CTableDataCell> 
                      <CTableDataCell>
                        <div>{item.time}</div>
                      </CTableDataCell>   
                      <CTableDataCell>
                        <div>{item.vehicletype}</div>
                      </CTableDataCell>                   
                      <CTableDataCell className="text-center location-icons">
                       <div>{item.activity}</div> 
                      </CTableDataCell>           
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
          
          </div>
        
        </div>
    </div>
      
       </div>
       </div>
       <br/>
       
       </>
      );
    };
  
   export default RecentTrips; 