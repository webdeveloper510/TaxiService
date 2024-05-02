import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

import SuperSideBar from "../SiderNavBar/Sidebar";
import { getTrip } from "../../../utils/api";
import moment from "moment";
import EmptyData from "../../EmptyData";
import AppLoader from "../../AppLoader";
import { Link } from "react-router-dom";

const tableExample = [
  {
    Srnum: "1",
    tripid: "123",
    drivername: "Rajesh",
    tripfrom: "mohali",
    tripto: "chandigarh",
    time: "10:20AM",
  },
];
const SuperCancelledTrip = () => {

  const [activeTrip, setActiveTrip] = useState([]);

  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const [dateFilter, setDateFilter] = useState("all"); // State to store selected date filter

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = activeTrip?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(activeTrip?.length / recordPage);
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
    getTrip("Canceled",search,dateFilter).then((res) => {
      console.log(res.result, "vehicle");
      if (res?.code === 200) {
        setActiveTrip(res.result);
      }
      setLoader(false);
    });
  }, [search,dateFilter]);
  return (
    <>

      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SuperSideBar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">

              <AppHeader />
              <div className="body flex-grow-1 px-3">

                <h1 className="heading-for-every-page">Cancelled Trips</h1>
                <div className="company-cancelled-trips">
                <div className="serach-left" id="cancelled-trip-search">
                <MDBInputGroup>
                <MDBInput placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
  
    </MDBInputGroup>
    </div></div>
                <div className="active-trip-outer">
                <div className="filter-right">
        <select
  value={dateFilter}
  onChange={handleDateFilterChange}
  style={{
    backgroundColor: '#fff2cf',
    color: 'black', // You can change the color to match your design
    border: '1px solid #ccc', // You may adjust the border color and width
    borderRadius: '5px', // You can adjust the border radius as needed
    padding: '5px', // You can adjust the padding as needed
    fontWeight: "bold"
  }}
>
  <option value="all">All</option>
  <option value="this_week">This Week</option>
  <option value="this_month">This Month</option>
  <option value="this_year">This Year</option>
</select>

        </div>

                  {/* <div className="trips-head d-flex justify-content-between">
                   
                    <div className="box-shd d-flex justify-content-between">
                    
                      <div className="left-trip-content">
                       <h2>List of Pending Trips</h2>
                        
                      </div>
                    
                  
                     
                    </div>
                  
                  </div> */}

                  {loader ? <AppLoader /> : <>
                    {data.length == 0 ? <EmptyData /> :
                      <CTable align="middle" className="mb-0" hover responsive>

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

                            {/* <CTableHeaderCell className="text-center">
                        Driver Name
                      </CTableHeaderCell> */}

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
                            <CTableHeaderCell className="text-center">View Ride</CTableHeaderCell>



                          </CTableRow>

                        </CTableHead>

                        <CTableBody>

                          {data?.map((item, index) => (
                            <CTableRow
                              className="text-center"
                              v-for="item in tableItems"
                              key={item._id}
                            >

                              <CTableDataCell>

                                <div>{firstIndex + index + 1}</div>
                              </CTableDataCell>
                              <CTableDataCell>

                                <div>{item?.company_name}</div>
                              </CTableDataCell>

                              <CTableDataCell>

                                <div>{item.trip_id}</div>
                              </CTableDataCell>
                              {/* 
                        <CTableDataCell>

                          <div>{item.driver_name?item.driver_name:"Not assigned"}</div>
                        </CTableDataCell> */}

                              <CTableDataCell>

                                <div>{item?.trip_from?.address?.slice(0, 20) + `${item?.trip_from?.address?.length < 21 ? "" : "..."}`}</div>
                              </CTableDataCell>

                              <CTableDataCell>

                                <div>{item.trip_to.address?.slice(0, 20) + `${item?.trip_to?.address?.length < 21 ? "" : "..."}`}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                    <div>
                                      {item?.comment}
                                    </div>
                                  </CTableDataCell>
                              <CTableDataCell>
                                <div>{moment(item.pickup_date_time).format("MMM Do YYYY , h:mm a")}</div>

                              </CTableDataCell>
                              <CTableDataCell>
                        <div className="view_details_btn">
                        <Link to={`/trips/view-trip-details/${item._id}`}>
                          View Details
                          </Link>
                          </div>
                      </CTableDataCell>   


                            </CTableRow>
                          ))}

                        </CTableBody>

                      </CTable>
                    }
                  </>}
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

export default SuperCancelledTrip;
