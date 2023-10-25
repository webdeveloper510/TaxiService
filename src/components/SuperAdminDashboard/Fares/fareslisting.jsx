import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
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
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CFormSelect,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import {  deleteFare, editfare, getFare, getVehicleType } from "../../../utils/api";



import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import PulseLoader from "react-spinners/PulseLoader";
import SuperSideBar from "../SiderNavBar/Sidebar";
import { toast } from "react-toastify";




const ListOfFares = () => {
  const initialValues = {
    vehicle_type: "",
    vehicle_fare_per_km: "",
    minimum_fare: "",
    minimum_distance: "",
    waiting_fare: "",

  };
  const [visible, setVisible] = useState(false)
  const [fare, setFare] = useState()
  const [loader, setLoader] = useState(false);
  const [selectedFare, setSelectedFare] = useState(initialValues)
  useEffect(()=>{
    console.log("selectedFare", selectedFare)
    formik.setValues(selectedFare);
  },[selectedFare])
  useEffect(() => {
    setLoader(true)
    getFare().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setFare(res.result)
      }
      setLoader(false)
    })
  }, [])
  const deleteFareHandler = async (id) => {
    try {
      console.log(id, 'driver deleted id')
      const deleteData = await deleteFare(id);
      console.log(deleteData,"delete fare data")
      if(deleteData.code === 200) {
        toast.success(`${deleteData.message}`, {

          position: 'top-right',
          autoClose: 1000,
        });
        const newData = fare.filter(d => d._id != id);
        setFare(newData)
      }else{
        toast.warning(`${deleteData.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
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
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

     

      editfare(values,selectedFare._id).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          setVisible(false);
          const newData = fare.map(
            (item) =>{
              if(selectedFare._id === item._id) return values;
              return item
            }
          );
          setFare(newData)

        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      })


    },
  });
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SuperSideBar/>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Fare Management</h1>
                <div class="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>Fare List </h2>
                      </div>
                      {/* <div className="right-trip-content">
                        <Link to="/superadmindashboard/add-fare">
                          <CButton className="add_fare_btn">Add Fare</CButton>
                        </Link>
                     
            </div> */}
                    </div>
                  </div>
                  {
                    loader ? (<>
                     <div className=" d-flex justify-content-center align-items-center"
                    style={{ height: 400 }}>
                    <PulseLoader
                      color="#FFD04E"
                      loading={true}
                      margin={4}
                      size={60}
                      speedMultiplier={0.5}
                    />
                  </div>
                    </>) : (<>
                      <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>
                        {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                        <CTableHeaderCell className="text-center">Sr No.</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Fare Per Miles</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Minimum Fare (€)</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Minimum Distance Per Miles</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Waiting Fare (€)</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {fare?.length ?  fare.map((item, index) => (
                        <CTableRow className="text-center" v-for="item in tableItems" key={item._id}>


                          <CTableDataCell>
                            <div>{index+ 1}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.vehicle_type}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.vehicle_fare_per_km}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.minimum_fare}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.minimum_distance}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.waiting_fare}</div>
                          </CTableDataCell>
                          <CTableDataCell className="d-flex action-icons driver-icons">
                            <div> <CButton  onClick={() =>{
                                setSelectedFare(item)
                               setVisible(!visible)
                            }} ><img src={editiconimg} /></CButton></div>
                            <div
                            style={{
                              cursor: 'pointer'
                            }}
                            onClick={()=> deleteFareHandler(item._id)}
                            ><img src={deleteiconimg} /></div>
                          </CTableDataCell>
                        </CTableRow>
                      )) : ""}
                    </CTableBody>
                  </CTable></>)
                  }
                


                  {/* farelistmodalpopup */}


                  <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Edit Fare</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
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
                                <CCol md={6}>
                                <CFormLabel htmlFor="inputvehicle_fare_per_km">Vehicle Fare Per Miles</CFormLabel>
                              <CFormInput  onKeyDown={(e) => { handleFare(e,5) }} aria-label="vehicle fare" {...formik.getFieldProps("vehicle_fare_per_km")}
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
                              <CFormInput  onKeyDown={(e) => { handleFare(e,5) }} id="inputvehicleminfare"    {...formik.getFieldProps("minimum_fare")}
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
                              <CFormInput  onKeyDown={(e) => { handleFare(e,5) }} id="inputmindistance"   {...formik.getFieldProps("minimum_distance")}
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
                              <CFormInput  onKeyDown={(e) => { handleFare(e,5) }} id="inputwaiting_fare" {...formik.getFieldProps("waiting_fare")}
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
                                    <CButton onClick={()=>setVisible(false)} className="cancel-btn">Cancel</CButton>
                                  </div>
                                </CCol>
                              </form>

                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                    {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter> */}
                  </CModal>




                  {/* endfarelistpopup */}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOfFares; 