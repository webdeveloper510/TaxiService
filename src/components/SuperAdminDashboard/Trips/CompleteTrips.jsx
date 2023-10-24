import React , {useState , useEffect} from "react";
import AppHeader from "../../TopBar/AppHeader";
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
import moment from "moment"
//import background from '../assets/images/heroimg.png';
import * as geolib  from "geolib";
import { getTrip } from "../../../utils/api";
//import PulseLoader from "react-spinners/PulseLoader";
import { PulseLoader } from "react-spinners";
import SuperSideBar from "../SiderNavBar/Sidebar";




const SuperCompleteTrip=()=> {

  const [completeTrip , setCompleteTrip] = useState()
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    setLoader(true)
    getTrip("Completed").then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setCompleteTrip(res.result)
      }
      setLoader(false)
    })
  }, []);

   
      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
       <SuperSideBar/>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <h1 className="heading-for-every-page">Completed Super Trip </h1>
          <div className="active-trip-outer"> 
          <div className="trips-head d-flex justify-content-between">
            <div className="box-shd d-flex justify-content-between">
            <div className="left-trip-content">
          <h2> List of Complete Trips</h2>
          </div>
          <div className="right-trip-content">
            <img src={refreshImg}/>
            <img src={downarrowImg}/>
            <img src={crossImg}/>
            </div>
            </div>
          </div>
          {
            loader ? (<>
             <div className=" d-flex justify-content-center align-items-center"
                    style={{ height: 400 }}>
                    <PulseLoader
                      color="#FFD04E"
                      loading={true}
                      margin={4}
                      size={60}
                      speedMultiplier={0.5}
                    />
                  </div>
            </>) : (<>
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
              <CTableHeaderCell className="text-center">Start Time</CTableHeaderCell>
              <CTableHeaderCell className="text-center">End Time</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Distance</CTableHeaderCell>
              {/* <CTableHeaderCell className="text-center">Fare</CTableHeaderCell> */}
              <CTableHeaderCell className="text-center">View Route</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {completeTrip?.length  ? completeTrip.map((item, index) => (
              <CTableRow className="text-center" v-for="item in tableItems" key={item._id}>
                <CTableDataCell>
                  <div>{index + 1}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.trip_id}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.driver_name}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.trip_from.address}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.trip_to.address}</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{moment(item.pickup_date_time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </CTableDataCell>

                <CTableDataCell>
                  <div>{moment(item.pickup_date_time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                </CTableDataCell>   
                <CTableDataCell>
                  <div>{`${(
                  geolib.getDistance({
                    latitude: item.trip_from.log,
                    longitude: item.trip_from.lat
                  },
                  {
                    latitude: item.trip_to.log,
                    longitude: item.trip_to.lat
                  }
                  )* 0.00062137).toFixed(2)
                  } Miles`}</div>
                </CTableDataCell>   
                {/* <CTableDataCell>
                  <div>{item.fare}</div>
                </CTableDataCell>               */}
                <CTableDataCell className="text-center location-icons">
                 <div><img src={locationimg}/></div> 
                
                </CTableDataCell>         
              </CTableRow>
            )) : ''}
          </CTableBody>
        </CTable>
            </>)
          }
         
          
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
  
   export default SuperCompleteTrip; 