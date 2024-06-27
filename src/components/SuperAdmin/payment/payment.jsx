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
import { getTransaction } from "../../../utils/api";
import moment from "moment";
import SuperAdminSideBar from "../Sidebar/SideBar";
import EmptyData from "../../EmptyData";
import AppLoader from "../../AppLoader";

import { MDBRow } from "mdb-react-ui-kit";

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
  const [allTrans, setAllTrans] = useState([]);
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
    "totalEarningFromYear": 0,
    "totalBalance": 0,
  })
  const [dateFilter, setDateFilter] = useState("all"); // State to store selected date filter

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };
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
    setCurrentPage(1);
 setPageLimit(3);
  setMaxPage(3);
  setMinPage(0);
    
    setLoader(true);
    getTransaction(role=="super"?"SUPER_ADMIN":"COMPANY")
      .then((res) => {
        if (res?.code == 200) {
          setEarning(res)
          console.log("🚀 ~ .then ~ res?.result:", res?.result)
          if(type == 'transaction'){
            setTrans(res?.allDriverTrans || [])
            setAllTrans(res?.allDriverTrans || [])
          }else{
            setTrans(res?.allSuperTrans || [])
            setAllTrans(res?.allSuperTrans || [])
          }

        }
      })
      .finally(() => {
        setLoader(false);
      });
    
    
  }, [type,role]);
  const filterByDate = (startDate, endDate) => {
    // Filter transactions based on date range
    const filteredData = allTrans.filter(item => {
      const createdAt = moment(item.createdAt);
      return createdAt.isBetween(startDate, endDate, 'days', '[]');
    });
    return filteredData;
  };

  const handleFilterThisWeek = () => {
    const startDate = moment().startOf('week');
    const endDate = moment().endOf('week');
    const filteredData = filterByDate(startDate, endDate);
    setTrans(filteredData);
  };

  const handleFilterThisMonth = () => {
    const startDate = moment().startOf('month');
    const endDate = moment().endOf('month');
    const filteredData = filterByDate(startDate, endDate);
    setTrans(filteredData);
  };

  const handleFilterThisYear = () => {
    const startDate = moment().startOf('year');
    const endDate = moment().endOf('year');
    const filteredData = filterByDate(startDate, endDate);
    setTrans(filteredData);
  };
  const filterDataByDate = () => {
    switch (dateFilter) {
      case "this_week":
        return handleFilterThisWeek();
      case "this_month":
        return handleFilterThisMonth();
      case "this_year":
        return handleFilterThisYear();
      default:
        return setTrans(allTrans)
    }
  };
useEffect(()=>{
  filterDataByDate()
},[dateFilter])
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            {role=="taxi"?  <SuperSideBar/> : <SuperAdminSideBar />}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              {!loader ? <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">
                  {type == "transaction"? "Earnings" : "Payment" }
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

                        <div style={{textDecoration:"none"}}>
                          <h5 style={{textDecoration:"none"}}>Total Earning</h5>
                          <span style={{textDecoration:"none"}}>{   parseFloat( Math.floor(earning?.totalEarning * 100) / 100)
                          } €</span>
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
                          <span>{
                          (Math.round(earning?.totalEarningLastSevenDays* 100) / 100).toFixed(2)} €</span>
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
                          <span>{(Math.floor(earning?.totalEarningFromMonth* 100) / 100)} €</span>
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
                          
                          <span>{
                          (Math.floor(earning?.totalEarningFromYear* 100) / 100)} €</span>
                          <hr></hr>
                       
                        </div>
                      </MDBCardText>
                    </MDBCol>
                  </MDBCardBody>
                </MDBCard>
                </MDBCol>
                </MDBRow>
}              
{type!="transaction" && role=="taxi" &&  <MDBRow>
                    <MDBCol sm='6' className="booked-trips all_same my-3">
                <MDBCard>
                  <MDBCardBody className="d-flex booked-trips-card ">
                    <MDBCol sm="4" className="booked-trip-icon">
                      <MDBCardImage position="top" alt="..." src={trips} />
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>
                        <div style={{textDecoration:"none"}}>
                          <h5 style={{textDecoration:"none"}}>Total Balance</h5>
                          <span style={{textDecoration:"none"}}>{(Math.floor(earning?.totalBalance* 100) / 100)} €</span>
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
                          <h5>Total Money received</h5>
                          <span>{
                          (Math.floor(trans.reduce((acc,curr)=>{return acc+curr?.amount},0)* 100) / 100)} €</span>
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
                
                  <div className="filter-right">
                   
                  </div>
                </div>
                {loader ? (
                  <AppLoader />
                ) : (
                  <div class="active-trip-outer">
                    <div className="trips-head d-flex justify-content-between"></div>
                    <div className="filter-outer">
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
      </div>

                    {data?.length > 0 ? (
                      <CTable
                        align="middle"
                        className="mb-0 table-container"
                        hover
                        responsive
                      >
                        <CTableHead>
                          <CTableRow>
                           
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
                                    {
                                    (Math.round(item?.amount * 100) / 100).toFixed(2)
                                    } €
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>
                                    {moment(item.createdAt).format("MMM Do YYYY h:mm a")}
                                  </div>
                                </CTableDataCell>
                              
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
              </div>: <AppLoader/>}
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default SuperPayment;
