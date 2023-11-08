import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";

import {
  Row,
  Col,
  Card,
} from 'react-bootstrap';

import {
  CButton,
  CModal,
  CModalBody,
  CCardBody,
  CCol,
  CRow,
  CCard,
} from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom';
// import vehicle1 from '../../../assets/images/vehicle1.png';
import { deleteDriver, deleteVehicle, getVehicle } from "../../../utils/api";
import PulseLoader from "react-spinners/PulseLoader";
import SuperSideBar from "../SiderNavBar/Sidebar";
import editvehicleicon from "../../../assets/images/editvehi.png";
import deletevehicleicon from "../../../assets/images/deletevehi.png"
import deletepopup from '../../../assets/images/deletepopup.png'
import { toast } from "react-toastify";
import EmptyData from "../../EmptyData";


const LisOfVehicles = ({role}) => {


  const [visible, setVisible] = useState(false)
  const [vehicle, setVehicle] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loader, setLoader] = useState(false);
  const [activeTrip, setActiveTrip] = useState([]);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = vehicle?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(vehicle?.length / recordPage);
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

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true)
    getVehicle().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setVehicle(res.result)
      }
      setLoader(false)
    });
  }, [])
  const deleteVehicleHandler = async () => {
    try {
      console.log(selectedId, 'vehicle deleted id')
      const deleteData = await deleteVehicle(selectedId);
      console.log(deleteData,"delete vehicle data")
      if(deleteData.code === 200) {
        setVisible(false);
        toast.success(`${deleteData.message}`, {

          position: 'top-right',
          autoClose: 1000,
        });
        const newData = vehicle.filter(d => d._id != selectedId);
        setVehicle(newData)
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
    <div className="container-fluid">
      <div className="col-md-12">
        <SuperSideBar/>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
            <h1 className="heading-for-every-page">Vehicles List</h1>
            <div className="active-trip-outer">
              {/* <h2>View All Vehicles</h2> */}
              
              <div className='p-4 vehicle-cards'>
                {loader ? (<>
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
                  <Row>
                    {data?.length > 0 ? data.map((data, i) => {
                      return (
                        <Col md={4}>
                          
                          <Card className="cards-for-icons">
                         
                            <div className="vehicle_inner">
                            <div className="image-container">
                            <Card.Img variant="top" src={data.vehicle_photo} style={{ height: 250, width: 293 }} /> 
                          <div class="icons-outer" >
                         {role == "super" && <div class="overlay">
                          <Link to={`/super-admin/vehicle/editvehicle/${data._id}`}>
                          <CButton id="btn_edit_vehicle" className="edit_vehicle"
                       
                          ><img src={editvehicleicon} alt="edit-icon"/></CButton>
                        </Link>

                       
                          <CButton id="btn_delete_vehicle" className="delete_vehilce" onClick={() => {setVisible(!visible); setSelectedId(data._id)}}><img src={deletevehicleicon} alt="edit-icon"/></CButton>
                    
                       </div>}
                       
                          </div>
                          </div>
                          </div>
                          <Link className="vehicle_linked" to={`/${role=="taxi"?"taxi":"super-admin"}/vehicle/vehicle-details/${data._id}`}>
                            <Card.Body>
                              <Card.Title>{data.vehicle_model}</Card.Title>
                              <Card.Text>
                                <div className="vehiclemodalinfo d-flex">
                                  <div className="vehicle-title">
                                    {/* <p>Make</p> */}
                                    <p>Type</p>
                                    <p>Vehicle Number</p>
                                    {/* <p>Driver Name</p> */}
                                    <p>Seating Capacity</p>
                                  </div>
                                  <div className="hypen">
                                    <p>-</p>
                                    {/* <p>-</p> */}
                                    {/* <p>-</p> */}
                                    <p>-</p>
                                    <p>-</p>
                                  </div>
                                  <div className="vehicle-title-info">
                                    {/* <p>Gasoline</p> */}
                                    <p>{data.vehicle_type}</p>
                                    <p>{data.vehicle_number}</p>
                                    {/* <p>Joy Frenk</p> */}
                                    <p>{data.seating_capacity} Persons</p>
                                  </div>
                                </div>
                              </Card.Text>

                            </Card.Body>
                            </Link>
                          </Card>
                       
                        </Col>
                        
                      )
                    }) : <EmptyData/>}

                  </Row>
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
                    :""
                     }
                  </>)}


 {/* StartDeletepopup */}


 <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
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
                            onClick={()=>{
                              deleteVehicleHandler()
                            }}
                            >Delete</CButton>
                            <CButton className="cancel_popup" onClick={() => setVisible(false)}>
                             Cancel</CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                   
       
       
                  </CModal>




                  {/* enddeletepopup */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LisOfVehicles;
