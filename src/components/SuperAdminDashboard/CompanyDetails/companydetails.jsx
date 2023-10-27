import deletepopup from '../../../assets/images/deletepopup.png'
import React, { useEffect, useState } from "react";
import Sidebar from "../../SuperAdminDashboard/SiderNavBar/Sidebar";
import AppHeader from "../../TopBar/AppHeader";
import { Link, useNavigate } from 'react-router-dom';

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CCardBody,
  CRow,
  CCard,
  CCol,
  CFormInput,
  CFormLabel,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { toast } from 'react-toastify';
import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import { deleteCompany, getCompany } from "../../../utils/api";
import AppLoader from "../../AppLoader";
// import toggel from "react-toggle/style.css"
const tableExample = [
  {
    SrNo: '1',
    companyId: 'ID123',
    companyname: 'Mahindra',
    postcode: '45622',
    vehiclenumber: '12',
    address: '34,Alex Street',
    //  action: { checkicon: checkiconimg },
  },

  {
    SrNo: '1',
    companyId: 'ID456',
    companyname: 'TATA',
    postcode: '45236',
    vehiclenumber: '10',
    address: '34,Alex Street',
    //  action: { checkicon: checkiconimg },
  },

]
const CompanyDetails = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  // State variables for popups
  const [deleteVisible, setDeleteVisible] = useState(false);
  useEffect(() => {
    if (!deleteVisible) {
      setSelectedCompany(null)
    }
  }, [deleteVisible])
  const [editVisible, setEditVisible] = useState(false);
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = company?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(company?.length / recordPage);
  const number = [...Array(nPage + 1).keys()].slice(1);

  const pageNumber = number.map((num, i) => {
    if (num < maxPage + 1 && num > minPage) {
      return (
        <>
          <li
            key={i}
            className={
              currentPage == num ? `active_btn ` : `unactive_btn`
            }
          >
            <button onClick={() => changePage(num)}>{num}</button>
          </li>
        </>
      );
    } else {
      return null;
    }
  });

  const handlePrePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageLimit == 0) {
        setMaxPage(maxPage - pageLimit);
        setMinPage(minPage - pageLimit);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPage) {
        setMaxPage(maxPage + pageLimit);
        setMinPage(minPage + pageLimit);
      }
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  let pageIncreament = null;
  if (data.length > maxPage) {
    pageIncreament = <li onClick={handleNextPage}>&hellip;</li>;
  }

  useEffect(() => {
    setLoading(true);
    getCompany().then(res => {
      console.log(res?.result, 'company')
      if (res?.code === 200) {
        setCompany(res?.result)
        setLoading(false)
      } else {
        setError(true);
        setLoading(false)
      }

    }).catch(err => { setError(true); setLoading(false) });

  }, [])
  const deleteCompanyHandler = async (id) => {
    try {
      const deleteCompanyData = await deleteCompany(id);
      if (deleteCompanyData.code === 200) {
        toast.success(`${deleteCompanyData.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
        const newCompanyData = company.filter(company => company._id != id);
        setCompany(newCompanyData)
      } else {
        toast.success(`${deleteCompanyData.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error)
    }
    setDeleteVisible(false);
  }
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <Sidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Companies Details</h1>
                <div class="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        {/* <h2>Listing all Companies</h2> */}
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
                  {loading ? <AppLoader /> : <CTable align="middle" className="mb-0" hover responsive>

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
                      {data?.map((item, index) => (
                        <CTableRow className="text-center" v-for="item in tableItems" key={company._id}>
                          <CTableDataCell >
                            <div>{firstIndex + index + 1}</div>
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
                            <CButton id="edit_company_btn" onClick={() => setEditVisible(!editVisible)}>
                              {/* <div  style={{cursor:"pointer"}} 
                       onClick={()=>navigate(`/superadmindashboard/edit-company/${item._id}`)}
                       ></div> */}
                              <img src={editiconimg} /> </CButton>

                            {/* <div style={{cursor:"pointer"}} onClick={()=>{
                        deleteCompanyHandler(item._id);
                       }}>   </div> */}
                            <CButton id="delete_company_btn" onClick={() => {
                              setDeleteVisible(!deleteVisible);
                              setSelectedCompany(item)
                            }
                            }><img src={deleteiconimg} /></CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>}


                  {
                    data?.length > 0 ?
                      <div
                        className="pagination-outer"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          className="prev_btn"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <button onClick={() => handlePrePage()}>
                            Previous
                          </button>
                        </div>
                        <div className="previous-page">
                          <ul>
                            {pageNumber}
                            <button className="dots_btn">
                              {pageIncreament}
                            </button>
                          </ul>
                        </div>
                        <div className="next_btn">
                          <button onClick={() => handleNextPage()}>Next</button>
                        </div>
                      </div>
                      : ""
                  }


                  {/* deletecompanypopup */}


                  <CModal alignment="center" visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
                    {/* <CModalHeader>
                      <CModalTitle>Edit Fare</CModalTitle>
                    </CModalHeader> */}
                    <CModalBody>
                      <CRow>

                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup">
                            <CCardBody>
                              <img src={deletepopup} alt="danger" />
                              <h2>Are you Sure</h2>
                              <p>You want to delete this Vehicle ?</p>

                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">


                              <CButton className="delete_popup"
                                onClick={() => {
                                  deleteCompanyHandler(selectedCompany._id)
                                  setDeleteVisible(false);
                                }}
                              >Delete</CButton>
                              <CButton className="cancel_popup"
                                onClick={() => {
                                  setDeleteVisible(false);
                                }}
                              >
                                Cancel</CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>



                  </CModal>



                  {/* enddeletecompanypopup */}




                  {/* EditCompanyPopup */}
                  <CModal alignment="center" visible={editVisible} onClose={() => setEditVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Edit Company</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>

                        <CCol xs={12}>
                          <CCard className="mb-4 edit_company_popup">
                            <CCardBody>
                              <form noValidate className="row g-3">
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcname">Company Name</CFormLabel>
                                  <CFormInput aria-label="vehicle fare"

                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="company_name"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputland">Land</CFormLabel>
                                  <CFormInput aria-label="land"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="land"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputpcode">Post Code</CFormLabel>
                                  <CFormInput aria-label="postcode"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="post_code"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputhousenum">Building Number</CFormLabel>
                                  <CFormInput aria-label="housenumber"

                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="house_number"
                                    autoComplete="off" />

                                </CCol>

                                <CCol md={12}>
                                  <CFormLabel htmlFor="inputtxinum">Describe Your Taxi Company</CFormLabel>
                                  <CFormInput aria-label="taxi company"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="describe_your_taxi_company"
                                    autoComplete="off" />
                                </CCol>

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputaffi">Affiliated with</CFormLabel>
                                  <CFormInput aria-label="Affiliated"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="affiliated_with"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputphnnum">Phone Number</CFormLabel>
                                  <CFormInput aria-label="phone number"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="phone"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputwebsite">Website</CFormLabel>
                                  <CFormInput id="webt_site"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="website"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputquality">TX Quality Mark</CFormLabel>
                                  <CFormInput id="iput_quality"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="tx_quality"
                                    autoComplete="off" />
                                </CCol>
                                <CCol md={12} className="row add_company_row">
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="inputfname">First Name</CFormLabel>
                                    <CFormInput id="f_name"
                                      maxLength="50"
                                      className=
                                      "form-control bg-transparent"
                                      name="first_name"
                                      autoComplete="off" />

                                  </CCol>
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="inputlname">Last Name</CFormLabel>
                                    <CFormInput id="l_name"
                                      maxLength="50"
                                      className=
                                      "form-control bg-transparent"
                                      name="last_name"
                                      autoComplete="off" />

                                  </CCol>
                                </CCol>

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcon_num">Telephone Number</CFormLabel>
                                  <CFormInput id="tel_Con_nu"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="tel_contact_number"
                                    autoComplete="off" />

                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputmailaddress">Email Address</CFormLabel>
                                  <CFormInput id="email_address"
                                    maxLength="50"
                                    className=
                                    "form-control bg-transparent"
                                    name="email"
                                    autoComplete="off" />

                                </CCol>

                                <CCol md={12}>
                                  <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                    <CButton type="submit" className="submit-btn">Submit</CButton>
                                    <CButton type="button" className="cancel-btn">Cancel</CButton>
                                  </div>
                                </CCol>
                              </form>

                            </CCardBody>
                            {/* <div className="delete_vehicle_popup_outer">
                        

                            <CButton className="delete_popup"
                           
                            >Delete</CButton>
                                <CButton className="cancel_popup" onClick={() => setVisible(false)}>
                             Cancel</CButton>
                            </div> */}
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>



                  </CModal>

                  {/* EndEditcompanypopup */}
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