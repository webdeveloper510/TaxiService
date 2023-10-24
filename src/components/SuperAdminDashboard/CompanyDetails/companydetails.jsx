import React from "react";
import Sidebar from "../../SuperAdminDashboard/SiderNavBar/Sidebar";
import AppHeader from "../../TopBar/AppHeader";
import { Link } from 'react-router-dom';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'

const tableExample = [
  {
  SrNo : '1',
  companyId: 'ID123',
  companyname: 'Mahindra',
  postcode: '45622',
  vehiclenumber: '12',
  address:'34,Alex Street',
//  action: { checkicon: checkiconimg },
  },
  {
    SrNo : '1',
    companyId: 'ID456',
    companyname: 'TATA',
    postcode: '45236',
    vehiclenumber: '10',
    address:'34,Alex Street',
  //  action: { checkicon: checkiconimg },
    },

]
const CompanyDetails=()=> {
   
      return (
       <>
       <div className="container-fluidd">
        <div className="col-md-12">
        <div>
        <Sidebar/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <h1 class="heading-for-every-page">Companies Details</h1>
          <div class="active-trip-outer"> 
          <div className="trips-head d-flex justify-content-between">
            <div className="box-shd d-flex justify-content-between">
            <div className="left-trip-content">
          <h2>Listing all Companies</h2>
          </div>
         
            {/* <img src={refreshImg}/>
            <img src={downarrowImg}/>
            <img src={crossImg}/> */}
             <div className="right-trip-content">
                        <Link to="/superadmindashboard/add-company">
                          <CButton className="add_company_btn">Add Company</CButton>
                        </Link>
                     
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
                    <CTableHeaderCell className="text-center">Company ID</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Company Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Post Code</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">No. of Vehicle</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                      <CTableDataCell >
                        <div>{item.SrNo}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.companyId}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.companyname}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.postcode}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.vehiclenumber}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{item.address}</div>
                      </CTableDataCell>                    
                      <CTableDataCell className="text-center d-flex company-list-icons">
                       <div><img src={editiconimg}/></div> 
                       <div><img src={deleteiconimg}/></div>
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
       </>
      );
    };
  
   export default CompanyDetails; 