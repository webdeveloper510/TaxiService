import React , {useState , useEffect} from "react";
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
import { getTrip } from "../../../utils/api";
import refreshImg from '../../../assets/images/refresh.png';
import crossImg from '../../../assets/images/cross-arrow.png';
import downarrowImg from '../../../assets/images/down-arrow.png'
import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import moment from "moment"
  // const tableExample = [
  //   {
  //   tri: '123',
  //   name: 'Yiorgos Avraamu',
  //   vechileType: 'SUV',
  //   from: 'Shimla',
  //   to: 'Delhi',
  //   address: '34 Alex, Street',
  //   dateandtime:'23,Aug,2023 10:10AM',
  // //  action: { checkicon: checkiconimg },
  //   },
  //   {
  //       tripId: '145',
  //       name: 'Yiorgos Avr',
  //       vechileType: 'SUV',
  //       from: 'Shimla',
  //       to: 'Delhi',
  //       address: '34 Alex, Street',
  //       dateandtime:'23,Aug,2023 10:10AM',
  //     //  action: { checkicon: cibCcMastercard },
  //       },
  // ]
const BookingRequestTable=()=> {

  const [bookingTrip , setBookingTrip] = useState()


  useEffect(() => {
    getTrip("Booked").then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setBookingTrip(res.result)
      }
    })
  }, []);
   
      return (
       <>
      
       <div className="container-fluidd">
       
       <div className="col-md-12">
      
       <div>
       <SideBar2/>

     <div className="wrapper d-flex flex-column min-vh-100 bg-light">
       <AppHeader />
       <div className="body flex-grow-1 px-3">
         <h1 class="heading-for-every-page">Booked Trip</h1>
         <div class="active-trip-outer"> 
         <div className="trips-head d-flex justify-content-between">
           <div className="box-shd d-flex justify-content-between">
           <div className="left-trip-content">
         <h2>Booked Trip</h2>
         </div>
         <div className="right-trip-content">
         <div className="right-trip-content">
            <img src={refreshImg}/>
            <img src={downarrowImg}/>
            <img src={crossImg}/>
            </div>
        
           </div>
           </div>
         </div>
         <CTable align="middle" className="mb-0" hover responsive>
          
                <CTableHead>
                
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell className="text-center">Sr No.</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip  ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Passenger Count</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Allocate Driver</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Start Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                   {bookingTrip?.length ? bookingTrip.map((item, index) => (
                    <CTableRow  className="text-center" v-for="item in tableItems" key={index}>
                      
                      <CTableDataCell>
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item._id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.passenger_detail.length}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                      <div>{item.trip_from.address}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                      <div>{item.trip_to.address}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.driver_name}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                      <div>{moment(item.pickup_date_time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                      </CTableDataCell>                    
                      <CTableDataCell className="d-flex action-icons booking-icons">
                                <div><img src={editiconimg} /></div>
                            <div><img src={deleteiconimg} /></div>
                      </CTableDataCell>         
                    </CTableRow>
                  )) : "No Results"}
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