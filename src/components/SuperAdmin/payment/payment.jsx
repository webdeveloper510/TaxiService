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
} from "@coreui/react";
import locationimg from "../../../assets/images/location.png";
import { getRecentTrip, getTransaction, getTrip } from "../../../utils/api";
import moment from "moment";
import SuperAdminSideBar from "../Sidebar/SideBar";
import EmptyData from "../../EmptyData";
import AppLoader from "../../AppLoader";
import Dropdown from "react-bootstrap/Dropdown";
import filterImg from "../../../assets/images/filter-icon.png";
import { tripEnum } from "../../../utils/saticData";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBRow } from "mdb-react-ui-kit";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBCardImage,
} from "mdb-react-ui-kit";
import trips from "../../../assets/images/bookedtrips.png";
import SuperSideBar from "../../Taxi/SiderNavBar/Sidebar";


const SuperPayment = ({type, role}) => {
  
  const [trans, setTrans] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = trans?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(trans?.length / recordPage);
  const number = [...Array(nPage + 1).keys()].slice(1);
  const [earning, setEarning] = useState({
    "totalEarning": 0,
    "totalEarningLastSevenDays": 0,
    "totalEarningFromMonth": 0,
    "totalEarningFromYear": 0
  })
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
    getTransaction(role=="super"?"SUPER_ADMIN":"COMPANY")
      .then((res) => {
        if (res?.code == 200) {
          setEarning(res)
          console.log("🚀 ~ .then ~ res?.result:", res?.result)
          if(type == 'transaction'){
            setTrans(res?.allDriverTrans || [])
          }else{
            setTrans(res?.allSuperTrans || [])
          }

        }
      })
      .finally(() => {
        setLoader(false);
      });
    
    
  }, [type]);

  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            {role=="taxi"?  <SuperSideBar/> : <SuperAdminSideBar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">
                  {type == "transaction"? "Transactions" : "Payment" }
                  </h1>
               {type=="transaction" &&  <MDBRow>
                    <MDBCol sm='6' className="booked-trips all_same my-3">
                <MDBCard>
                  <MDBCardBody className="d-flex booked-trips-card ">
                    <MDBCol sm="4" className="booked-trip-icon">
                      <MDBCardImage position="top" alt="..." src={trips} />
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>
                        <div>
                          <h5>Total Earning</h5>
                          <span>{earning?.totalEarning} €</span>
                          <hr></hr>
                        </div>
                      </MDBCardText>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
                </MDBCol>
                <MDBCol sm='6' className="booked-trips all_same my-3">
                <MDBCard>
                  <MDBCardBody className="d-flex total-earinings">
                    <MDBCol sm="4" className="booked-trip-icon">
                      <MDBCardImage position="top" alt="..." src={trips} />
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>
                        <div>
                          <h5>Last Seven Days Earning</h5>
                          <span>{earning.totalEarningLastSevenDays} €</span>
                          <hr></hr>
                        </div>
                      </MDBCardText>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
                </MDBCol>
                <MDBCol sm='6' className="booked-trips all_same">
                <MDBCard>
                  <MDBCardBody className="d-flex total-earinings">
                    <MDBCol sm="4" className="booked-trip-icon">
                      <MDBCardImage position="top" alt="..." src={trips} />
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>
                        <div>
                          <h5>Current month Earning</h5>
                          <span>{earning?.totalEarningFromMonth} €</span>
                          <hr></hr>
                          
                        </div>
                      </MDBCardText>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
                </MDBCol>
                <MDBCol sm='6' className="booked-trips all_same">
                <MDBCard>
                  <MDBCardBody className="d-flex booked-trips-card">
                    <MDBCol sm="4" className="booked-trip-icon">
                      <MDBCardImage position="top" alt="..." src={trips} />
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>
                        <div>
                          <h5>Current Year Earning</h5>
                          <span>{earning?.totalEarningFromYear} €</span>
                          <hr></hr>
                       
                        </div>
                      </MDBCardText>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
                </MDBCol>
                </MDBRow>
}
                <div class="filter-outer">
                  {/* <div className="serach-left" id="recent-trip-search">
                    <MDBInputGroup>
                      <MDBInput placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

                    </MDBInputGroup></div> */}
                  <div className="filter-right">
                    {/* <Dropdown onSelect={handleSelect}>
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
                    </Dropdown> */}
                  </div>
                </div>
                {loader ? (
                  <AppLoader />
                ) : (
                  <div class="active-trip-outer">
                    <div className="trips-head d-flex justify-content-between"></div>

                    {data?.length > 0 ? (
                      <CTable
                        align="middle"
                        className="mb-0 table-container"
                        hover
                        responsive
                      >
                        <CTableHead>
                          <CTableRow>
                            {/* <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell> */}
                            <CTableHeaderCell className="text-center">
                              S. No.
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                            {type=="transaction"? "Trip ID": "Company ID"} 
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                            {type=="transaction"? "Driver Name": "Company Name"} 
                              
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                            {type=="transaction"? "Commission": "Amount"}  
                            </CTableHeaderCell>
                            <CTableHeaderCell className="text-center">
                              Date And Time
                            </CTableHeaderCell>
                            {/* <CTableHeaderCell className="text-center">
                            Comment
                          </CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">Time</CTableHeaderCell> */}
                            {/* <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell> */}
                            {/* <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">View Ride</CTableHeaderCell> */}
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {data?.map((item, index) => {

                            return (
                              <CTableRow
                                className="text-center"
                                v-for="item in tableItems"
                                key={index}
                              >
                                <CTableDataCell>
                                  <div>{firstIndex + index + 1}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{type=="transaction"?item?.trip?.trip_id: item?.companyData?.company_id}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{type=="transaction" ? item?.from?.first_name + " " + item?.from?.last_name : item?.companyData?.company_name}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>
                                    {item?.amount} €
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>
                                    {moment(item.createdAt).format("MMM Do YYYY h:mm a")}
                                  </div>
                                </CTableDataCell>
                                {/* <CTableDataCell>
                                <div>
                                  {item?.comment}
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{moment(item.pickup_date_time).format("MMM Do YYYY")}</div>
                              </CTableDataCell> */}
                                {/* <CTableDataCell>
                                <div>{moment(item.pickup_date_time).format("h:mm a")}</div>
                              </CTableDataCell> */}
                                {/* <CTableDataCell>
                  <div>{item.vehicle_type}</div>
                </CTableDataCell>                    */}
                                {/* <CTableDataCell className="text-center location-icons">
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
                              </CTableDataCell> */}
                                {/* <CTableDataCell>
                                <div className="view_details_btn">
                                  <Link to={`/trips/view-trip-details/${item._id}`}>
                                    View Details
                                  </Link>
                                </div>
                              </CTableDataCell> */}
                              </CTableRow>
                            );
                          })}
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
                          <button onClick={() => handleNextPage()}>Next</button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default SuperPayment;
