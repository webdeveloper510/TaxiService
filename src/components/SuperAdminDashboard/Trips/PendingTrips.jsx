import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow
} from '@coreui/react'
//import refreshImg from '../../../assets/images/refresh.png';
//import crossImg from '../../../assets/images/cross-arrow.png';
//import downarrowImg from '../../../assets/images/down-arrow.png'
//import background from '../assets/images/heroimg.png';
import accepticonimg from '../../../assets/images/accept.png'
import rejecticonimg from '../../../assets/images/rejecticon.png'
//import editicon from '../../../assets/images/editicon.png'
import SuperSideBar from "../SiderNavBar/Sidebar";

import { Link } from 'react-router-dom';
import { allocateDriver, getDriver, getTrip, getVehicle } from "../../../utils/api";
import { toast } from "react-toastify";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import AppLoader from "../../AppLoader";

const tableExample = [
  {
    Srnum: '1',
    tripid: '123',
    vehicletype: 'SUV',
    tripfrom: 'mohali',
    tripto: 'chandigarh',
    time: '10:20AM',

  },
]
const SuperPendingTrip = () => {

  const [pendinTrip, setPendingTrip] = useState([])
  const [visible, setVisible] = useState(false)
  const [loader, setLoader] = useState(false);
  const [driver, setDriver] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  async function onLoadComponent(){
    setLoader(true)
    getTrip("Pending").then(res => {

      console.log(res.result, 'pending trip vehicle')
      if (res.code === 200) {
        setPendingTrip(res.result)
        getDriver().then(res => {
          console.log(res.result, 'pending trip driver')
          if (res.code === 200) {
            setDriver(res.result)
            getVehicle().then(res => {
              console.log(res.result, 'pending trip vehicle')
              if (res.code === 200) {
                setVehicle(res.result)
                setLoader(false)
              }
            })
          }
        }).catch(err => {throw err});
      }
    }).catch(err => {
      setLoader(false);
    }).finally(() => {
      setLoader(false);
    });
    
  }
  useEffect(() => {
    onLoadComponent()
  }, []);

  const [selectDriver, setSelectDriver] = useState();
  const [selectVehicle, setSelectVehicle] = useState();
  const [errors, setErrors] = useState({
    driver_name: false,
    vehicle: false,
  });
  function handeleAllocate() {
    setLoader(true);

    const newErrors = { ...errors };
    let valid = true;
    if (!selectDriver || setSelectDriver.length < 1) {

      newErrors.driver_name = true
      valid = false;
    }
    if (!selectVehicle || selectVehicle.length < 1) {
      newErrors.vehicle = true
      valid = false
    }
    setErrors(newErrors);
    const data = {
      driver_name: selectDriver,
      vehicle: selectVehicle,
      status: "Accepted",
    }
    if (!valid) {
      // setVisible(false);
      return
    }
    console.log("data for allocating driver", data);
    console.log("errors for allocating driver", errors);
    console.log("id for allocating driver", selectedId);
    allocateDriver(data, selectedId).then(res => {
      console.log(res.result, 'allocated done')
      if (res?.data?.code === 200) {
        toast.success(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
        const newTrips = pendinTrip.filter((item) => {
          return item._id != selectedId
        })
        setPendingTrip(newTrips);
      } else {
        toast.warning(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    })
    setLoader(false)
    setVisible(false);
  }
  function canceleTrip(id) {
    const data = {
      status: "Canceled",
    }
    allocateDriver(data, id).then(res => {
      console.log(res.result, 'cancele done')
      if (res?.data?.code === 200) {
        toast.success(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
        const newTrips = pendinTrip.filter((item) => {
          return item._id != id
        })
        setPendingTrip(newTrips);
      } else {
        toast.warning(`${res.data.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    })
  }


  useEffect(() => {
    if (!visible) {
      setSelectDriver(null);
      setSelectVehicle(null);
      setSelectedId(null);
      setErrors({
        driver_name: false,
        vehicle: false,
      })
    }
  }, [visible]);
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SuperSideBar />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 className="heading-for-every-page">Pending Trips</h1>
                <div className="active-trip-outer">
                   {/* <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>List of Pending Trips</h2>
                      </div>
                      <div className="right-trip-content">
                        <img src={refreshImg} />
                        <img src={downarrowImg} />
                        <img src={crossImg} />
                        <Link to="/superadmindashboard/trips/addnewbooking">
                          <CButton className="add_company_btn">Add New Booking</CButton>
                        </Link>
                      </div>
                    </div>
                  </div> */}
                  {loader ? <div className=" d-flex justify-content-center align-items-center"
                    style={{ height: 400 }}>
                    <PulseLoader
                      color="#FFD04E"
                      loading={true}
                      margin={4}
                      size={60}
                      speedMultiplier={0.5}
                    />
                  </div> : <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>

                        <CTableHeaderCell className="text-center">Sr.No</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip ID</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Time</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>

                    <CTableBody>
                      {pendinTrip.map((item, index) => (
                        <CTableRow className="text-center" v-for="item in tableItems" key={item._id}>
                          <CTableDataCell>
                            <div>{index + 1}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item._id}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.vehicle_type}</div>
                          </CTableDataCell>

                          <CTableDataCell>
                            <div>{item.trip_from.address}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.trip_to.address}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{moment(item.pickup_date_time).format('MMMM Do YYYY, h:mm:ss a')}</div>
                          </CTableDataCell>
                          <CTableDataCell className="d-flex pending-trips-icons">
                            <div><CButton className="allocate_accept_driver" onClick={() => {
                              setVisible(!visible);
                              setSelectedId(item._id);
                              }} ><img src={accepticonimg} /></CButton></div>
                            <div
                              onClick={() => {
                                canceleTrip(item._id);
                              }}
                              style={{
                                cursor: 'pointer'
                              }}
                              className="reject_icon"><img src={rejecticonimg} /></div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>}
                  {/* allocatedriver */}


                  <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Allocate Driver</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>

                        <CCol xs={12}>
                          <CCard className="mb-4">
                            <CCardBody>

                              <CForm className="row g-3">

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputvehicletype">Vehicle</CFormLabel>
                                  <CFormSelect id="inputallocatevehicle"
                                    name="Vehicle"
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setSelectVehicle(e.target.value);
                                      if (!e?.target?.value || e.target.value.length < 1) {
                                        setErrors({ ...errors, "vehicle": true })
                                      } else {
                                        setErrors({ ...errors, "vehicle": false })
                                      }
                                    }}
                                  >
                                    <option default>Select Vehicle</option>
                                    {vehicle.map((item) => {
                                      return (
                                        <option value={item._id}>{item.vehicle_model
                                        }</option>
                                      )
                                    })}


                                  </CFormSelect>
                                  {errors.vehicle && <span style={{ color: "red" }} className="text-danger">Select Vehicle required</span>}
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputdtriver">Driver</CFormLabel>
                                  <CFormSelect id="inputallocatedriver"
                                    name="Driver"
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setSelectDriver(e.target.value)
                                      if (!e?.target?.value || e.target.value.length < 1) {
                                        setErrors({ ...errors, "driver_name": true })
                                      } else {
                                        setErrors({ ...errors, "driver_name": false })
                                      }
                                    }}
                                  >
                                    <option default>Select Driver</option>
                                    {driver.map((item) => {
                                      return (
                                        <option value={item._id}>{`${item.first_name} ${item.last_name}`}</option>
                                      )
                                    })}


                                  </CFormSelect>
                                  {errors.driver_name && <span style={{ color: "red" }} className="text-danger">Select driver</span>}
                                </CCol>



                                <CCol xs={12}>
                                  <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                    <CButton onClick={handeleAllocate} className="submit-btn">Submit</CButton>
                                    <CButton onClick={() => { setVisible(false) }} className="cancel-btn">Cancel</CButton>
                                  </div>
                                </CCol>
                              </CForm>

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



                  {/* endallocatedriverpopup */}

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

export default SuperPendingTrip; 