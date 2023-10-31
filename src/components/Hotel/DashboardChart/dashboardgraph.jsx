import React, { useContext, useEffect } from "react";

import chartImg from '../../../assets/images/dashboard-map-image.png'
import userContext from "../../../utils/context";


const DashboardGraph=()=> {
  const {user,setUser} = useContext(userContext)
      useEffect(() => {
        console.log("userIs=====>>>>>", user)
      }, [])
      
      return (
       <>
      <div className="dashboard-chart">
        <div className="d-flex chart-stats">
          <div>
          <strong>$450</strong><br/>
          <p>Today's Income</p>
        </div>
        <div>
          <strong>$550</strong><br/>
          <p>weekly Income</p>
        </div>
        <div>
          <strong>$1000</strong><br/>
          <p>Monthly Income</p>
        </div>
        </div>
      <img src={chartImg} /> 
        
          
      </div>
       
       </>
      );
    };
  
   export default DashboardGraph;