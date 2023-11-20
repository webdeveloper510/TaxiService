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
import { ClipLoader } from "react-spinners";
//import background from '../assets/images/heroimg.png';

const AddFare = () => {

  const navigate = useNavigate();


  const initialValues = {
    vehicle_type: "",
    vehicle_fare_per_km: "",
    minimum_fare: "",
    price_per_min: "",
    waiting_fare: "",

  };


  const validationSchema = Yup.object().shape({
    vehicle_type: Yup.string().trim().required("Vehicle Type  is required"),
    vehicle_fare_per_km: Yup.string().trim().required("Vehicle Fare  is required"),
    minimum_fare: Yup.string().trim().required("Minimum Fare  is required"),
    price_per_min: Yup.string().trim().required("Vehicle Fare  is required"),
    waiting_fare: Yup.string().trim().required("Waiting Fare is required"),

  });

  const [vehicleType , setVehicleType] = useState()

  useEffect(() => {
   
    getVehicleType("Active").then(res => {
      console.log(res.result, 'vehicle')
      if (res?.code === 200) {
        setVehicleType(res.result)
      }
    })
  
  }, []);

  const back = () => {
    navigate("/taxi/fare/listoffares")
  }

  const [submitLoader, setSubmitLoader] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      setSubmitLoader(true)

      addFare(values).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate("/taxi/fare/listoffares")
        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      }).finally(()=>{
        setSubmitLoader(true)
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
                    {/* <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>Add Fare</h2>
                      </div>
                    
                    </div> */}
                  </div>
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardBody>

                         
                          <form onSubmit={formik.handleSubmit} noValidate className="row g-3">
                          <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">Vehicle Type <span class="asterisk-mark">*</span></CFormLabel>
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
                              <CFormLabel htmlFor="inputvehicle_fare_per_km">Vehicle Fare (in €) Per Km <span class="asterisk-mark">*</span></CFormLabel>
                              <CFormInput 
                              aria-label="vehicle fare"
                              type="number"
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
                              <CFormLabel htmlFor="inputvehicleminfare">Minimum Fare  (in €)<span class="asterisk-mark">*</span></CFormLabel>
                              <CFormInput type="number" id="inputvehicleminfare"    {...formik.getFieldProps("minimum_fare")}
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
                              <CFormLabel htmlFor="inputmindistance">Vehicle Fare (in €) Per Minute <span class="asterisk-mark">*</span></CFormLabel>
                              <CFormInput type="number" id="inputmindistance"   {...formik.getFieldProps("price_per_min")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.price_per_min && formik.errors.price_per_min,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.price_per_min && !formik.errors.price_per_min,
                                  }
                                )}
                                name="price_per_min"
                                autoComplete="off" />
                              {formik.errors.price_per_min && formik.touched.price_per_min ? (
                                <div className="text-danger">{formik.errors.price_per_min}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputwaiting_fare">Waiting Fare  (in €)<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput type="number" id="inputwaiting_fare" {...formik.getFieldProps("waiting_fare")}
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
                                <CButton type="submit" className="submit-btn">{submitLoader?<ClipLoader color="#000000" />:"Submit"}</CButton>
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