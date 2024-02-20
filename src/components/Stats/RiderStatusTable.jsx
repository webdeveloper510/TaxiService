import React, { useEffect, useState } from "react";
import {
    CAvatar,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow,
  } from '@coreui/react'
  

  import avatar1 from '../../assets/images/avtar1.jpg'
import { getDriver } from "../../utils/api";
import EmptyData from "../EmptyData";
import AppLoader from "../AppLoader";
const tableExample = [
    {
      avatar: { src: avatar1},
      user: {
        name: 'Yiorgos Avraamu',
      },
      activity: 'In a Ride',
    },
    {
      avatar: { src: avatar1},
      user: {
        name: 'Avram Tarasios',
       
      },
  
      activity: 'Offline',
    },
    {
      avatar: { src: avatar1},
      user: { name: 'Quintin Ed' },
      activity: 'Offline',
    },
    {
      avatar: { src: avatar1},
      user: { name: 'Enéas Kwadwo'},
      activity: 'In a Ride',
    },
    {
      avatar: { src: avatar1},
      user: {
        name: 'Agapetus Tadeáš',
       
      },
       activity: 'Offline',
    },
 
  ]
const RiderStatusTable=()=> {
   
  const [driver, setDriver] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    getDriver().then(res => {
      // console.log(res.result, 'vehicle')
      if (res?.code === 200) {
        if(res.result) setDriver(res.result)
      }
    }).finally(()=>{setLoading(false)})
  },[])

  console.log("driver status data=======", driver)

      return (
       <>
      <div className="booking-request-table">
        <h2 className="head-rider">Driver's Status</h2>
          {loading? <AppLoader/>:<CTable align="middle" className="mb-0" hover responsive>
               
                {driver.length > 0 ?<CTableBody>
                  {driver?.length > 0 ?
                  driver.slice(0,5)?.map((item, index) => {
                    let status = "Offline";
                    if(item.status && item.is_login){
                      status = "Online"
                      if(!item.is_available){
                        status = "In a ride"
                      }
                    }
                    console.log(item._id," ", status)
                    let color = "#1F1717"
                    if(status == "Online") color = "#70BA8D"
                    else if(status == "In a ride") color = "#D18015"
                    return(
                    
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        {/* status={item.avatar.status}  */}
                        <CAvatar className="rider-img" size="md" src={item.profile_image} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="user-name">{`${item.first_name} ${item.last_name}`}</div>
                        
                      </CTableDataCell>
                      <CTableDataCell>
                        
                     <span style={{
                      //backgroundColor: color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px",
                      borderRadius : "8px",
                      fontWeight: "normal",
                      color: color,
                      fontsize: "15px",
                     }}>{status}</span>
                      </CTableDataCell>
                    </CTableRow>
                  )})
                :""}
                </CTableBody>: <EmptyData/>}
              </CTable>}
          
      </div>
       
       </>
      );
    };
  
   export default RiderStatusTable; 