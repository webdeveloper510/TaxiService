import React, { useContext, useEffect, useState } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CAvatar,
  CModal,
  CModalBody,
  CRow,
  CCol,
  CCard,
  CCardBody,
} from "@coreui/react";
import filterImg from "../../../assets/images/filter-icon.png";

import AppHeader from "../../TopBar/AppHeader";
import editiconimg from "../../../assets/images/editicon.png";
import deleteiconimg from "../../../assets/images/deleteicon.png";
import PulseLoader from "react-spinners/PulseLoader";
import deletepopup from "../../../assets/images/deletepopup.png";
import {
  deleteCompany,
  deleteDriver,
  favoriteDriverApi,
  getDriver,
  rejectDriverApi,
  verifyDriverApi,
} from "../../../utils/api";
import SuperSideBar from "../SiderNavBar/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import EmptyData from "../../EmptyData";
import SuperAdminSideBar from "../../SuperAdmin/Sidebar/SideBar";
import AppLoader from "../../AppLoader";
import Dropdown from "react-bootstrap/Dropdown";
import userContext from "../../../utils/context";
import { MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const ListOfDrivers = ({ role }) => {
  const [selectedType, setSelectedType] = useState("Verified Drivers");
  const { user, setUser, appLoaded } = useContext(userContext);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [verify, setVerify] = useState(false);
  const [reject , setReject] = useState(false)
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [allDriver, setAllDriver] = useState([]);
  const [driver, setDriver] = useState([]);
  const [loader, setLoader] = useState(false);
  // const image = process.env.REACT_APP_IMAGE_URL1
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = driver?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(driver?.length / recordPage);
  const number = [...Array(nPage + 1).keys()].slice(1);
  console.log("role is: ", role);
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
  if (data.length > maxPage) {
    pageIncreament = <li onClick={handleNextPage}>&hellip;</li>;
  }
  const [search, setSearch] = useState("");
  const searchDriver = async()=>{
    setLoader(true);
    getDriver(role, search).then((res) => {
      console.log(res.result, "vehicle");
      if (res?.code === 200) {
        setAllDriver(res.result);
        // setDriver(
        //   res.result.filter((driver) => {
        //     return driver.isVerified && driver.isDocUploaded;
        //   })
        // );
        if (selectedType == "Verified Drivers") {
          setDriver(
            res.result.filter((driver) => {
              return driver.isVerified && driver.isDocUploaded;
            })
          );
        } else if (selectedType == "Unverified Drivers") {
          setDriver(
            res.result.filter((driver) => {
              return !driver.isVerified && driver.isDocUploaded;
            })
          );
        } else {
          setDriver(
            res.result.filter((driver) => {
              return !driver.isVerified && !driver.isDocUploaded;
            })
          );
        }
      }
      
      setLoader(false);
    }).finally(()=>{
      setLoader(false);
    });
  }
  
  const deleteDriverHandler = async (id) => {
    try {
      console.log(id, "driver deleted id");
      const deleteData = await deleteDriver(id);
      console.log(deleteData, "delete driver data");
      if (deleteData.code === 200) {
        toast.success(`${deleteData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        const newData = driver.filter((d) => d._id != id);
        setDriver(newData);
      } else {
        toast.warning(`${deleteData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setDeleteVisible(false);
    } catch (error) {
      console.log(error);
      setDeleteVisible(false);
    }
  };
  const favoriteDriverHandler = async (id) => {
    try {
      console.log(id, "driver deleted id");
      const favoriteData = await favoriteDriverApi(id);

      if (favoriteData.code === 200) {
        toast.success(`${favoriteData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        let fv = [...user?.favoriteDrivers];
        console.log("🚀 ~ favoriteDriverHandler ~ fv:before", fv);
        if (!fv?.includes(id)) {
          fv = [...fv, id];
        } else {
          fv = fv.filter((item) => item != id);
        }
        console.log("🚀 ~ favoriteDriverHandler ~ fv after:", fv);
        const newUser = { ...user };
        newUser.favoriteDrivers = fv;
        setUser(newUser);
      } else {
        toast.warning(`${favoriteData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setDeleteVisible(false);
    } catch (error) {
      console.log(error);
      setDeleteVisible(false);
    }
  };

  const verifyDriverHandler = async (id) => {
    try {
      const verifyData = await verifyDriverApi(id);
      if (verifyData.code === 200) {
        toast.success(`${verifyData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        // const newData = driver.filter((d) => d._id != id);
        // setDriver(newData);
        // const newAllData = [...allDriver];
        // newAllData.forEach((d) => {
        //   if (d._id != id) {
        //     d.isVerified = true;
        //   }
        // });
        // console.log("🚀 ~ newAllData ~ newAllData:", newAllData);
        // setAllDriver(newAllData);
        searchDriver()
      } else {
        toast.warning(`${verifyData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setVerify(false);
    } catch (error) {
      console.log(error);
      toast.warning(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
      });
      setVerify(false);
    }
  };

  const handleRejectDriver = async (id) => {
    try {
      const verifyData = await rejectDriverApi(id);
      console.log("rejected data++", verifyData)
      if (verifyData.code === 200) {
        toast.success(`${verifyData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        // const newData = driver.filter((d) => d._id != id);
        // setDriver(newData);
        // const newAllData = [...allDriver];
        // newAllData.forEach((d) => {
        //   if (d._id != id) {
        //     d.isDocUploaded = false;
        //   }
        // });
        // console.log("🚀 ~ newAllData ~ newAllData:", newAllData);
        // setAllDriver(newAllData);
        searchDriver()
      } else {
        toast.warning(`${verifyData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
      setReject(false);
    } catch (error) {
      console.log(error);
      toast.warning(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
      });
      setVerify(false);
    }
  };
  const handleSelect = (eventKey) => {
    setSelectedType(eventKey); // Update the selected value when an item is selected
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      searchDriver()
    }, 2000)

    return () => clearTimeout(getData)
    
    
  }, [selectedType,search]);
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            {role == "super" ? <SuperAdminSideBar /> : <SuperSideBar />}

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <div className="d-flex justify-content-between">
                  <h1 class="heading-for-every-page">Driver's List</h1>
                  <div className="serach-left" id="recent-trip-search">
                    <MDBInputGroup>
                      <MDBInput
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </MDBInputGroup>
                  </div>
                  {role == "super" && (
                    <Dropdown onSelect={handleSelect}>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={filterImg} />
                        {selectedType}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {[
                          "Verified Drivers",
                          "Unverified Drivers",
                          "Register Drivers",
                        ].map((item, i) => {
                          return (
                            <Dropdown.Item
                              key={i}
                              eventKey={item}
                              onClick={() => {
                                setSelectedType(item);
                              }}
                            >
                              {item}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </div>
                <div className="filter-right"></div>
                <div class="active-trip-outer">
                  {loader ? (
                    <>
                      <AppLoader />
                    </>
                  ) : (
                    <>
                      {data?.length > 0 ? (
                        <CTable
                          align="middle"
                          className="mb-0"
                          hover
                          responsive
                        >
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell className="text-center">
                                Image
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Name
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Mobile No.
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Email
                              </CTableHeaderCell>
                              {selectedType == "Verified Drivers" && (
                                <CTableHeaderCell className="text-center">
                                  Vehicle
                                </CTableHeaderCell>
                              )}
                              {selectedType == "Verified Drivers" && (
                                <CTableHeaderCell className="text-center">
                                  License Plate
                                </CTableHeaderCell>
                              )}
                              {/* <CTableHeaderCell className="text-center">
                              Trips
                            </CTableHeaderCell> */}
                              {selectedType == "Verified Drivers" && (
                                <CTableHeaderCell className="text-center">
                                  Status
                                </CTableHeaderCell>
                              )}
                              {(selectedType == "Verified Drivers" ||
                                selectedType == "Unverified Drivers") && (
                                <CTableHeaderCell className="text-center">
                                  Document
                                </CTableHeaderCell>
                              )}
                              {role == "super" && (
                                <CTableHeaderCell className="text-center">
                                  Action
                                </CTableHeaderCell>
                              )}
                              {role == "super" && (
                                <CTableHeaderCell className="text-center">
                                  View Vehicle
                                </CTableHeaderCell>
                              )}
                              {role != "super" && (
                                <CTableHeaderCell className="text-center">
                                  Favorite
                                </CTableHeaderCell>
                              )}
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {data?.length > 0
                              ? data.map((item, index) => {
                                  let status = "Offline";
                                  if (item.status && item.is_login) {
                                    status = "Online";
                                    if (!item.is_available) {
                                      status = "In a ride";
                                    }
                                  }

                                  let background =
                                    "linear-gradient(90deg, #FF5370 0%, #FF869A 100%)";
                                  if (status == "Online")
                                    background =
                                      "linear-gradient(90deg, #05D41F 0%, rgba(38, 228, 15, 0.9) 100%)";
                                  else if (status == "In a ride")
                                    background =
                                      "linear-gradient(90deg, #FF6A00 0%, #FFA625 100%)";
                                  return (
                                    <CTableRow
                                      className="text-center"
                                      key={index}
                                    >
                                      <CTableDataCell className="text-center profle-pic">
                                        <CAvatar
                                          size="md"
                                          alt="img"
                                          src={item.profile_image}
                                          style={{ width: 42, height: 42 }}
                                        />
                                      </CTableDataCell>

                                      <CTableDataCell>
                                        <div>
                                          {item.first_name +
                                            " " +
                                            item.last_name}
                                        </div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <div>{item.phone}</div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <div>{item.email}</div>
                                      </CTableDataCell>
                                      {selectedType == "Verified Drivers" && (
                                        <CTableDataCell>
                                          <div>
                                            {item?.defaultVehicle
                                              ?.vehicle_model || "Not Selected"}
                                          </div>
                                        </CTableDataCell>
                                      )}
                                      {selectedType == "Verified Drivers" && (
                                        <CTableDataCell>
                                          <div>
                                            {item?.defaultVehicle
                                              ?.vehicle_number ||
                                              "Not Selected"}
                                          </div>
                                        </CTableDataCell>
                                      )}
                                      {/* <CTableDataCell>
                            <div>{item.joiningdate}</div>
                          </CTableDataCell> */}

                                      {/* <CTableDataCell>
                                  <div>Delhi to Chd</div>
                                </CTableDataCell> */}
                                      {selectedType == "Verified Drivers" && (
                                        <CTableDataCell>
                                          <div
                                            style={{
                                              background,
                                              padding: "8px",
                                              borderRadius: "10px",
                                              fontWeight: "normal",
                                              color: "#fff",
                                              width: "100px",
                                              margin: "0 auto",
                                            }}
                                          >
                                            {status}
                                          </div>
                                        </CTableDataCell>
                                      )}
                                      {(selectedType == "Verified Drivers" ||
                                        selectedType ==
                                          "Unverified Drivers") && (
                                        <CTableDataCell>
                                          <div
                                            style={{
                                              background:
                                                "linear-gradient(90deg, #FF6A00 0%, #FFA625 100%)",
                                              padding: "8px",
                                              borderRadius: "10px",
                                              fontWeight: "normal",
                                              color: "#fff",
                                              width: "100px",
                                              margin: "0 auto",
                                            }}
                                          >
                                            <a
                                              target="_blank"
                                              href={
                                                item?.driver_documents || ""
                                              }
                                              style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                                fontWeight: "normal",
                                              }}
                                            >
                                              View
                                            </a>
                                          </div>
                                        </CTableDataCell>
                                      )}
                                      {role == "super" && (
                                        <CTableDataCell className="d-flex action-icons driver-icons">
                                          <div
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              navigate(
                                                `/super-admin/driver/editdriver/${item._id}`
                                              );
                                            }}
                                          >
                                            <img src={editiconimg} />
                                          </div>

                                          <CButton
                                            id="delete_driver_btn"
                                            onClick={() => {
                                              setDeleteVisible(!deleteVisible);
                                              setSelectedId(item._id);
                                            }}
                                          >
                                            <img src={deleteiconimg} />
                                          </CButton>
                                          {selectedType ==
                                            "Unverified Drivers" && (
                                            <>
                                              <button
                                                className="ms-2"
                                                onClick={() => {
                                                  setVerify(true);
                                                  setSelectedId(item._id);
                                                }}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22"
                                                  height="22"
                                                  fill="currentColor"
                                                  class="bi bi-patch-check-fill verify-icon"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                                </svg>
                                              </button>
                                              <button
                                                className="ms-2"
                                                onClick={() => {
                                                  setReject(true);
                                                  setSelectedId(item._id);
                                                }}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="22"
                                                  height="22"
                                                  fill="currentColor"
                                                  class="bi bi-x-circle-fill text-danger"
                                                  viewBox="0 0 16 16"
                                                >
                                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                                </svg>
                                              </button>
                                            </>
                                          )}
                                        </CTableDataCell>
                                      )}

                                      {role != "super" && (
                                        <CTableDataCell className="d-flex action-icons driver-icons">
                                          <CButton
                                            id="delete_driver_btn"
                                            onClick={() => {
                                              favoriteDriverHandler(item._id);
                                            }}
                                          >
                                            {!user.favoriteDrivers.includes(
                                              item._id
                                            ) ? (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="red"
                                                class="bi bi-star"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                              </svg>
                                            ) : (
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="red"
                                                class="bi bi-star-fill"
                                                viewBox="0 0 16 16"
                                              >
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                              </svg>
                                            )}
                                          </CButton>
                                        </CTableDataCell>
                                      )}
                                      {role == "super" && (
                                        <CTableDataCell className="">
                                          <Link
                                            to={`/super-admin/driver/driver-vehicle/${item._id}`}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              fill="currentColor"
                                              class="bi bi-eye-fill"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                          </Link>
                                        </CTableDataCell>
                                      )}
                                    </CTableRow>
                                  );
                                })
                              : ""}
                          </CTableBody>
                        </CTable>
                      ) : (
                        <EmptyData />
                      )}
                      {data?.length > 0 ? (
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
                            <button onClick={() => handleNextPage()}>
                              Next
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}

                  {/* deletedriverpopup */}

                  <CModal
                    alignment="center"
                    visible={deleteVisible}
                    onClose={() => setDeleteVisible(false)}
                  >
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
                              <p>You want to delete this driver ?</p>
                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                              <CButton
                                className="delete_popup"
                                onClick={() => {
                                  deleteDriverHandler(selectedId);
                                }}
                              >
                                Delete
                              </CButton>
                              <CButton
                                onClick={() => setDeleteVisible(false)}
                                className="cancel_popup"
                              >
                                Cancel
                              </CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>

                  <CModal
                    alignment="center"
                    visible={verify}
                    onClose={() => setVerify(false)}
                  >
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup">
                            <CCardBody>
                              {/* <img src={deletepopup} alt="danger" /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                fill="currentColor"
                                class="bi bi-patch-check-fill verify-icon2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                              </svg>
                              <h2>Are you Sure</h2>
                              <p>You want to verify this Driver ?</p>
                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                              <CButton
                                className="delete_popup"
                                onClick={() => {
                                  verifyDriverHandler(selectedId);
                                }}
                              >
                                verify
                              </CButton>
                              <CButton
                                onClick={() => {
                                  setVerify(false);
                                }}
                                className="cancel_popup"
                              >
                                Cancel
                              </CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>

                  <CModal
                    alignment="center"
                    visible={reject}
                    onClose={() => setReject(false)}
                  >
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup">
                            <CCardBody>
                              {/* <img src={deletepopup} alt="danger" /> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="45"
                                height="45"
                                fill="currentColor"
                                class="bi bi-patch-check-fill verify-icon2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                              </svg>
                              <h2>Are you Sure</h2>
                              <p>You want to reject this Driver ?</p>
                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                              <CButton
                                className="delete_popup"
                                onClick={() => {
                                  handleRejectDriver(selectedId);
                                }}
                              >
                                Reject
                              </CButton>
                              <CButton
                                onClick={() => {
                                  setReject(false);
                                }}
                                className="cancel_popup"
                              >
                                Cancel
                              </CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>

                  {/* enddeletedriverpopup */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListOfDrivers;
