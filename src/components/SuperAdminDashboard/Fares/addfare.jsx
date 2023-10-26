import React, { useState , useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";

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
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { addFare } from "../../../utils/api";
import { toast } from 'react-toastify';
import { getVehicleType } from "../../../utils/api";
import SuperSideBar from "../SiderNavBar/Sidebar";
//import background from '../assets/images/heroimg.png';

const AddFare = () => {

  const navigate = useNavigate();


  const initialValues = {
    vehicle_type: "",
    vehicle_fare_per_km: "",
    minimum_fare: "",
    minimum_distance: "",
    waiting_fare: "",

  };


  const validationSchema = Yup.object().shape({
    vehicle_type: Yup.string().required("Vehicle Type  is required"),
    vehicle_fare_per_km: Yup.string().required("Vehicle Fare  is required"),
    minimum_fare: Yup.string().required("Minimum Fare  is required"),
    minimum_distance: Yup.string().required("Minimum Distance  is required"),
    waiting_fare: Yup.string().required("Waiting Fare is required"),

  });

  const [vehicleType , setVehicleType] = useState()

  useEffect(() => {
   
    getVehicleType("Active").then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setVehicleType(res.result)
      }
    })
  
  }, []);

  const back = () => {
    navigate("/superadmindashboard/fare/listoffares")
  }


  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

     

      addFare(values).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate("/superadmindashboard/fare/listoffares")
        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      })


    },
  });

  const handleFare = (event, max) => {
    const pattern = /^[0-9]+$/;
    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight") {

      formik.setFieldValue(event.target.name, event.target.value)
      formik.setFieldTouched(event.target.name, true)
    } else {

      let value = event.target.value.toString()
      if (value.length > max) {
        event.stopPropagation()
        event.preventDefault()
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation()
        } else {
          formik.setFieldValue(event.target.name, event.target.value)
          formik.setFieldTouched(event.target.name, true)
        }
      }
    }
  }

  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SuperSideBar/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">Add Fare</h1>
                <div class="active-trip-outer" id="fare_management_page">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        {/* <h2>Add Fare</h2> */}
                      </div>
                    
                    </div>
                  </div>
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardBody>

                         
                          <form onSubmit={formik.handleSubmit} noValidate className="row g-3">
                          <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                              <CFormSelect  {...formik.getFieldProps("vehicle_type")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicle_type && formik.errors.vehicle_type,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicle_type && !formik.errors.vehicle_type,
                                  }
                                )}
                                name="vehicle_type"
                                autoComplete="off" >

                                <option default>Select Vehicle</option>
                                {vehicleType?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e.name} >{e.name}</option>
                                    </>
                                  )
                                })}
                              </CFormSelect>
                              {formik.errors.vehicle_type && formik.touched.vehicle_type ? (
                                <div className="text-danger">{formik.errors.vehicle_type}</div>
                              ) : null}
                            </CCol>
                            {/* <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicle_type">Vehicle Type</CFormLabel>
                              <CFormInput aria-label="vehicle type"  {...formik.getFieldProps("vehicle_type")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicle_type && formik.errors.vehicle_type,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicle_type && !formik.errors.vehicle_type,
                                  }
                                )}
                                name="vehicle_type"
                                autoComplete="off" />
                              {formik.errors.vehicle_type && formik.touched.vehicle_type ? (
                                <div className="text-danger">{formik.errors.vehicle_type}</div>
                              ) : null}
                            </CCol> */}
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicle_fare_per_km">Vehicle Fare Per Miles</CFormLabel>
                              <CFormInput onKeyDown={(e) => { handleFare(e,5) }} aria-label="vehicle fare"
                               {...formik.getFieldProps("vehicle_fare_per_km")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicle_fare_per_km && formik.errors.vehicle_fare_per_km,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicle_fare_per_km && !formik.errors.vehicle_fare_per_km,
                                  }
                                )}
                                name="vehicle_fare_per_km"
                                autoComplete="off" />
                              {formik.errors.vehicle_fare_per_km && formik.touched.vehicle_fare_per_km ? (
                                <div className="text-danger">{formik.errors.vehicle_fare_per_km}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputvehicleminfare">Minimum Fare</CFormLabel>
                              <CFormInput onKeyDown={(e) => { handleFare(e,5) }} id="inputvehicleminfare"    {...formik.getFieldProps("minimum_fare")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.minimum_fare && formik.errors.minimum_fare,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.minimum_fare && !formik.errors.minimum_fare,
                                  }
                                )}
                                name="minimum_fare"
                                autoComplete="off" />
                              {formik.errors.minimum_fare && formik.touched.minimum_fare ? (
                                <div className="text-danger">{formik.errors.minimum_fare}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputmindistance">Minimum Distance</CFormLabel>
                              <CFormInput onKeyDown={(e) => { handleFare(e,5) }} id="inputmindistance"   {...formik.getFieldProps("minimum_distance")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.minimum_distance && formik.errors.minimum_distance,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.minimum_distance && !formik.errors.minimum_distance,
                                  }
                                )}
                                name="minimum_distance"
                                autoComplete="off" />
                              {formik.errors.minimum_distance && formik.touched.minimum_distance ? (
                                <div className="text-danger">{formik.errors.minimum_distance}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputwaiting_fare">Waiting Fare</CFormLabel>
                              <CFormInput onKeyDown={(e) => { handleFare(e,5) }} id="inputwaiting_fare" {...formik.getFieldProps("waiting_fare")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.waiting_fare && formik.errors.waiting_fare,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.waiting_fare && !formik.errors.waiting_fare,
                                  }
                                )}
                                name="waiting_fare"
                                autoComplete="off" />
                              {formik.errors.waiting_fare && formik.touched.waiting_fare ? (
                                <div className="text-danger">{formik.errors.waiting_fare}</div>
                              ) : null}
                            </CCol>


                            <CCol xs={12}>
                              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                <CButton type="submit" className="submit-btn">Submit</CButton>
                                <CButton type="button" className="cancel-btn" onClick={back}>Cancel</CButton>
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

export default AddFare; 