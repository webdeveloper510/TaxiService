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


const DriverList = () => {


  const [driver, setDriver] = useState()
  const [loader, setLoader] = useState(false);
  // const image = process.env.REACT_APP_IMAGE_URL1


  useEffect(() => {
    setLoader(true)
    getDriver().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
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

                          <CTableDataCell>
                            <div>Delhi to Chd</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div class="status">Available</div>
                          </CTableDataCell>
                          <CTableDataCell className="d-flex action-icons driver-icons">
                            <div><img src={editiconimg} /></div>
                            <div><img src={deleteiconimg} /></div>
                          </CTableDataCell>
                        </CTableRow>
                      )) :  ""}
                    </CTableBody>
                  </CTable>
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