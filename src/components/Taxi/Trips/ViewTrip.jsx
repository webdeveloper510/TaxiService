import React, { useState, useEffect, useContext, useMemo } from "react";
import AppHeader from "../../TopBar/AppHeader";
import moment from "moment";

import { CCard, CCardBody, CCol, CFormLabel, CRow } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import backtovehicle from "../../../assets/images/left-arrow.png";
import SuperSideBar from "../SiderNavBar/Sidebar";
import { getTripById } from "../../../utils/api";
import AppLoader from "../../AppLoader";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";

import userContext from "../../../utils/context";
import SuperAdminSideBar from "../../SuperAdmin/Sidebar/SideBar";
import SidebarDriver from "../../Driver/Sidebar";
const ViewTripLocation = () => {
  const [trip, setTrip] = useState(null);
  const [directions, setDirections] = useState(null);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser, appLoaded } = useContext(userContext);
  const navigate = useNavigate();
  const [intervalKey, setIntervalKey] = useState();
  const id = useParams().id;
  useEffect(() => {
    updaterLocation();
  }, [appLoaded]);
  useEffect(() => {
    return ()=>{
        if (intervalKey) clearInterval(intervalKey);
    }
  }, []);
  function updaterLocation() {
    if (appLoaded) {
      if (!user) {
        navigate("/");
        return;
      }
      setLoading(true);
      getTripById(id)
        .then((res) => {
          console.log("page data for trip", res);
          if (res.code === 200) {
            console.log(
              "trip details =========>>>>>> from location",
              res.result
            );
            setTrip(res.result);
            setDirectionsServiceOptions({
              origin: {
                lat: res.result?.trip_from?.lat,
                lng: res.result?.trip_from?.log,
              },
              destination: {
                lat: res.result?.trip_to?.lat,
                lng: res.result?.trip_to?.log,
              },
              travelMode: "DRIVING",
            });
            setDriver(res.result.driverInfo);
            const key = setInterval(() => {
              getTripById(id)
                .then((res) => {
                  if (res.code === 200) {
                    
                    // setDirectionsServiceOptions({
                    //   origin: {
                    //     lat: res.result?.trip_from?.lat,
                    //     lng: res.result?.trip_from?.log,
                    //   },
                    //   destination: {
                    //     lat: res.result?.trip_to?.lat,
                    //     lng: res.result?.trip_to?.log,
                    //   },
                    //   travelMode: "DRIVING",
                    // });
                    setDriver(res.result.driverInfo);
                  }
                })
                .catch((err) => {
                  console.log(err);
                })
            }, 5000);
            setIntervalKey(key);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  const mapContainerStyle = {
    width: "80vw",
    height: "80vh",
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "yellow",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };
//   const startingPointMarker = {
//     path: "M10 1.5C10 0.671573 9.32843 0 8.5 0C7.67157 0 7 0.671573 7 1.5C7 2.32843 7.67157 3 8.5 3C9.32843 3 10 2.32843 10 1.5ZM8.5 7C6.01472 7 4 9.01472 4 11.5C4 14.9853 8.5 18 8.5 18C8.5 18 13 14.9853 13 11.5C13 9.01472 10.9853 7 8.5 7Z",
//     fillColor: "#00cc44",
//     fillOpacity: 0.8,
//     scale: 1.5,
//   };

//   const endingPointMarker = {
//     path: "M10 1.5C10 0.671573 9.32843 0 8.5 0C7.67157 0 7 0.671573 7 1.5C7 2.32843 7.67157 3 8.5 3C9.32843 3 10 2.32843 10 1.5ZM8.5 7C6.01472 7 4 9.01472 4 11.5C4 14.9853 8.5 18 8.5 18C8.5 18 13 14.9853 13 11.5C13 9.01472 10.9853 7 8.5 7Z",
//     fillColor: "#ff4444",
//     fillOpacity: 0.8,
//     scale: 1.5,
//   };

  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  const [directionsServiceOptions, setDirectionsServiceOptions] =
    useState(null);
  // const directionsServiceOptions = {
  //     origin: { lat: 30.377651, lng: 76.762848},
  //     destination: { lat: 30.720625, lng: 76.784821},
  //     travelMode: 'DRIVING',
  //   };

  const directionsRendererOptions = {
    polylineOptions: {
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 5,
    },
  };
  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (loading) {
    return <AppLoader />;
  }
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            {user?.role === "SUPER_ADMIN" && <SuperAdminSideBar />}
            {user?.role === "COMPANY" && <SuperSideBar />}
            {user?.role === "DRIVER" && <SidebarDriver />}

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              {loading ? (
                <AppLoader />
              ) : (
                <div
                  className="body flex-grow-1 px-3"
                  style={{ paddingBottom: "20px" }}
                >
                  <h1 class="heading-for-every-page">
                    <Link to="/" className="view_detail">
                      <img src={backtovehicle} alt="edit" /> View Trip Details
                    </Link>
                  </h1>

                  <div class="active-trip-outer">
                    <CRow>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            {!isLoaded ? (
                              <h1>Loading...</h1>
                            ) : (
                              <GoogleMap
                                // mapContainerClassName="map-container"
                                mapContainerStyle={mapContainerStyle}
                                center={
                                  trip
                                    ? {
                                        lat: trip?.trip_from?.lat,
                                        lng: trip?.trip_from?.log,
                                      }
                                    : center
                                }
                                zoom={10}
                              >
                                {/* <Marker
                                  position={{
                                    lat: trip.trip_from.lat,
                                    lng: trip.trip_from.log,
                                  }}
                                  icon={startingPointMarker}
                                />
                                <Marker
                                  position={{
                                    lat: trip.trip_to.lat,
                                    lng: trip.trip_to.log,
                                  }}
                                  icon={endingPointMarker}
                                /> */}
                                {driver && (
                                  <Marker
                                    position={{
                                      lat: driver.location.coordinates[1],
                                      lng: driver.location.coordinates[0],
                                    }}
                                    icon={customMarker}
                                  />
                                )}
                                {trip && (
                                  //   <DirectionsService
                                  //     options={directionsServiceOptions}
                                  //     callback={(result, status) => {
                                  //       if (status === "OK") {
                                  //         return (
                                  //           <DirectionsRenderer
                                  //             options={{
                                  //               ...directionsRendererOptions,
                                  //               directions: result,
                                  //             }}
                                  //           />
                                  //         );
                                  //       } else {
                                  //         console.log(
                                  //           `Error rendering directions ${status}`
                                  //         );
                                  //       }
                                  //     }}
                                  //   />
                                  //   <Polyline
                                  //     path={[
                                  //       {
                                  //         lat: trip?.trip_from?.lat,
                                  //         lng: trip?.trip_from?.log,
                                  //       },
                                  //       {
                                  //         lat: trip?.trip_to?.lat,
                                  //         lng: trip?.trip_to?.log,
                                  //       },
                                  //     ]}
                                  //     strokeColor="#0000FF"
                                  //     strokeOpacity={0.8}
                                  //     strokeWeight={2}
                                  //   />
                                  <DirectionsService
                                    options={directionsServiceOptions}
                                    callback={(result, status) => {
                                      if (status === "OK") {
                                        console.log(
                                          "data from direction",
                                          result
                                        );
                                        if (!directions) setDirections(result);
                                      } else {
                                        console.error(
                                          `Error rendering directions ${status}`
                                        );
                                      }
                                    }}
                                  />
                                )}
                                {directions && (
                                  <DirectionsRenderer
                                    options={directionsRendererOptions}
                                    directions={directions}
                                  />
                                )}
                              </GoogleMap>
                            )}
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTripLocation;
