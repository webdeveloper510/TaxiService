import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";

import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import locationimg from '../../../assets/images/location.png';
import { getRecentTrip, getTrip } from "../../../utils/api";
import moment from "moment";
import SuperAdminSideBar from "../Sidebar/SideBar";
import EmptyData from "../../EmptyData";
import AppLoader from "../../AppLoader";
import Dropdown from 'react-bootstrap/Dropdown';
import filterImg from '../../../assets/images/filter-icon.png'
import { tripEnum } from "../../../utils/saticData";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";


const SuperRecentTrips = () => {
  let [query, setQuery] = useSearchParams();
  const status = query.get("filter");
  const [filterData, setFilterData] = useState([]);
  // const [selectedValue, setSelectedValue] = useState("All"); // Initial selected valu

  const handleSelect = (eventKey) => {
    setSelectedType(eventKey); // Update the selected value when an item is selected
  };
  const [selectedType, setSelectedType] = useState(status || "All");
  const [pendinTrip, setPendingTrip] = useState([])
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = filterData?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filterData?.length / recordPage);
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
  const [search, setSearch] = useState("")
  useEffect(() => {
    if (!selectedType || selectedType === "All") setFilterData(pendinTrip);
    else {
      console.log("selectedType in else: ", selectedType)
      setFilterData(pendinTrip.filter(i => i.trip_status == selectedType))
    }
  }, [selectedType])
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
    setLoader(true)
    getRecentTrip(true, search).then(res => {

      if (res?.code == 200 && res?.result) {
        setPendingTrip(res?.result)
        // setFilterData(res?.result)
        // console.log("Status is: ", status)
        // if (!status) setFilterData(res?.result);
        // else {
        //   console.log("status in else: ", status)
        //   setFilterData(res?.result.filter(i => i.trip_status == status))
        // }
        if (!selectedType || selectedType === "All") setFilterData(res?.result);
        else {
          console.log("selectedType in else: ", selectedType)
          setFilterData(res?.result.filter(i => i.trip_status == selectedType))
        }
      }
    }).finally(() => { setLoader(false) })
  }, [search])
  // useEffect(() => {
  //   if (status) {
  //     setSelectedType(status)
  //     // setLoader(true);
  //     //   getRecentTrip(true, search).then(res => {

  //     //     if (res?.code == 200 && res?.result) {
  //     //       setPendingTrip(res?.result)
  //     //       // setFilterData(res?.result)
  //     //       console.log("Status is: ", status)
  //     //       if (!status) setFilterData(res?.result);
  //     //       else {
  //     //         console.log("status in else: ", status)
  //     //         setFilterData(res?.result.filter(i => i.trip_status == status))
  //     //       }
  //     //     }
  //     //   }).finally(() => { setLoader(false) })
  //   }
  // }, [status])
  return (
    <>



      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SuperAdminSideBar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">All Trips</h1>




                <div class="filter-outer">
                  <div className="serach-left" id="recent-trip-search">
                    <MDBInputGroup>
                      <MDBInput placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

                    </MDBInputGroup></div>
                  <div className="filter-right">

                    <Dropdown onSelect={handleSelect}>
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src={filterImg} />
                        {selectedType}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {tripEnum.map((item, i) => {
                          return <Dropdown.Item key={i} eventKey={item}
                            onClick={() => {
                              setSelectedType(item)
                            }}
                          >{item}</Dropdown.Item>
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                {loader ? <AppLoader /> :

                  <div class="active-trip-outer">
                    <div className="trips-head d-flex justify-content-between">

                    </div>


                    {data?.length > 0 ? <CTable align="middle" className="mb-0 table-container" hover responsive>

                      <CTableHead>

                        <CTableRow>
                          {/* <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell> */}
                          <CTableHeaderCell className="text-center">S. No.</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Trip ID</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Customer</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">
                            Comment
                          </CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Time</CTableHeaderCell>
                          {/* <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell> */}
                          <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">View Ride</CTableHeaderCell>

                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {data?.map((item, index) => {
                          const status = item.trip_status;
                          let background = "#067A88"
                          if (status === 'Active') background = "linear-gradient(90deg, #FF6A00 0%, #FFA625 100%) "
                          else if (status === 'Accepted') background = 'linear-gradient(90deg, #FF6A00 0%, #FFA625 100%)'
                          else if (status === 'Booked') background = 'linear-gradient(90deg, #FF5370 0%, #FF869A 100%)'
                          else if (status === 'Completed') background = "linear-gradient(90deg, #05D41F 0%, rgba(38, 228, 15, 0.9) 100%)"
                          else if (status === 'Canceled') background = 'red'

                          return (
                            <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                              <CTableDataCell >
                                <div>{firstIndex + index + 1}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{item.series_id}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{item.company_name}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{item.trip_from?.address.length < 20 ? item.trip_from?.address : item.trip_from?.address.slice(0, 18) + "..."}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{item.trip_to?.address.length < 20 ? item.trip_to?.address : item.trip_to?.address.slice(0, 18) + "..."}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>
                                  {item?.comment}
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{moment(item.pickup_date_time).format("MMM Do YYYY")}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{moment(item.pickup_date_time).format("h:mm a")}</div>
                              </CTableDataCell>
                              {/* <CTableDataCell>
                  <div>{item.vehicle_type}</div>
                </CTableDataCell>                    */}
                              <CTableDataCell className="text-center location-icons">
                                <span style={{
                                  background,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "8px",
                                  borderRadius: "8px",
                                  fontWeight: "normal",
                                  color: "#fff",
                                  width: '100px',
                                  margin: '0 auto',
                                }}>{status}</span>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div className="view_details_btn">
                                  <Link to={`/trips/view-trip-details/${item._id}`}>
                                    View Details
                                  </Link>
                                </div>
                              </CTableDataCell>
                            </CTableRow>

                          )
                        })}
                      </CTableBody>
                    </CTable> : <EmptyData />}

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


                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

    </>
  );
};

export default SuperRecentTrips; 