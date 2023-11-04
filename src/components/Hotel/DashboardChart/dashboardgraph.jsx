import React, { useContext, useEffect } from "react";

import chartImg from '../../../assets/images/dashboard-map-image.png'
import userContext from "../../../utils/context";
import { CChart } from '@coreui/react-chartjs'

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
      {/* <img src={chartImg} />  */}

      <CChart
  type="bar"
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Count',
        backgroundColor: '#FFD04E',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
      },
    ],
  }}
  labels="months"
  options={{
    plugins: {
      legend: {
        labels: {
          color: '#000000',
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#CCCCCC',
        },
        ticks: {
          color: '#000000',
        },
      },
      y: {
        grid: {
          color: '#000000',
        },
        ticks: {
          color: '#CCCCCC',
        },
      },
    },
  }}
/>
        
          
      </div>
       
       </>
      );
    };
  
   export default DashboardGraph;