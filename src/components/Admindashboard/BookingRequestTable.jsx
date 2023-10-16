import React from "react";
import {
    CAvatar,
    CProgress,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import {
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
   
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs,
  
    cilPeople,
   
  } from '@coreui/icons'
import checkiconimg from '../../assets/images/check-icon.png'
import crossicon from '../../assets/images/crossicon.png'
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
      <div className="booking-request-table">
          <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Trip Id</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Vechile Type</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">From</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">To</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Date & Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      
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
       
       </>
      );
    };
  
   export default BookingRequestTable; 