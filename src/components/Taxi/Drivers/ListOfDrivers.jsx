import React, { useEffect, useState } from "react";
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
  CCardBody
} from '@coreui/react'
import AppHeader from "../../TopBar/AppHeader";
import editiconimg from "../../../assets/images/editicon.png";
import deleteiconimg from "../../../assets/images/deleteicon.png";
import PulseLoader from "react-spinners/PulseLoader";
import deletepopup from '../../../assets/images/deletepopup.png'
import { deleteCompany, deleteDriver, getDriver } from "../../../utils/api";
import SuperSideBar from "../SiderNavBar/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import EmptyData from "../../EmptyData";
import SuperAdminSideBar from "../../SuperAdmin/Sidebar/SideBar";

const ListOfDrivers = ({role}) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const navigate = useNavigate();
const [selectedId, setSelectedId ] = useState(null);
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

  useEffect(() => {
    setLoader(true);
    getDriver(role).then((res) => {
      console.log(res.result, "vehicle");
      if (res?.code === 200) {
        setDriver(res.result);
      }
      setLoader(false);
    });
  }, []);
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

  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
           {
            role == 'super'?<SuperAdminSideBar/> : <SuperSideBar />

           } 

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Driver's List</h1>
                <div class="active-trip-outer">
                  {loader ? (
                    <>
                      <div
                        className=" d-flex justify-content-center align-items-center"
                        style={{ height: 400 }}
                      >
                        <PulseLoader
                          color="#FFD04E"
                          loading={true}
                          margin={4}
                          size={60}
                          speedMultiplier={0.5}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                     { data?.length > 0 ? <CTable align="middle" className="mb-0" hover responsive>
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
                            <CTableHeaderCell className="text-center">
                              Address
                            </CTableHeaderCell>
                            {/* <CTableHeaderCell className="text-center">
                              Trips
                            </CTableHeaderCell> */}
                            <CTableHeaderCell className="text-center">
                              Status
                            </CTableHeaderCell>
                            {role=="super" && <CTableHeaderCell className="text-center">
                              Action
                            </CTableHeaderCell>}
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {data?.length > 0
                            ? driver.map((item, index) => {
                              let status = "Offline";
                              if (item.status) {
                                status = "Online"
                                if (!item.is_available) {
                                  status = "In a ride"
                                }
                              }
                              console.log(item._id, " ", status)
                              let background = "linear-gradient(90deg, #FF5370 0%, #FF869A 100%)"
                              if (status == "Online") background = "linear-gradient(90deg, #05D41F 0%, rgba(38, 228, 15, 0.9) 100%)"
                              else if (status == "In a ride") background = "linear-gradient(90deg, #FF6A00 0%, #FFA625 100%)"
                              return (
                                <CTableRow className="text-center" key={index}>
                                  <CTableDataCell className="text-center profle-pic">
                                    <CAvatar
                                      size="md"
                                      alt="img"
                                      src={item.profile_image}
                                      style={{ width: 42, height: 42 }}
                                    />
                                  </CTableDataCell>

                                  <CTableDataCell>
                                    <div>{item.first_name}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.phone}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.email}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.address_1}</div>
                                  </CTableDataCell>
                                  {/* <CTableDataCell>
                            <div>{item.joiningdate}</div>
                          </CTableDataCell> */}

                                  {/* <CTableDataCell>
                                  <div>Delhi to Chd</div>
                                </CTableDataCell> */}
                                  <CTableDataCell>
                                    <div 
                                      style={{
                                        background,
                                        padding: "8px",
                                        borderRadius: "10px",
                                        fontWeight: "normal",
                                        color: '#fff',
                                        width: '100px',
                                        margin: '0 auto',
                                      }}                                    
                                    >{status}</div>
                                  </CTableDataCell>
                                  {role == "super" && <CTableDataCell className="d-flex action-icons driver-icons">
                                    <div style={{
                                      cursor: "pointer"
                                    }

                                    }
                                      onClick={() => {
                                        navigate(`/super-admin/driver/editdriver/${item._id}`);
                                      }
                                      }
                                    ><img src={editiconimg} /></div>

                
                                    <CButton id="delete_driver_btn" onClick={() => {
                                      setDeleteVisible(!deleteVisible)
                                    setSelectedId(item._id)
                                  }
                                    
                                    }><img src={deleteiconimg} /></CButton>
                                  </CTableDataCell>}
                                </CTableRow>
                              )
                            }) : ""}
                        </CTableBody>

                      </CTable>: <EmptyData/>}
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

                    </>)
                  }

                  {/* deletedriverpopup */}


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
                              <p>You want to delete this driver ?</p>

                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">


                              <CButton className="delete_popup"
onClick={()=>{
  deleteDriverHandler(selectedId)
}}
                              >Delete</CButton>
                              <CButton className="cancel_popup">
                                Cancel</CButton>
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
