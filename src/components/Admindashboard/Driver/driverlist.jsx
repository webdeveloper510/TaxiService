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

import { getDriver } from "../../../utils/api";


const DriverList = () => {


  const [driver, setDriver] = useState()
  const image = process.env.REACT_APP_IMAGE_URL


  useEffect(() => {
    getDriver().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setDriver(res.result)
      }
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
                  <div className="trips-head d-flex justify-content-between">
                    <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>List of all Drivers </h2>
                      </div>
                    </div>
                  </div>
                  <CTable align="middle" className="mb-0" hover responsive>

                    <CTableHead>

                      <CTableRow>
                      
                        <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Mobile No.</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Trips</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {driver?.length ?  driver.map((item, index) => (
                        <CTableRow className="text-center"  key={index}>

                          <CTableDataCell className="text-center">
                            <CAvatar size="md" alt='img' src={`${image}${item.profile_image}`} />
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

                          <CTableDataCell>
                            <div>Delhi to Chd</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div class="status">{item.city}</div>
                          </CTableDataCell>
                          <CTableDataCell className="d-flex action-icons driver-icons">
                            <div><img src={editiconimg} /></div>
                            <div><img src={deleteiconimg} /></div>
                          </CTableDataCell>
                        </CTableRow>
                      )) :  ""}
                    </CTableBody>
                  </CTable>

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