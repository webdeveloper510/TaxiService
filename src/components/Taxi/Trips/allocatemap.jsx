import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
// import { activeDrivers } from "../../utils/api";
import { NavItem } from "react-bootstrap";
import { activeDrivers, allocateDriver, getTripById } from "../../../utils/api";
import userContext from "../../../utils/context";
import { useNavigate, useParams } from "react-router";
import AppLoader from "../../AppLoader";
import carLogo from "../../../assets/images/about-car.png";
import { toast } from "react-toastify";
const Allocatemap=()=> {
    const [trip, setTrip] = useState(null);
    const [directions, setDirections] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, setUser, appLoaded } = useContext(userContext);
    const navigate = useNavigate();
    const id = useParams().id;
    useEffect(() => {
      updaterLocation();
    }, []);
    function updaterLocation() {
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
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      
    }
    const [directionsServiceOptions, setDirectionsServiceOptions] =
    useState(null);
 
  
  const directionsRendererOptions = {
    polylineOptions: {
      strokeColor: "blue",
      strokeOpacity: 0.8,
      strokeWeight: 5,
    },
  };
 
  const center = useMemo(() => ({ lat: 52.370216, lng: 4.895168 }), []);
  const [driverLocation, setDriverLocation] = useState([]);
  function locationUpdater(){
    activeDrivers().then(res=>{
      if(res.code === 200){
        console.log("active driver data =======>>>>>>>>",res.result)
        const activeDriversData = res.result.map(item=>{
          item.lat = item?.location?.coordinates[1];
          item.lng = item?.location?.coordinates[0];
        return item;
        })
        // console.log("active driver data =======>>>>>>>>",activeDriversData)
        setDriverLocation(activeDriversData);
      }
    }) 
  }
  useEffect(()=>{
    const timeoutKey = setInterval(()=>{locationUpdater()},5000);
    return ()=>{
      clearInterval(timeoutKey);
    }
  },[])
  const mapContainerStyle = {
    width: '80vw',
    height: '80vh',
  };

  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "yellow",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };
  const generateIcon = (driver)=>{
    return {
        path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
        fillColor: driver.is_available ? "yellow": "red",
        fillOpacity: 2,
        strokeWeight: 1,
        rotation: 0,
        scale: 1,
      };
  }
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => {
    if(marker.is_available)    setSelectedMarker(marker);
  };
  
  const handleALLocate = () => {
    const data = {
        driver_name: selectedMarker._id,
        // vehicle: selectVehicle,
        status: "Accepted",
      };
      
      allocateDriver(data, id).then((res) => {
        if (res?.data?.code === 200) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
          navigate("/taxi/trips/pendingtrips")
        } else {
          toast.warning(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      });
  };
  const handleMapClick = (event) => {
    console.log("🚀 ~ handleMapClick ~ event:", event)
    // Check if the click event occurred on a marker
    if (!event.latLng) {
      setSelectedMarker(null);
    }
    if(event.placeId){
      event.stop()
    }
  };
  if (loading) {
    return <AppLoader />;
  }
      return (
       <>
       <div className="container-fluidd">
      
        <div className="col-md-12">
        <div className="row">
            <div className="col-md-12">
             
          
        <GoogleMap
          // mapContainerClassName="map-container"
          mapContainerStyle={mapContainerStyle}
          center={center}
        //   center={{ lat: directionsServiceOptions?.origin?.lat || 0, lng: directionsServiceOptions?.origin?.lng || 0 }}
          zoom={10}
          onClick={handleMapClick}

        > 
        {
          driverLocation.map(driver=>(
            <Marker 
            position={{ lat: driver.lat, lng: driver.lng }}
            icon={generateIcon(driver)}
            onClick={() => handleMarkerClick(driver)}
            // label={driver.first_name + ' ' + driver.last_name}
            label={{
                text: driver.first_name + ' ' + driver.last_name,
                color: 'black',  fontSize: '18px', fontWeight: 'bold',background: '#3498db !important', borderRadius: '5px !important',boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1) !important',padding: '8px !important', }}
          />
          ))
        }
          {/* <Marker
            position={{ lat: 18.52043, lng: 74.856743 }}
            icon={customMarker}
            onClick={() => handleMarkerClick({ lat: 18.52043, lng: 74.856743 })}
          /> */}
          {selectedMarker && (
                    <InfoWindow 
                      position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                      onCloseClick={() => setSelectedMarker(null)}
                    >
                      <div style={{width:"250px", height:"200px"}}>
                        
                        <div className="text-center">
                        <h3 className="vichle-name">Driver Details</h3>
                        <img src={carLogo} alt="car logo" width="100px" height="100px" />
                        </div>
                        <h5 className="driver-name">Driver Name : {selectedMarker.first_name + ' ' + selectedMarker.last_name}</h5>
                        <h4 className="vichle-name">Vehicle Name : Bike</h4>
                        <h4 className="vichle-name">Vichke Type : test</h4>
                       <div class="text-center">
                       <button className="approve-butn" onClick={handleALLocate}>Approve</button>
                       </div>
                      </div>
                    </InfoWindow>
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

            </div>
          
       </div>
       </div>
       </div>
       </>
      );
    };
  
   export default Allocatemap; 