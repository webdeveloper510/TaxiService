import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import { Link } from 'react-router-dom';
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
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { getFare } from "../../../utils/api";



import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import PulseLoader from "react-spinners/PulseLoader";




const FareManagement = () => {

  const [visible, setVisible] = useState(false)
  const [fare, setFare] = useState([])
  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = fare?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(fare?.length / recordPage);
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
    getFare().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setFare(res.result)
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
                <h1 class="heading-for-every-page">Fare List</h1>
                <div class="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        {/* <h2>Fare List </h2> */}
                      </div>
                    </div>
                  </div>
                  {
                    loader ? (<>
                     <div className=" d-flex justify-content-center align-items-center"
                    style={{ height: 400 }}>
                    <PulseLoader
                      color="#FFD04E"
                      loading={true}
                      margin={4}
                      size={60}
                      speedMultiplier={0.5}
                    />
                  </div>
                    </>) : (<>
                      <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>
                        {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                        <CTableHeaderCell className="text-center">Sr No.</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Fare Per Miles</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Minimum Fare (€)</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Minimum Distance Per Miles</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Waiting Fare (€)</CTableHeaderCell>
                        {/* <CTableHeaderCell className="text-center">Action</CTableHeaderCell> */}
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {data?.length ?  data.map((item, index) => (
                        <CTableRow className="text-center" v-for="item in tableItems" key={index}>


                          <CTableDataCell>
                            <div>{index+ 1}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.vehicle_type}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.vehicle_fare_per_km}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.minimum_fare}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.minimum_distance}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.waiting_fare}</div>
                          </CTableDataCell>
                          {/* <CTableDataCell className="d-flex action-icons driver-icons">
                            <div> <CButton onClick={() => setVisible(!visible)} ><img src={editiconimg} /></CButton></div>
                            <div><img src={deleteiconimg} /></div>
                          </CTableDataCell> */}
                        </CTableRow>
                      )) : ""}
                    </CTableBody>
                    
                  </CTable>
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
                


                  {/* farelistmodalpopup */}


                  <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Edit Fare</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>

                        <CCol xs={12}>
                          <CCard className="mb-4">
                            <CCardBody>

                              <CForm className="row g-3">

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                                  <CFormInput aria-label="vehicle type" />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputvehiclefare">Vehicle Fare Per KM</CFormLabel>
                                  <CFormInput aria-label="vehicle fare" />
                                </CCol>
                                <CCol xs={6}>
                                  <CFormLabel htmlFor="inputvehicleminfare">Minimum Fare</CFormLabel>
                                  <CFormInput id="inputvehicleminfare" />
                                </CCol>
                                <CCol xs={6}>
                                  <CFormLabel htmlFor="inputmindistance">Minimum Distance</CFormLabel>
                                  <CFormInput id="inputmindistance" />
                                </CCol>
                                <CCol xs={6}>
                                  <CFormLabel htmlFor="inputwaitingfare">Waiting Fare</CFormLabel>
                                  <CFormInput id="inputwaitingfare" />
                                </CCol>


                                <CCol xs={12}>
                                  <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                    <CButton type="submit" className="submit-btn">Submit</CButton>
                                    <CButton type="submit" className="cancel-btn">Cancel</CButton>
                                  </div>
                                </CCol>
                              </CForm>

                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                    {/* <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter> */}
                  </CModal>




                  {/* endfarelistpopup */}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FareManagement; 