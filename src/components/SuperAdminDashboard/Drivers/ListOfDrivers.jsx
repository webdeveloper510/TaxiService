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
  CModal,
  CModalBody,
  CCardBody,
  CRow,
  CCard,
  CCol,
  CFormInput,
  CFormLabel,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import AppHeader from "../../TopBar/AppHeader";
import editiconimg from '../../../assets/images/editicon.png'
import deleteiconimg from '../../../assets/images/deleteicon.png'
import PulseLoader from "react-spinners/PulseLoader";
import deletepopup from '../../../assets/images/deletepopup.png'
import { deleteCompany, deleteDriver, getDriver } from "../../../utils/api";
import SuperSideBar from "../SiderNavBar/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


const ListOfDrivers = () => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const navigate = useNavigate();

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
  const deleteDriverHandler = async (id) => {
    try {
      console.log(id, 'driver deleted id')
      const deleteData = await deleteDriver(id);
      console.log(deleteData,"delete driver data")
      if(deleteData.code === 200) {
        toast.success(`${deleteData.message}`, {

          position: 'top-right',
          autoClose: 1000,
        });
        const newData = driver.filter(d => d._id != id);
        setDriver(newData)
      }else{
        toast.warning(`${deleteData.message}`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SuperSideBar/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Driver's List</h1>
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
                            <div style={{
                              cursor:"pointer"
                            }
                            
                          }
                          onClick={()=>{
                            navigate(`/superadmindashboard/driver/editdriver/${item._id}`);
                          }
                          }
                          ><img src={editiconimg} /></div>
                          
                            {/* <div
                            style={{
                              cursor:"pointer"
                            }
                            
                          }
                          onClick={()=>{
                            deleteDriverHandler(item._id)
                          }}
                            ><img src={deleteiconimg} /></div> */}
                             <CButton id="delete_driver_btn" onClick={() => setDeleteVisible(!deleteVisible)}><img src={deleteiconimg} /></CButton>
                          </CTableDataCell>
                        </CTableRow>
                      )) :  ""}
                    </CTableBody>
                  </CTable>
                    </>)
                  }
                
      {/* deletedriverpopup */}


      <CModal alignment="center" visible={deleteVisible} onClose={() => setDeleteVisible(false)}>
                    {/* <CModalHeader>
                      <CModalTitle>Edit Fare</CModalTitle>
                    </CModalHeader> */}
                    <CModalBody>
                      <CRow>

                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup">
                            <CCardBody>
                                <img src={deletepopup} alt="danger"/>
                                 <h2>Are you Sure</h2>
                                <p>You want to delete this Vehicle ?</p>

                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                        

                            <CButton className="delete_popup"
                           
                            >Delete</CButton>
                                <CButton className="cancel_popup">
                             Cancel</CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                   
       
       
                  </CModal>



                  {/* enddeletedriverpopup */}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>


    </>
  );
};

export default ListOfDrivers; 