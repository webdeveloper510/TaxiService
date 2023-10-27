import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import {
  CButton,
} from '@coreui/react'
// import vehicle1 from '../../../assets/images/vehicle1.png';
import { getVehicle } from "../../../utils/api";
import PulseLoader from "react-spinners/PulseLoader";
import editvehicleicon from "../../../assets/images/editvehi.png";
const ViewAllVehicle = () => {

  const [vehicle, setVehicle] = useState([]);
  const [loader, setLoader] = useState(false);
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

  return (
    <div className="container-fluid">
      <div className="col-md-12">
        <SideBar2 />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
            <h1 className="heading-for-every-page">View All Vehicles</h1>
            <div className="active-trip-outer">
              {/* <h2>View All Vehicles</h2> */}
              <Container className='p-4 vehicle-cards'>
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
                          <Card>
                          <div className="vehicle_inner">
                            <div className="image-container">
                            <Card.Img variant="top" src={data.vehicle_photo} style={{ height: 250, width: 293 }} />
                          <div class="icons-outer" >
                          <div class="overlay">
                          <Link to={`/superadmindashboard/vehicle/editvehicle/${data._id}`}>
                          <CButton id="btn_edit_vehicle" className="edit_vehicle"
                       
                          ><img src={editvehicleicon} alt="edit-icon"/></CButton>
                        </Link>

                       
                          {/* <CButton id="btn_delete_vehicle" className="delete_vehilce" onClick={() => {setVisible(!visible); setSelectedId(data._id)}}><img src={deletevehicleicon} alt="edit-icon"/></CButton> */}
                    
                       </div>
                       
                          </div>
                          </div>
                          </div>
                           
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
                          </Card>
                        </Col>
                      )
                    }) : 'no results found'}

                  </Row>
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
                  </>)}


              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllVehicle;
