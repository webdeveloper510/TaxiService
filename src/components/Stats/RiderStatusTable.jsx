import React from "react";
import {
    CAvatar,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableRow,
  } from '@coreui/react'
  
  
  import avatar1 from '../../assets/images/avtar1.jpg'
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
   
      return (
       <>
      <div className="booking-request-table">
        <h2 className="head-rider">Rider's Status</h2>
          <CTable align="middle" className="mb-0" hover responsive>
               
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="user-name">{item.user.name}</div>
                        
                      </CTableDataCell>
                      <CTableDataCell>
                        
                     <div>{item.activity}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
          
      </div>
       
       </>
      );
    };
  
   export default RiderStatusTable; 