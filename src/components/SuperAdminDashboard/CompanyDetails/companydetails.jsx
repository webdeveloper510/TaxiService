import React, {useState, useEffect} from "react";
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
import { toast } from 'react-toastify';
import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import { deleteCompany, getCompany } from "../../../utils/api";
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
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false);

    useEffect(() => {
      getCompany().then(res => {
        console.log(res?.result, 'company')
        if (res?.code === 200) {
          setCompany(res?.result)
        }else{
          setError(true);
        }
        
      }).catch(err => {setError(true)});
      setLoading(false)
    }, [])
    const deleteCompanyHandler = async (id) => {
      try {
        const deleteCompanyData = await deleteCompany(id);
        if(deleteCompanyData.code === 200) {
          toast.success(`${deleteCompanyData.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          const newCompanyData = company.filter(company => company._id != id);
          setCompany(newCompanyData)
        }else{
          toast.success(`${deleteCompanyData.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
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
                    <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Phone</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {company.map((item, index) => (
                    <CTableRow className="text-center" v-for="item in tableItems" key={company._id}>
                      <CTableDataCell >
                        <div>{index + 1}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item._id}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.first_name + " " + item.last_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.phone}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{item.first_name}</div>
                      </CTableDataCell>                    
                      <CTableDataCell className="text-center d-flex company-list-icons">
                       <div><img src={editiconimg}/></div> 
                       <div style={{cursor:"pointer"}} onClick={()=>{
                        deleteCompanyHandler(item._id);
                       }}><img src={deleteiconimg}/></div>
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