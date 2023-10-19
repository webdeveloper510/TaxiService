import React , {useState , useEffect} from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import locationimg from '../../../assets/images/location.png';
import refreshImg from '../../../assets/images/refresh.png';
import crossImg from '../../../assets/images/cross-arrow.png';
import downarrowImg from '../../../assets/images/down-arrow.png'
//import background from '../assets/images/heroimg.png';

import { getTrip } from "../../../utils/api";





const CompletedTrip=()=> {

  const [completeTrip , setCompleteTrip] = useState()


  useEffect(() => {
    getTrip("Completed").then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setCompleteTrip(res.result)
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
          <h1 class="heading-for-every-page">Completed Trip </h1>
          <div class="active-trip-outer"> 
          <div className="trips-head d-flex justify-content-between">
            <div className="box-shd d-flex justify-content-between">
            <div className="left-trip-content">
          <h2>Completed Trip</h2>
          </div>
          <div className="right-trip-content">
            <img src={refreshImg}/>
            <img src={downarrowImg}/>
            <img src={crossImg}/>
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
                    <CTableHeaderCell className="text-center">Start Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">End Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Distance</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Fare</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">View Route</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {completeTrip?.length  ? completeTrip.map((item, index) => (
                    <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item._id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.driver_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.trip_from.log}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.pickup_date_time}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{item.pickup_date_time}</div>
                      </CTableDataCell>   
                      <CTableDataCell>
                        <div>{item.distance}</div>
                      </CTableDataCell>   
                      <CTableDataCell>
                        <div>{item.fare}</div>
                      </CTableDataCell>              
                      <CTableDataCell className="text-center location-icons">
                       <div><img src={locationimg}/></div> 
                      
                      </CTableDataCell>         
                    </CTableRow>
                  )) : 'No ResulT Found'}
                </CTableBody>
              </CTable>
          
          </div>
        
        </div>
       
      </div>
    </div>
      
       </div>
       </div>
       <br/>
       
       </>
      );
    };
  
   export default CompletedTrip; 