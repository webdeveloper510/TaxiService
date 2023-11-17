import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import locationimg from "../../../assets/images/location.png";
import refreshImg from "../../../assets/images/refresh.png";
import crossImg from "../../../assets/images/cross-arrow.png";
import downarrowImg from "../../../assets/images/down-arrow.png";
import moment from "moment";
//import background from '../assets/images/heroimg.png';
import * as geolib from "geolib";
import { getTrip, getTripSubAdmin } from "../../../utils/api";
//import PulseLoader from "react-spinners/PulseLoader";
import { PulseLoader } from "react-spinners";
import EmptyData from "../../EmptyData";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
const CompletedTrip = () => {
  const [completeTrip, setCompleteTrip] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = completeTrip?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(completeTrip?.length / recordPage);
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
  const [search,setSearch] = useState("")

  useEffect(() => {
    setLoader(true);
    getTripSubAdmin("Completed",search).then((res) => {
      console.log(res.result, "vehicle");
      if (res?.code === 200) {
        setCompleteTrip(res.result);
      }
      setLoader(false);
    });
  }, [search]);

  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 className="heading-for-every-page">Completed Trips </h1>
                <div className="company-complete-trips">
                <div className="serach-left" id="complete-trip-search">
                <MDBInputGroup>
                <MDBInput placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
  
    </MDBInputGroup>
    </div>
	</div>
                <div className="active-trip-outer" id="completed-trips">
                  <div className="trips-head d-flex justify-content-between">
                    {/* <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                         <h2> List of Complete Trips</h2> 
                      </div>
                      <div className="right-trip-content">
                        <img src={refreshImg} />
                        <img src={downarrowImg} />
                        <img src={crossImg} />
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
                    <div className="table-container">

                      {data?.length==0?<EmptyData/>:
                      <CTable align="middle" className="mb-0 test" hover responsive>
                        <CTableHead>
                          <CTableRow>
                            {/* <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell> */}
                            <CTableHeaderCell className="text-center">
                              S. No.
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Trip ID
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Driver Name
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
                              Start Time
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              End Time
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Distance
                            </CTableHeaderCell>
                            {/* <CTableHeaderCell className="text-center">Fare</CTableHeaderCell> */}
                            <CTableHeaderCell className="text-center">
                              View Route
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {data?.length
                            ? data.map((item, index) => (
                                <CTableRow
                                  className="text-center"
                                  v-for="item in tableItems"
                                  key={item._id}
                                >
                                  <CTableDataCell>
                                    <div>{firstIndex + index + 1}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item?.trip_id}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item?.driver_name}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item?.trip_from?.address?.slice(0,20) + `${item?.trip_from?.address?.length<21?"":"..."}`}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{item?.trip_to?.address?.slice(0,20) + `${item?.trip_to?.address?.length<21?"":"..."}`}</div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>
                                      {item?.comment}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>
                                      {moment(item?.pickup_date_time)?.format(
                                        "MMMM Do YYYY, h:mm a"
                                      )}
                                    </div>
                                  </CTableDataCell>

                                  <CTableDataCell>
                                    <div>
                                      {moment(item?.pickup_date_time)?.format(
                                        "MMMM Do YYYY, h:mm a"
                                      )}
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div>{`${(
                                      geolib.getDistance(
                                        {
                                          latitude: item?.trip_from?.log,
                                          longitude: item?.trip_from?.lat,
                                        },
                                        {
                                          latitude: item?.trip_to?.log,
                                          longitude: item?.trip_to?.lat,
                                        }
                                      ) * 0.00062137
                                    ).toFixed(2)} Miles`}</div>
                                  </CTableDataCell>
                                  {/* <CTableDataCell>
                  <div>{item.fare}</div>
                </CTableDataCell>               */}
                                  <CTableDataCell className="text-center location-icons">
                                    <div>
                                      <img src={locationimg} />
                                    </div>
                                  </CTableDataCell>
                                </CTableRow>
                              ))
                            : ""}
                        </CTableBody>
                      </CTable>}</div>
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

export default CompletedTrip;
