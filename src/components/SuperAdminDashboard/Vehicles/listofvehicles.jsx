import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
// import vehicle1 from '../../../assets/images/vehicle1.png';
import { getVehicle } from "../../../utils/api";
import PulseLoader from "react-spinners/PulseLoader";
import SuperSideBar from "../SiderNavBar/Sidebar";

const LisOfVehicles = () => {

  const [vehicle, setVehicle] = useState();
  const [loader, setLoader] = useState(false);



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
        <SuperSideBar/>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
            <h1 className="heading-for-every-page">View All super Vehicles</h1>
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
                    {vehicle?.length > 0 ? vehicle.map((data, i) => {
                      return (
                        <Col md={4}>
                          <Card>
                            <Card.Img variant="top" src={data.vehicle_photo} style={{ height: 250, width: 293 }} />
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

                  </Row></>)}


              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LisOfVehicles;
