import React, { useState, useEffect } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from "@coreui/react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import { getTrip, getTripSubAdmin } from "../../../utils/api";
import refreshImg from "../../../assets/images/refresh.png";
import crossImg from "../../../assets/images/cross-arrow.png";
import downarrowImg from "../../../assets/images/down-arrow.png";
import editiconimg from "../../../assets/images/editicon.png";
import deleteiconimg from "../../../assets/images/deleteicon.png";
import moment from "moment";
import PulseLoader from "react-spinners/PulseLoader";
import { date } from "yup";
import EmptyData from "../../EmptyData";

const BookingRequestTable = () => {
  const [bookingTrip, setBookingTrip] = useState([]);
  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = bookingTrip?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(bookingTrip?.length / recordPage);
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
    setLoader(true);
    getTripSubAdmin("Booked").then((res) => {
      console.log(res.result, "vehicle");
      if (res.code === 200) {
        setBookingTrip(res.result);
      }
      setLoader(false);
    });
  }, []);

  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Booked Trip</h1>
                <div class="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    {/* <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>Upcoming Trips</h2>
                      </div>
                      <div className="right-trip-content">
                        <div className="right-trip-content">
                          <img src={refreshImg} />
                          <img src={downarrowImg} />
                          <img src={crossImg} />
                        </div>
                      </div>
                    </div> */}
                  </div>
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
                      {data.length == 0?<EmptyData/>:<CTable align="middle" className="mb-0" hover responsive>
                        <CTableHead>
                          <CTableRow>
                            {/* <CTableHeaderCell className="text-center">
  <CIcon icon={cilPeople} />
</CTableHeaderCell> */}
                            <CTableHeaderCell className="text-center">
                              Sr No.
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip ID
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Passenger Count
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip From
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip To
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Allocated Driver
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Start Time
                            </CTableHeaderCell>
                            {/* <CTableHeaderCell className="text-center">
                              Action
                            </CTableHeaderCell> */}
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {data?.length
                            ? data.map((item, index) => (
                                <CTableRow
                                  className="text-center"
                                  v-for="item in tableItems"
                                  key={index}
                                >
                                  <CTableDataCell>
                                    <div>{firstIndex + index + 1}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.trip_id}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.passenger_detail.length}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.trip_from.address.slice(0,20) + `${item.trip_from.address.length<21?"":"..."}`}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.trip_to.address.slice(0,20) + `${item.trip_to.address.length<21?"":"..."}`}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item.driver_name}</div>
                                  </CTableDataCell>

                                  <CTableDataCell>
                                    <div>
                                      {moment(item.pickup_date_time).format(
                                        "MMMM Do YYYY, h:mm a"
                                      )}
                                    </div>
                                  </CTableDataCell>
                                  {/* <CTableDataCell className="d-flex action-icons booking-icons">
                                    <div>
                                      <img src={editiconimg} alt="edit"/>
                                    </div>
                                    <div>
                                      <img src={deleteiconimg} alt="delet"/>
                                    </div>
                                  </CTableDataCell> */}
                                </CTableRow>
                              ))
                            : ""}
                        </CTableBody>
                      </CTable>}
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
                    :""
                     }
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingRequestTable;