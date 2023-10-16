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
    {
      avatar: { src: avatar1, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
      },
       activity: 'In a Ride',
    },
  ]
const RiderStatusTable=()=> {
   
      return (
       <>
      <div className="booking-request-table">
          <CTable align="middle" className="mb-0 border" hover responsive>
               
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        
                      </CTableDataCell>
                      <CTableDataCell>
                        
                        <strong>{item.activity}</strong>
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