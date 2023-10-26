import React from "react";
import AppHeader from "../../TopBar/AppHeader";

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

import SuperSideBar from "../SiderNavBar/Sidebar";

const tableExample = [
  {
    Srnum: "1",
    tripid: "123",
    drivername: "Rajesh",
    tripfrom: "mohali",
    tripto: "chandigarh",
    time: "10:20AM",
  },
];
const SuperCancelledTrip = () => {
  return (
    <>
     
      <div className="container-fluidd">
     
        <div className="col-md-12">
         
          <div>
          <SuperSideBar/>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              
              <AppHeader />
              <div className="body flex-grow-1 px-3">
             
                <h1 className="heading-for-every-page">Cancelled Trips</h1>
               
                <div className="active-trip-outer">
                 
                  {/* <div className="trips-head d-flex justify-content-between">
                   
                    <div className="box-shd d-flex justify-content-between">
                    
                      <div className="left-trip-content">
                       <h2>List of Pending Trips</h2>
                        
                      </div>
                    
                  
                     
                    </div>
                  
                  </div> */}
                
                  <CTable align="middle" className="mb-0" hover responsive>
                  
                    <CTableHead>
                     
                      <CTableRow>
                       
                        <CTableHeaderCell className="text-center">
                          Sr.No
                        </CTableHeaderCell>
                      
                        <CTableHeaderCell className="text-center">
                          Trip ID
                        </CTableHeaderCell>
                       
                        <CTableHeaderCell className="text-center">
                          Driver Name
                        </CTableHeaderCell>
                    
                        <CTableHeaderCell className="text-center">
                          Trip From
                        </CTableHeaderCell>
                       
                        <CTableHeaderCell className="text-center">
                          Trip To
                        </CTableHeaderCell>
                        
                        <CTableHeaderCell className="text-center">
                          Time
                        </CTableHeaderCell>
                        
                       
                        
                      </CTableRow>
                      
                    </CTableHead>
                   
                    <CTableBody>
                      
                      {tableExample.map((item, index) => (
                        <CTableRow
                          className="text-center"
                          v-for="item in tableItems"
                          key={index}
                        >
                        
                          <CTableDataCell>
                            
                            <div>{item.Srnum}</div>
                          </CTableDataCell>
                         
                          <CTableDataCell>
                           
                            <div>{item.tripid}</div>
                          </CTableDataCell>
                       
                          <CTableDataCell>
                            
                            <div>{item.drivername}</div>
                          </CTableDataCell>
                          
                          <CTableDataCell>
                           
                            <div>{item.tripfrom}</div>
                          </CTableDataCell>
                         
                          <CTableDataCell>
                            
                            <div>{item.tripto}</div>
                          </CTableDataCell>
                          
                          <CTableDataCell>
                           <div>{item.time}</div>
                          
                          </CTableDataCell>
                        
                         
                        </CTableRow>
                      ))}
                     
                    </CTableBody>
                    
                  </CTable>
                 
                </div>
                
              </div>
             
            </div>
   
          </div>
        
        </div>
       
      </div>
       <br />
    </>
  );
};

export default SuperCancelledTrip;
