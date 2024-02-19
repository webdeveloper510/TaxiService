import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import { useFormik } from "formik";
import deleteiconimg from "../../../assets/images/deleteicon.png";
import deletepopup from "../../../assets/images/deletepopup.png";
import * as Yup from "yup";
import clsx from "clsx";
import editicon from "../../../assets/images/editicon.png";

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
  CRow,
} from "@coreui/react";
//import refreshImg from '../../../assets/images/refresh.png';
//import crossImg from '../../../assets/images/cross-arrow.png';
//import downarrowImg from '../../../assets/images/down-arrow.png'
//import background from '../assets/images/heroimg.png';
import accepticonimg from "../../../assets/images/accept.png";
import rejecticonimg from "../../../assets/images/rejecticon.png";
//import editicon from '../../../assets/images/editicon.png'
import SuperSideBar from "../SiderNavBar/Sidebar";

import { Link } from "react-router-dom";
import {
  allocateDriver,
  getDriver,
  getTrip,
  getVehicle,
  getVehicleByType,
  tripsUpdate,
} from "../../../utils/api";
import { toast } from "react-toastify";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import AppLoader from "../../AppLoader";
import EmptyData from "../../EmptyData";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
const tableExample = [
  {
    Srnum: "1",
    tripid: "123",
    vehicletype: "SUV",
    tripfrom: "mohali",
    tripto: "chandigarh",
    time: "10:20AM",
  },
];
const SuperPendingTrip = () => {
  const [pendinTrip, setPendingTrip] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [driver, setDriver] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [delvisible, setDelvisible] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = pendinTrip.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(pendinTrip?.length / recordPage);
  const number = [...Array(nPage + 1).keys()].slice(1);

  const pageNumber = number.map((num, i) => {
    if (num < maxPage + 1 && num > minPage) {
      return (
        <>
          <li
            key={i}
            className={currentPage == num ? `active_btn ` : `unactive_btn`}
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
  if (data?.length > maxPage) {
    pageIncreament = <li onClick={handleNextPage}>&hellip;</li>;
  }
  const [search, setSearch] = useState("")

  async function onLoadComponent() {
    setLoader(true);
    getTrip("Pending", search)
      .then((res) => {
        console.log(res.result, "pending trip vehicle");
        if (res?.code === 200) {
          setPendingTrip(res.result);
          getDriver()
            .then((res) => {
              console.log(res.result, "pending trip driver");
              if (res?.code === 200) {
                setDriver(res.result.filter(driver => driver.status && driver.is_login));
              }
            })
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => {
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  useEffect(() => {
    onLoadComponent();
  }, [search]);
  useEffect(() => {
    getVehicleByType(selectedVehicleType).then((res) => {
      console.log(res?.result, "pending trip vehicle type");
      if (res?.code === 200) {
        setVehicle(res?.result);
      }
    });
  }, [selectedVehicleType]);

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
    if (!selectDriver || selectDriver?.length < 1) {
      newErrors.driver_name = true;
      valid = false;
    }
    if (!selectVehicle || selectVehicle?.length < 1) {
      newErrors.vehicle = true;
      valid = false;
    }
    setErrors(newErrors);
    const data = {
      driver_name: selectDriver,
      vehicle: selectVehicle,
      status: "Accepted",
    };
    if (!valid) {
      // setVisible(false);
      return;
    }
    console.log("data for allocating driver", data);
    console.log("errors for allocating driver", errors);
    console.log("id for allocating driver", selectedId);
    allocateDriver(data, selectedId).then((res) => {
      console.log(res.result, "allocated done");
      if (res?.data?.code === 200) {
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        const newTrips = pendinTrip.filter((item) => {
          return item._id != selectedId;
        });
        setPendingTrip(newTrips);
      } else {
        toast.warning(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    });
    setLoader(false);
    setVisible(false);
  }
  function handleDeletItem() {
    const data = {
      trip_status: "Canceled",
    };
    tripsUpdate(selectedId, data).then((res) => {
      console.log(res.result, "cancele done");
      if (res?.data?.code === 200) {
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        const newTrips = pendinTrip.filter((item) => {
          return item._id != selectedId;
        });
        setPendingTrip(newTrips);
        setDelvisible(false)
      } else {
        toast.warning(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    });
  }

  const handleDelet = (id) => {
    setDelvisible(id)
  }

  useEffect(() => {
    if (!visible) {
      setSelectDriver(null);
      setSelectVehicle(null);
      setSelectedId(null);
      setErrors({
        driver_name: false,
        vehicle: false,
      });
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
                <div className="company-pending-trips">
                  <div className="serach-left" id="pending-trip-search">
                    <MDBInputGroup>
                      <MDBInput placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

                    </MDBInputGroup>
                  </div></div>
                <div className="active-trip-outer" id="pending-trips">

                  {/* <div className="trips-head d-flex justify-content-between">
 <div className="box-shd d-flex justify-content-between">
 <div className="left-trip-content">
 <h2>List of Pending Trips</h2>
 </div>
 <div className="right-trip-content">
 <img src={refreshImg} />
 <img src={downarrowImg} />
 <img src={crossImg} />
 <Link to="/taxi/trips/addnewbooking">
 <CButton className="add_company_btn">Add New Booking</CButton>
 </Link>
 </div>
 </div>
 </div> */}
                  {loader ? (
                    <AppLoader />
                  ) : (
                    <>

                      {data?.length > 0 ? <CTable align="middle" className="mb-0" hover responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell className="text-center">
                              S. No.
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Customer
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip ID
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Vehicle Type
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip From
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip To
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Comment
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Time
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Action
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">View Ride</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>

                        <CTableBody>
                          {data?.length > 0
                            ? data?.map((item, index) => (
                              <CTableRow
                                className="text-center"
                                v-for="item in tableItems"
                                key={item._id}
                              >
                                <CTableDataCell>
                                  <div>{firstIndex + index + 1}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.company_name}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.trip_id}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.vehicle_type}</div>
                                </CTableDataCell>

                                <CTableDataCell>
                                  <div>{item?.trip_from?.address.slice(0, 20) + `${item?.trip_from?.address?.length < 21 ? "" : "..."}`}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item?.trip_to?.address.slice(0, 20) + `${item?.trip_to?.address?.length < 21 ? "" : "..."}`}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>
                                    {item?.comment}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>
                                    {moment(item.pickup_date_time).format(
                                      "MMMM Do YYYY, h:mm a"
                                    )}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="pending-trips-icons">
                                  <div style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                  }} className="pending-icons-outer">
                                    <div>
                                      <CButton id="allocate_driver"
                                        className="allocate_accept_driver"
                                        onClick={() => {
                                          setVisible(!visible);
                                          setSelectedId(item?._id);
                                          setSelectedVehicleType(item?.vehicle_type)
                                        }}
                                      >
                                        <img src={accepticonimg} alt="images" />
                                      </CButton>
                                    </div>
                                    <div
                                      onClick={() => { setSelectedId(item._id); setDelvisible(true) }}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="reject_icon"
                                    >
                                      <img src={deleteiconimg} alt="images" />
                                    </div>
                                    <div>
                                      <Link
                                        to={`/taxi/trips/editpendingtrips/${item._id}`}
                                      >
                                        <CButton className="allocate_accept_driver">
                                          <img src={editicon} alt="img" />
                                        </CButton>
                                      </Link>
                                    </div>
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                        <div className="view_details_btn">
                        <Link to={`/trips/view-trip-details/${item._id}`}>
                          View Details
                          </Link>
                          </div>
                      </CTableDataCell>   
                              </CTableRow>
                            ))
                            : ""}
                        </CTableBody>
                      </CTable> : <EmptyData />}
                    </>
                  )}

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
                  {/* allocatedriver */}

                  <CModal
                    alignment="center"
                    visible={visible}
                    onClose={() => setVisible(false)}
                  >
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
                                  <CFormLabel htmlFor="inputvehicletype">
                                    Vehicle
                                  </CFormLabel>
                                  <CFormSelect
                                    id="inputallocatevehicle"
                                    name="Vehicle"
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setSelectVehicle(e.target.value);
                                      if (
                                        !e?.target?.value ||
                                        e.target.value?.length < 1
                                      ) {
                                        setErrors({ ...errors, vehicle: true });
                                      } else {
                                        setErrors({
                                          ...errors,
                                          vehicle: false,
                                        });
                                      }
                                    }}
                                  >
                                    <option default>Select Vehicle</option>
                                    {vehicle.map((item) => {
                                      return (
                                        <option value={item._id}>
                                          {item.vehicle_model}
                                        </option>
                                      );
                                    })}
                                  </CFormSelect>
                                  {errors.vehicle && (
                                    <span
                                      style={{ color: "red" }}
                                      className="text-danger"
                                    >
                                      Select Vehicle required
                                    </span>
                                  )}
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputdtriver">
                                    Driver
                                  </CFormLabel>
                                  <CFormSelect
                                    id="inputallocatedriver"
                                    name="Driver"
                                    autoComplete="off"
                                    onChange={(e) => {
                                      setSelectDriver(e.target.value);
                                      if (
                                        !e?.target?.value ||
                                        e.target.value?.length < 1
                                      ) {
                                        setErrors({
                                          ...errors,
                                          driver_name: true,
                                        });
                                      } else {
                                        setErrors({
                                          ...errors,
                                          driver_name: false,
                                        });
                                      }
                                    }}
                                  >
                                    <option default>Select Driver</option>
                                    {driver.map((item) => {
                                      return (
                                        <option
                                          value={item._id}
                                        >{`${item.first_name} ${item.last_name}`}</option>
                                      );
                                    })}
                                  </CFormSelect>
                                  {errors.driver_name && (
                                    <span
                                      style={{ color: "red" }}
                                      className="text-danger"
                                    >
                                      Select driver
                                    </span>
                                  )}
                                </CCol>

                                <CCol xs={12}>
                                  <div
                                    className="d-flex justify-content-center"
                                    style={{ marginTop: "40px" }}
                                  >
                                    <CButton
                                      onClick={handeleAllocate}
                                      className="submit-btn"
                                    >
                                      Submit
                                    </CButton>
                                    <CButton
                                      onClick={() => {
                                        setVisible(false);
                                      }}
                                      className="cancel-btn"
                                    >
                                      Cancel
                                    </CButton>
                                  </div>
                                </CCol>
                              </CForm>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>

                  </CModal>

                  <CModal
                    alignment="center"
                    visible={delvisible}
                    onClose={() => setDelvisible(false)}
                  >
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup">
                            <CCardBody>
                              <img src={deletepopup} alt="danger" />
                              <h2>Are you Sure</h2>
                              <p>You want to delete this trip ?</p>
                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                              <CButton
                                className="delete_popup"
                                onClick={() => handleDeletItem(delvisible)}
                              >
                                Delete
                              </CButton>
                              <CButton
                                className="cancel_popup"
                                onClick={() => setDelvisible(false)}
                              >
                                Cancel
                              </CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>
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