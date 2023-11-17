import React, { useEffect, useState } from "react";
import {
 
    MDBRow,
    MDBCol,
  
  } from 'mdb-react-ui-kit';
import BookedStats from "./BookedStats";
import CancelledStats from "./CancelledStats";
import UsersStats from "./UsersStats";
import EarningStats from "./EaringStats";
import { getCountDashboard, getTripCompleted } from "../../../utils/api";
import { Link } from "react-router-dom";
//import DashboardGraph from "../Hotel/DashboardChart/dashboardgraph";

const AllDashboardStats=()=> {
  const [count , setCount] = useState(null)

  useEffect(()=>{
    getTripCompleted().then((res)=>{
      console.log("counts from sub admin", res);
      if(res?.result ) setCount(res?.result);
      
    }).catch((error)=>{
      console.log(error)
    })
  },[])
      return (
       <>
       <br/>
       <div className="container-fluidd">
       
        <div className="col-md-12 body flex-grow-1 px-0">
       
        <div>
       
      <div className="row">
     
      {/* <div className="col-md-6 dashboard-grph-img">
        <DashboardGraph/>
        
        </div> */}
       <div className="col-md-12">

        <div className="booked-trips-outer">
        <MDBRow>
        <MDBCol sm='6' className="booked-trips">
        <Link to={"/taxi/trips/bookedtrips"}><BookedStats count={count}/></Link>
      </MDBCol>
      <MDBCol sm='6' className="cancelledtrips">
      <Link to={"/taxi/trips/cancelledtrips"}><CancelledStats count={count}/></Link>
      </MDBCol>
      <MDBCol sm='6' className="newUsers">
      <Link to={"/taxi/trips/pendingtrips"}>< UsersStats count={count} /></Link>
      </MDBCol>
      <MDBCol sm='6' className="totalEarnings">
       < EarningStats/>
      </MDBCol>
    </MDBRow>

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
  
   export default AllDashboardStats; 