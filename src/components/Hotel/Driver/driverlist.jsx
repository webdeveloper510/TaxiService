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
} from '@coreui/react'
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import PulseLoader from "react-spinners/PulseLoader";
import { getDriver } from "../../../utils/api";
import AppLoader from "../../AppLoader";
import EmptyData from "../../EmptyData";


const DriverList = () => {


  const [driver, setDriver] = useState([])
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
    setLoader(true)
    getDriver().then(res => {
      console.log(res.result, 'vehicle')
      if (res?.code === 200) {
        setDriver(res.result)
      }
      setLoader(false)
    })
  }, [])

  return (
    <>

      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">List of all Drivers </h1>
               <div class="active-trip-outer">
                  {
                    loader ?<AppLoader/> : (<>
                     {data?.length > 0 ? <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>
                      
                        <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Mobile No.</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                        {/* <CTableHeaderCell className="text-center">Trips</CTableHeaderCell> */}
                        <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                        {/* <CTableHeaderCell className="text-center">Action</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data?.length ?  data.map((item, index) => 
                      {
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

                        <CTableRow className="text-center"  key={index}>

                          <CTableDataCell className="text-center profle-pic">
                            <CAvatar size="md" alt='img' src={item.profile_image} style={{width:42 , height:42}} />
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
                                      }}                                    
                                    >{status}</div>
                          </CTableDataCell>
                          {/* <CTableDataCell className="d-flex action-icons driver-icons">
                            <div><img src={editiconimg} /></div>
                            <div><img src={deleteiconimg} /></div>
                          </CTableDataCell> */}
                        </CTableRow>
                      )}) :  ""}
                    </CTableBody>
                  </CTable>:<EmptyData/>}
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
                    </>)
                  }
                

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>


    </>
  );
};

export default DriverList; 