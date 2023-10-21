import React, { useState}  from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow
} from '@coreui/react'
import refreshImg from '../../../assets/images/refresh.png';
import crossImg from '../../../assets/images/cross-arrow.png';
import downarrowImg from '../../../assets/images/down-arrow.png'
//import background from '../assets/images/heroimg.png';
//import accepticonimg from '../../../assets/images/accept.png'
import rejecticonimg from '../../../assets/images/rejecticon.png'
import editicon from '../../../assets/images/editicon.png'



const tableExample = [
    {
      Srnum: '1',
      tripid: '123',
      vehicletype: 'SUV',
      tripfrom: 'mohali',
      tripto: 'chandigarh',
      time: '10:20AM',
      
    },  
  ]
const PendingTrip = () => {
    
    const [visible, setVisible] = useState(false)
   
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
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>List of Pending Trips</h2>
                      </div>
                      <div className="right-trip-content">
                        <img src={refreshImg} />
                        <img src={downarrowImg} />
                        <img src={crossImg} />
                      </div>
                    </div>
                  </div>
                  <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>
                       
                        <CTableHeaderCell className="text-center">Sr.No</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip ID</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Vehicle Type</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip From</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trip To</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Time</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
               
                    <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow className="text-center" v-for="item in tableItems" key={index}>
                     <CTableDataCell>
                              <div>{item.Srnum}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.tripid}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.vehicletype}</div>
                     </CTableDataCell>
                      
                     <CTableDataCell>
                              <div>{item.tripfrom}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.tripto}</div>
                     </CTableDataCell>
                     <CTableDataCell>
                              <div>{item.time}</div>
                     </CTableDataCell>
                     <CTableDataCell className="d-flex pending-trips-icons">
                            <div><CButton className="allocate_accept_driver" onClick={() => setVisible(!visible)} ><img src={editicon} /></CButton></div>
                            <div className="reject_icon"><img src={rejecticonimg} /></div>
                          </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
                  </CTable>
                    {/* allocatedriver */}


                    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Allocate Driver</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>

                        <CCol xs={12}>
                          <CCard className="mb-4">
                            <CCardBody>

                              <CForm className="row g-3">

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                                  <CFormSelect id="inputallocatevehicle"
                                name="Vehicle"
                                autoComplete="off" >
                                <option default>Select Vehicle</option>
                                <option>SUV</option>
                                <option>SEDAN</option>
                             
                              </CFormSelect>
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputallocatedrivename">Driver Name</CFormLabel>
                                  <CFormInput aria-label="vehicle driver name" />
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



                  {/* endallocatedriverpopup */}

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

export default PendingTrip; 