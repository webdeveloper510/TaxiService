import React, { useState}  from "react";
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
import refreshImg from '../../../assets/images/refresh.png';
import crossImg from '../../../assets/images/cross-arrow.png';
import downarrowImg from '../../../assets/images/down-arrow.png'
//import background from '../assets/images/heroimg.png';
//import accepticonimg from '../../../assets/images/accept.png'
import rejecticonimg from '../../../assets/images/rejecticon.png'
import editicon from '../../../assets/images/editicon.png'



const tableExample = [
    {
      Srnum: '1',
      tripid: '123',
      vehicletype: 'SUV',
      tripfrom: 'mohali',
      tripto: 'chandigarh',
      time: '10:20AM',
      
    },  
  ]
const PendingTrip = () => {
    const [loader, setLoader] = useState(false);
   
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 className="heading-for-every-page">Pending Trips</h1>
                <div className="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>List of Pending Trips</h2>
                      </div>
                      <div className="right-trip-content">
                        <img src={refreshImg} />
                        <img src={downarrowImg} />
                        <img src={crossImg} />
                      </div>
                    </div>
                  </div>
                  <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>
                       
                        <CTableHeaderCell className="text-center">Sr.No</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip ID</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Time</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
               
                    <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                     <CTableDataCell>
                              <div>{item.Srnum}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.tripid}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.vehicletype}</div>
                     </CTableDataCell>
                      
                     <CTableDataCell>
                              <div>{item.tripfrom}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.tripto}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.time}</div>
                     </CTableDataCell>
                     <CTableDataCell className="d-flex pending-trips-icons">
                            <div><CButton className="allocate_accept_driver" ><img src={editicon} /></CButton></div>
                            <div className="reject_icon"><img src={rejecticonimg} /></div>
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
      </div>
      <br />

    </>
  );
};

export default PendingTrip; 