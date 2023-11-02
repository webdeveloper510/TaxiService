import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
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
  CCol,
  CRow,
  CCard,
} from "@coreui/react";

import refreshImg from "../../../assets/images/refresh.png";
import crossImg from "../../../assets/images/cross-arrow.png";
import downarrowImg from "../../../assets/images/down-arrow.png";
//import background from '../assets/images/heroimg.png';
//import accepticonimg from '../../../assets/images/accept.png'
import deleteiconimg from "../../../assets/images/deleteicon.png";
import editicon from "../../../assets/images/editicon.png";
import { deleteTrips, getTrip, getTripSubAdmin } from "../../../utils/api";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import deletepopup from "../../../assets/images/deletepopup.png";
import EmptyData from "../../EmptyData";
import { toast } from "react-toastify";

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
const PendingTrip = () => {
  const [pendinTrip, setPendingTrip] = useState([]);
  const [visible, setVisible] = useState(false);

  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = pendinTrip?.slice(firstIndex, lastIndex);
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
  if (data.length > maxPage) {
    pageIncreament = <li onClick={handleNextPage}>&hellip;</li>;
  }

  useEffect(() => {
    getpendingtrip();
  }, []);

  const getpendingtrip = () => {
    setLoader(true);
    getTripSubAdmin("Pending").then((res) => {
      console.log(res.result, "pending trip vehicle");
      if (res.code === 200) {
        setPendingTrip(res.result);
      }
      setLoader(false);
    });
  };

  const handleDelet = (id) => {
    setVisible(id);
  };

  const handleDeletItem = (id) => {
    deleteTrips(id)
      .then((res) => {
        console.log("delete success", res);
        if (res.code == 200) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 1000,
          });
          setVisible(false);
          const newTrips = pendinTrip?.filter((item) => {
            return item._id != id;
          });
          setPendingTrip(newTrips);
          // getpendingtrip()
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 className="heading-for-every-page">Pending Trips</h1>
                <div className="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    {/* <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                         <h2>List of Pending Trips</h2> 
                      </div>
                      <div className="right-trip-content">
                        <img src={refreshImg} />
                        <img src={downarrowImg} />
                        <img src={crossImg} />
                      </div>
                    </div> */}
                  </div>
                  {loader ? (
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
                  ) : (
                    <>
                      {data?.length == 0 ? (
                        <EmptyData />
                      ) : (
                        <CTable
                          align="middle"
                          className="mb-0"
                          hover
                          responsive
                        >
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell className="text-center">
                                Sr.No
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
                                Time
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Action
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>

                          <CTableBody>
                            {data?.length > 0
                              ? data?.map((item, index) => (
                                <CTableRow
                                  className="text-center"
                                  v-for="item in tableItems"
                                  key={index}
                                >
                                  <CTableDataCell>
                                    <div>{index + 1}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.trip_id}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.vehicle_type}</div>
                                  </CTableDataCell>

                                  <CTableDataCell>
                                    <div>
                                      {item.trip_from.address.slice(0, 20) +
                                        `${item.trip_from.address.length < 21
                                          ? ""
                                          : "..."
                                        }`}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>
                                      {item.trip_to.address.slice(0, 20) +
                                        `${item.trip_to.address.length < 21
                                          ? ""
                                          : "..."
                                        }`}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>
                                      {moment(item.pickup_date_time).format(
                                        "MMM Do YYYY, h:mm a"
                                      )}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell className="pending-trips-icons">
                                    <div>
                                      <Link
                                        to={`/trips/editpendingtrips/${item._id}`}
                                      >
                                        <CButton className="allocate_accept_driver">
                                          <img src={editicon} alt="img" />
                                        </CButton>
                                      </Link>
                                    </div>
                                    <div className="reject_icon">
                                      <CButton
                                        id="btn_delete_pending_trip"
                                        className="delete_vehilce"
                                        onClick={() => {
                                          handleDelet(item._id);
                                        }}
                                      >
                                        <img src={deleteiconimg} alt="img" />
                                      </CButton>
                                    </div>
                                  </CTableDataCell>
                                </CTableRow>
                              ))
                              : ""}
                          </CTableBody>
                        </CTable>
                      )}
                    </>
                  )}
                 {data?.length > 0 && <div
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
                      <button onClick={() => handlePrePage()}>Previous</button>
                    </div>
                    <div className="previous-page">
                      <ul>
                        {pageNumber}
                        <button className="dots_btn">{pageIncreament}</button>
                      </ul>
                    </div>
                    <div className="next_btn">
                      <button onClick={() => handleNextPage()}>Next</button>
                    </div>
                  </div>}
                </div>
              </div>
            </div>

            {/* StartDeletepopup */}

            <CModal
              alignment="center"
              visible={visible}
              onClose={() => setVisible(false)}
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
                        <p>You want to delete this Trip ?</p>
                      </CCardBody>
                      <div className="delete_vehicle_popup_outer">
                        <CButton
                          className="delete_popup"
                          onClick={() => handleDeletItem(visible)}
                        >
                          Delete
                        </CButton>
                        <CButton
                          className="cancel_popup"
                          onClick={() => setVisible(false)}
                        >
                          Cancel
                        </CButton>
                      </div>
                    </CCard>
                  </CCol>
                </CRow>
              </CModalBody>
            </CModal>

            {/* enddeletepopup */}
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default PendingTrip;