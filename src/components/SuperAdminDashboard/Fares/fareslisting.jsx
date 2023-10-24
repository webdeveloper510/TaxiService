import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
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
import SuperSideBar from "../SiderNavBar/Sidebar";




const ListOfFares = () => {

  const [visible, setVisible] = useState(false)
  const [fare, setFare] = useState()
  const [loader, setLoader] = useState(false);

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
            <SuperSideBar/>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Fare Management</h1>
                <div class="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>Fare List </h2>
                      </div>
                      {/* <div className="right-trip-content">
                        <Link to="/superadmindashboard/add-fare">
                          <CButton className="add_fare_btn">Add Fare</CButton>
                        </Link>
                     
            </div> */}
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
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {fare?.length ?  fare.map((item, index) => (
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
                          <CTableDataCell className="d-flex action-icons driver-icons">
                            <div> <CButton onClick={() => setVisible(!visible)} ><img src={editiconimg} /></CButton></div>
                            <div><img src={deleteiconimg} /></div>
                          </CTableDataCell>
                        </CTableRow>
                      )) : ""}
                    </CTableBody>
                  </CTable></>)
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

export default ListOfFares; 