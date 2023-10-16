import React from "react";
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
  } from '@coreui/react'
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
import checkiconimg from '../../../assets/images/check-icon.png'
import crossicon from '../../../assets/images/crossicon.png'

  const tableExample = [
    {
    tripId: '123',
    name: 'Yiorgos Avraamu',
    vechileType: 'SUV',
    from: 'Shimla',
    to: 'Delhi',
    address: '34 Alex, Street',
    dateandtime:'23,Aug,2023 10:10AM',
  //  action: { checkicon: checkiconimg },
    },
    {
        tripId: '145',
        name: 'Yiorgos Avr',
        vechileType: 'SUV',
        from: 'Shimla',
        to: 'Delhi',
        address: '34 Alex, Street',
        dateandtime:'23,Aug,2023 10:10AM',
      //  action: { checkicon: cibCcMastercard },
        },
  ]
const BookingRequestTable=()=> {
   
      return (
       <>
      
       <div className="container-fluidd">
       
       <div className="col-md-12">
      
       <div>
       <SideBar2/>

     <div className="wrapper d-flex flex-column min-vh-100 bg-light">
       <AppHeader />
       <div className="body flex-grow-1 px-3">
         <h1 class="heading-for-every-page">New Bookings Request </h1>
         <div class="active-trip-outer"> 
         <div className="trips-head d-flex justify-content-between">
           <div className="box-shd d-flex justify-content-between">
           <div className="left-trip-content">
         <h2>New Bookings Request</h2>
         </div>
         <div className="right-trip-content">
         <CButton className="add_bookings">Add New Bookings</CButton>
        
           </div>
           </div>
         </div>
         <CTable align="middle" className="mb-0" hover responsive>
          
                <CTableHead>
                
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Trip Id</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">From</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">To</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date & Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow  className="text-center" v-for="item in tableItems" key={index}>
                      
                      <CTableDataCell>
                        <div>{item.tripId}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.vechileType}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.from}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.to}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.address}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{item.dateandtime}</div>
                      </CTableDataCell>                    
                      <CTableDataCell className="d-flex action-icons">
                       <div><img src={checkiconimg}/></div> 
                       <div><img src={crossicon}/></div>
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
       
       </>
      );
    };
  
   export default BookingRequestTable; 