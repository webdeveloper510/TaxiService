import React from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../../Admindashboard/SideBar2";
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";

//import background from '../assets/images/heroimg.png';

const AddCompany = () => {
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">Add Company</h1>
                <div class="active-trip-outer" id="fare_management_page">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>Add Company</h2>
                      </div>
                      <div className="right-trip-content">
                        <Link to="/companydetails">
                          <CButton className="company_list">Company List</CButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardBody>

                         
                          <form noValidate className="row g-3">
                          <CCol md={6}>
                              <CFormLabel htmlFor="inputcname">Company Name</CFormLabel>
                              <CFormInput aria-label="vehicle fare"
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"/>   
                            
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputland">Land</CFormLabel>
                              <CFormInput aria-label="land"
                                className=
                                  "form-control bg-transparent"/>   
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpcode">Post Code</CFormLabel>
                              <CFormInput aria-label="postcode"
                                className=
                                  "form-control bg-transparent"/>   
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputhousenum">House Number</CFormLabel>
                              <CFormInput aria-label="land"
                                className=
                                  "form-control bg-transparent"/>   
                              
                            </CCol>
                            
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputtxinum">Describe Your Taxi Company</CFormLabel>
                              <CFormInput aria-label="taxi company"
                                className=
                                  "form-control bg-transparent"/>   
                              
                            </CCol>
                            
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputaffi">Affiliated with</CFormLabel>
                              <CFormInput aria-label="Affiliated"
                                className=
                                  "form-control bg-transparent"/>   
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputphnnum">Phone Number</CFormLabel>
                              <CFormInput aria-label="phone number"
                                className=
                                  "form-control bg-transparent"/>   
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputnumcars">Number of Cars</CFormLabel>
                              <CFormInput id="num_cars"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="number of cars"
                                autoComplete="off" />
                            </CCol>
                            

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcomnum">Chamber of Commerce Number </CFormLabel>
                              <CFormInput id="com_numbers"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="commerece number"
                                autoComplete="off" />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcomnum">VAT Number </CFormLabel>
                              <CFormInput id="vat_numbers"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="vat number"
                                autoComplete="off" />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputwebsite">Website</CFormLabel>
                              <CFormInput id="webt_site"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="website"
                                autoComplete="off" />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputquality">TX Quality Mark</CFormLabel>
                              <CFormInput id="iput_quality"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="Quality"
                                autoComplete="off" />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputwebsite">Contact</CFormLabel>
                              <CFormInput id="cont_act"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="contact"
                                autoComplete="off" />
                            </CCol>
                           
                            <CCol md={6} className="row add_company_row">
                            <CCol md={6}>
                                    <CFormLabel htmlFor="inputfname">First Name</CFormLabel>
                                    <CFormInput id="f_name"
                                    className="form-control bg-transparent"
                                    name="First Name"
                                    autoComplete="off"
                                    />
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="inputlname">Last Name</CFormLabel>
                                    <CFormInput id="l_name"
                                    className="form-control bg-transparent"
                                    name="Last Name"
                                    autoComplete="off"
                                    />
                                </CCol>
                                </CCol>
                                
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcon_num">Tel Contact Number</CFormLabel>
                              <CFormInput id="tel_Con_nu"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="contact number"
                                autoComplete="off" />
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputmailaddress">Email Address</CFormLabel>
                              <CFormInput id="email_address"
                                className=
                                  "form-control bg-transparent"
                                 
                                name="email addess"
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
                      </CCard>
                    </CCol>
                  </CRow>


                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default AddCompany; 