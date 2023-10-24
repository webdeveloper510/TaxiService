import React, { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../../Admindashboard/SideBar2";
import { Link, useNavigate } from 'react-router-dom';
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
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { addCompany } from "../../../utils/api";
import { toast } from "react-toastify";

const AddCompany = () => {
  const navigate = useNavigate()
  const initialValues = {
    company_name: "",
    land: "",
    post_code: "",
    house_number: "",
    describe_your_taxi_company: "",
    affiliated_with: "",
    phone:"",
    number_of_cars: "",
    chamber_of_comerce_number: "",
    vat:"",
    website: "",
    tx_quality: "",
    contact: "",
    first_name: "",
    last_name: "",
    tel_contact_number: "",
    email: "",
  };
  const validationSchema = Yup.object().shape({
    company_name: Yup.string().min(2).max(20).required("Company Name is required"),
    land: Yup.string().min(4).max(20).required("Land is required"),
    post_code: Yup.string().max(10).required("Postcode is required"),
    house_number: Yup.string().max(20).required("House number is required"),
    describe_your_taxi_company: Yup.string().min(4).max(100).required("Describe your taxi number is required"),
    affiliated_with: Yup.string().required("Affiliated with is required"),
    phone:Yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Phone number is required"),
    number_of_cars: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Number of cars is required"),
    chamber_of_comerce_number: Yup.string().required("Chamber of Commerce Number is required"),
    vat:Yup.string().min(4).max(18).required("VAT Number is required"),
    website: Yup.string().url('Invalid URL format. Please enter a valid URL.').required("Website is required"),
    tx_quality: Yup.string().required("TX Quality is required"),
    contact: Yup.string().required("Contact is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    tel_contact_number: Yup.string().min(6,"minimum length must be 6").max(18,"max length must be 6").matches(/^[0-9]+$/, "Must be only digits").required("Tel Contact Number is required"),
    email: Yup.string().email().required("Email Address is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      addCompany(values).then((res) => {
        console.log("response---->>>>", res)
        if (res?.data?.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate("/companydetails")
        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      })


    },
  });
  const [inputData, setInputData] = useState({
    company_name: "",
    land: "",
    post_code: "",
    house_number: "",
    describe_your_taxi_company: "",
    affiliated_with: "",
    phone:"",
    number_of_cars: "",
    chamber_of_comerce_number: "",
    vat:"",
    website: "",
    tx_quality: "",
    contact: "",
    first_name: "",
    last_name: "",
    tel_contact_number: "",
    email: "",
  })
  const [errors, setErrors] = useState({
    company_name: null,
    land: null,
    post_code: null,
    house_number: null,
    describe_your_taxi_company: null,
    affiliated_with: null,
    phone:null,
    number_of_cars: null,
    chamber_of_comerce_number: null,
    vat:null,
    website: null,
    tx_quality: null,
    contact: null,
    first_name: null,
    last_name: null,
    tel_contact_number: null,
    email: null,
  })
  
const inputHandler = (e) => {
  console.log("errors====>>>>",inputData)
  setInputData({
    ...inputData,
    [e.target.name]: e.target.value
  })
}
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

                         
                          <form onSubmit={formik.handleSubmit} noValidate className="row g-3">
                          <CCol md={6}>
                              <CFormLabel htmlFor="inputcname">Company Name</CFormLabel>
                              <CFormInput aria-label="vehicle fare"                    
                                
                                  {...formik.getFieldProps("company_name")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.company_name && formik.errors.company_name,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.company_name && !formik.errors.company_name,
                                  }
                                )}
                                name="company_name"
                                autoComplete="off" />
                              {formik.errors.company_name && formik.touched.company_name ? (
                                <div className="text-danger">{formik.errors.company_name}</div>
                              ) : null}
                                   
                            
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputland">Land</CFormLabel>
                              <CFormInput aria-label="land"
                                   {...formik.getFieldProps("land")}
                                   maxLength="50"
                                   className={clsx(
                                     "form-control bg-transparent",
                                     {
                                       "is-invalid":
                                         formik.touched.land && formik.errors.land,
                                     },
                                     {
                                       "is-valid":
                                         formik.touched.land && !formik.errors.land,
                                     }
                                   )}
                                   name="land"
                                   autoComplete="off" />
                                 {formik.errors.land && formik.touched.land ? (
                                   <div className="text-danger">{formik.errors.land}</div>
                                 ) : null} 
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpcode">Post Code</CFormLabel>
                              <CFormInput aria-label="postcode"
                              {...formik.getFieldProps("post_code")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.post_code && formik.errors.post_code,
                                },
                                {
                                  "is-valid":
                                    formik.touched.post_code && !formik.errors.post_code,
                                }
                              )}
                              name="post_code"
                              autoComplete="off" />
                            {formik.errors.post_code && formik.touched.post_code ? (
                              <div className="text-danger">{formik.errors.post_code}</div>
                            ) : null} 
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputhousenum">House Number</CFormLabel>
                              <CFormInput aria-label="housenumber"
                             {...formik.getFieldProps("house_number")}
                             maxLength="50"
                             className={clsx(
                               "form-control bg-transparent",
                               {
                                 "is-invalid":
                                   formik.touched.house_number && formik.errors.house_number,
                               },
                               {
                                 "is-valid":
                                   formik.touched.house_number && !formik.errors.house_number,
                               }
                             )}
                             name="house_number"
                             autoComplete="off" />
                           {formik.errors.house_number && formik.touched.house_number ? (
                             <div className="text-danger">{formik.errors.house_number}</div>
                           ) : null} 
                              
                            </CCol>
                            
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputtxinum">Describe Your Taxi Company</CFormLabel>
                              <CFormInput aria-label="taxi company"
                             {...formik.getFieldProps("describe_your_taxi_company")}
                             maxLength="50"
                             className={clsx(
                               "form-control bg-transparent",
                               {
                                 "is-invalid":
                                   formik.touched.describe_your_taxi_company && formik.errors.describe_your_taxi_company,
                               },
                               {
                                 "is-valid":
                                   formik.touched.describe_your_taxi_company && !formik.errors.describe_your_taxi_company,
                               }
                             )}
                             name="describe_your_taxi_company"
                             autoComplete="off" />
                           {formik.errors.describe_your_taxi_company && formik.touched.describe_your_taxi_company ? (
                             <div className="text-danger">{formik.errors.describe_your_taxi_company}</div>
                           ) : null}  
                              
                            </CCol>
                            
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputaffi">Affiliated with</CFormLabel>
                              <CFormInput aria-label="Affiliated"
                              {...formik.getFieldProps("affiliated_with")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.affiliated_with && formik.errors.affiliated_with,
                                },
                                {
                                  "is-valid":
                                    formik.touched.affiliated_with && !formik.errors.affiliated_with,
                                }
                              )}
                              name="affiliated_with"
                              autoComplete="off" />
                            {formik.errors.affiliated_with && formik.touched.affiliated_with ? (
                              <div className="text-danger">{formik.errors.affiliated_with}</div>
                            ) : null} 
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputphnnum">Phone Number</CFormLabel>
                              <CFormInput aria-label="phone number"
                              {...formik.getFieldProps("phone")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.phone && formik.errors.phone,
                                },
                                {
                                  "is-valid":
                                    formik.touched.phone && !formik.errors.phone,
                                }
                              )}
                              name="phone"
                              autoComplete="off" />
                            {formik.errors.phone && formik.touched.phone ? (
                              <div className="text-danger">{formik.errors.phone}</div>
                            ) : null} 
                              
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputnumcars">Number of Cars</CFormLabel>
                              <CFormInput id="num_cars"
                             {...formik.getFieldProps("number_of_cars")}
                             maxLength="50"
                             className={clsx(
                               "form-control bg-transparent",
                               {
                                 "is-invalid":
                                   formik.touched.number_of_cars && formik.errors.number_of_cars,
                               },
                               {
                                 "is-valid":
                                   formik.touched.number_of_cars && !formik.errors.number_of_cars,
                               }
                             )}
                             name="number_of_cars"
                             autoComplete="off" />
                           {formik.errors.number_of_cars && formik.touched.number_of_cars ? (
                             <div className="text-danger">{formik.errors.number_of_cars}</div>
                           ) : null} 
                            </CCol>
                            

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcomnum">Chamber of Commerce Number </CFormLabel>
                              <CFormInput id="com_numbers"
                             {...formik.getFieldProps("chamber_of_comerce_number")}
                             maxLength="50"
                             className={clsx(
                               "form-control bg-transparent",
                               {
                                 "is-invalid":
                                   formik.touched.chamber_of_comerce_number && formik.errors.chamber_of_comerce_number,
                               },
                               {
                                 "is-valid":
                                   formik.touched.chamber_of_comerce_number && !formik.errors.chamber_of_comerce_number,
                               }
                             )}
                             name="chamber_of_comerce_number"
                             autoComplete="off" />
                           {formik.errors.chamber_of_comerce_number && formik.touched.chamber_of_comerce_number ? (
                             <div className="text-danger">{formik.errors.chamber_of_comerce_number}</div>
                           ) : null} 
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcomnum">VAT Number </CFormLabel>
                              <CFormInput id="vat_numbers"
                              {...formik.getFieldProps("vat")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.vat && formik.errors.vat,
                                },
                                {
                                  "is-valid":
                                    formik.touched.vat && !formik.errors.vat,
                                }
                              )}
                              name="vat"
                              autoComplete="off" />
                            {formik.errors.vat && formik.touched.vat ? (
                              <div className="text-danger">{formik.errors.vat}</div>
                            ) : null} 
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputwebsite">Website</CFormLabel>
                              <CFormInput id="webt_site"
                              {...formik.getFieldProps("website")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.website && formik.errors.website,
                                },
                                {
                                  "is-valid":
                                    formik.touched.website && !formik.errors.website,
                                }
                              )}
                              name="website"
                              autoComplete="off" />
                            {formik.errors.website && formik.touched.website ? (
                              <div className="text-danger">{formik.errors.website}</div>
                            ) : null} 
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputquality">TX Quality Mark</CFormLabel>
                              <CFormInput id="iput_quality"
                             {...formik.getFieldProps("tx_quality")}
                             maxLength="50"
                             className={clsx(
                               "form-control bg-transparent",
                               {
                                 "is-invalid":
                                   formik.touched.tx_quality && formik.errors.tx_quality,
                               },
                               {
                                 "is-valid":
                                   formik.touched.tx_quality && !formik.errors.tx_quality,
                               }
                             )}
                             name="tx_quality"
                             autoComplete="off" />
                           {formik.errors.tx_quality && formik.touched.tx_quality ? (
                             <div className="text-danger">{formik.errors.tx_quality}</div>
                           ) : null} 
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputwebsite">Contact</CFormLabel>
                              <CFormInput id="cont_act"
                              {...formik.getFieldProps("contact")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.contact && formik.errors.contact,
                                },
                                {
                                  "is-valid":
                                    formik.touched.contact && !formik.errors.contact,
                                }
                              )}
                              name="contact"
                              autoComplete="off" />
                            {formik.errors.contact && formik.touched.contact ? (
                              <div className="text-danger">{formik.errors.contact}</div>
                            ) : null} 
                            </CCol>
                           
                            <CCol md={6} className="row add_company_row">
                            <CCol md={6}>
                                    <CFormLabel htmlFor="inputfname">First Name</CFormLabel>
                                    <CFormInput id="f_name"
                                    {...formik.getFieldProps("first_name")}
                                    maxLength="50"
                                    className={clsx(
                                      "form-control bg-transparent",
                                      {
                                        "is-invalid":
                                          formik.touched.first_name && formik.errors.first_name,
                                      },
                                      {
                                        "is-valid":
                                          formik.touched.first_name && !formik.errors.first_name,
                                      }
                                    )}
                                    name="first_name"
                                    autoComplete="off" />
                                  {formik.errors.first_name && formik.touched.first_name ? (
                                    <div className="text-danger">{formik.errors.first_name}</div>
                                  ) : null} 
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel htmlFor="inputlname">Last Name</CFormLabel>
                                    <CFormInput id="l_name"
                                    {...formik.getFieldProps("last_name")}
                                    maxLength="50"
                                    className={clsx(
                                      "form-control bg-transparent",
                                      {
                                        "is-invalid":
                                          formik.touched.last_name && formik.errors.last_name,
                                      },
                                      {
                                        "is-valid":
                                          formik.touched.last_name && !formik.errors.last_name,
                                      }
                                    )}
                                    name="last_name"
                                    autoComplete="off" />
                                  {formik.errors.last_name && formik.touched.last_name ? (
                                    <div className="text-danger">{formik.errors.last_name}</div>
                                  ) : null} 
                                </CCol>
                                </CCol>
                                
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcon_num">Tel Contact Number</CFormLabel>
                              <CFormInput id="tel_Con_nu"
                             {...formik.getFieldProps("tel_contact_number")}
                             maxLength="50"
                             className={clsx(
                               "form-control bg-transparent",
                               {
                                 "is-invalid":
                                   formik.touched.tel_contact_number && formik.errors.tel_contact_number,
                               },
                               {
                                 "is-valid":
                                   formik.touched.tel_contact_number && !formik.errors.tel_contact_number,
                               }
                             )}
                             name="tel_contact_number"
                             autoComplete="off" />
                           {formik.errors.tel_contact_number && formik.touched.tel_contact_number ? (
                             <div className="text-danger">{formik.errors.tel_contact_number}</div>
                           ) : null} 
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputmailaddress">Email Address</CFormLabel>
                              <CFormInput id="email_address"
                              {...formik.getFieldProps("email")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent",
                                {
                                  "is-invalid":
                                    formik.touched.email && formik.errors.email,
                                },
                                {
                                  "is-valid":
                                    formik.touched.email && !formik.errors.email,
                                }
                              )}
                              name="email"
                              autoComplete="off" />
                            {formik.errors.email && formik.touched.email ? (
                              <div className="text-danger">{formik.errors.email}</div>
                            ) : null} 
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