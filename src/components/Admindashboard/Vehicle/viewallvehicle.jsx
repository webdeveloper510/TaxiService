import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
// import vehicle1 from '../../../assets/images/vehicle1.png';
import { getVehicle } from "../../../utils/api";

const ViewAllVehicle = () => {

  const [vehicle, setVehicle] = useState();
  // const image = process.env.REACT_APP_IMAGE_URL

  // console.log('inageuRl' , image)


  useEffect(() => {

    getVehicle().then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setVehicle(res.result)
      }
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
              <h2>View All Vehicles</h2>
              <Container className='p-4 vehicle-cards'>
                <Row>
                  {vehicle?.length ? vehicle.map((data , i) => {
                    return (
                      <Col md={4}>
                      <Card>
                        <Card.Img variant="top" src={data.vehicle_photo} style={{height: 250 , width:293}}/>
                        <Card.Body>
                          <Card.Title>{data.vehicle_model}</Card.Title>
                          <Card.Text>
                            <div className="vehiclemodalinfo d-flex">
                              <div className="vehicle-title">
                                <p>Fuel</p>
                                <p>Type</p>
                                <p>Purchase</p>
                                {/* <p>Driver Name</p> */}
                                <p>Seating Capacity</p>
                              </div>
                              <div className="hypen">
                                <p>-</p>
                                <p>-</p>
                                <p>-</p>
                                <p>-</p>
                                {/* <p>-</p> */}
                              </div>
                              <div className="vehicle-title-info">
                                <p>Gasoline</p>
                                <p>{data.vehicle_type}</p>
                                <p>23 June 2017</p>
                                {/* <p>Joy Frenk</p> */}
                                <p>{data.seating_capacity} Persons</p>
                              </div>
                            </div>
                          </Card.Text>
  
                        </Card.Body>
                      </Card>
                    </Col>
                    )
                  }) : ''}
                
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllVehicle;
