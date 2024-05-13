import React, { useContext, useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer, Rectangle, OverlayView } from "@react-google-maps/api";
// import { activeDrivers } from "../../utils/api";
import { NavItem } from "react-bootstrap";
import { activeDrivers, allocateDriver, getDriverById, getTripById } from "../../../utils/api";
import userContext from "../../../utils/context";
import { useNavigate, useParams } from "react-router";
import AppLoader from "../../AppLoader";
import carLogo from "../../../assets/images/about-car.png";
import { toast } from "react-toastify";
import Switch from "react-switch";


const Allocatemap = () => {
  const [trip, setTrip] = useState(null);
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser, appLoaded } = useContext(userContext);
  const [favorite, setFavorite] = useState(false);
  const [driver,setDriver] = useState(null);
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
        if(user.driverId){
          getDriverById(user.driverId).then(res => {
            console.log(res?.result, 'driver Data')
            if (res?.code === 200) {
              const { result } = res;
              setDriver(res?.result)
            } 
    
          })
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
  const [allDriver, setAllDriver] = useState([]);
  const center = useMemo(() => ({ lat: 52.370216, lng: 4.895168 }), []);
  const [driverLocation, setDriverLocation] = useState([]);
  function locationUpdater() {
    activeDrivers().then(res => {
      if (res.code === 200) {
        console.log("active driver data =======>>>>>>>>", res.result)
        const activeDriversData = res.result.map(item => {
          item.lat = item?.location?.coordinates[1];
          item.lng = item?.location?.coordinates[0];
          return item;
        })
        // console.log("active driver data =======>>>>>>>>",activeDriversData)
        setAllDriver(activeDriversData);
        if (favorite) {
          const favDriver = activeDriversData.filter(driver => user.favoriteDrivers.includes(driver._id))
          setDriverLocation(favDriver);
        } else setDriverLocation(activeDriversData);
      }
    })
  }
  useEffect(() => {
    if (favorite) {
      const favDriver = allDriver.filter(driver => user.favoriteDrivers.includes(driver._id))
      setDriverLocation(favDriver);
    } else setDriverLocation(allDriver);
  }, [favorite])
  useEffect(() => {
    locationUpdater()
    // const timeoutKey = setInterval(()=>{locationUpdater()},5000);
    // return ()=>{
    //   clearInterval(timeoutKey);
    // }
  }, [])
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
  const customMarker2 = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "yellow",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 1,
  };
  const customMarker3 = {
    path: "M 0,0 0,30 40,30 40,0 Z", // Simple rectangle
    fillColor: "#000000", // Black fill
    fillOpacity: 0.5, // Semi-transparent
    strokeWeight: 1,
    scale: 1,
    // labelOrigin: "center",
    labelOrigin: new google.maps.Point(20, 15), // Center of the rectangle
  };
  const generateIcon = (driver) => {
    return {
     
      path: "M 0,0 0,30 160,30 160,0 Z", // Simple rectangle
      fillColor: driver.is_available ? "yellow" : "red",
    fillOpacity: 0.5, // Semi-transparent
    strokeWeight: 1,
    scale: 1,
    labelOrigin: new google.maps.Point(70, 15),
   
    };
  }

  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker,e) => {

    // if(marker.is_available) 
    
    if(!selectedMarker || selectedMarker._id != marker._id )setSelectedMarker(marker);
    else setSelectedMarker(null);
    e.stopPropagation();
  };
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    console.log("🚀 ~ Allocatemap ~ selectedMarker:", selectedMarker)
    
  },[selectedMarker])
  const handleALLocate = (self) => {
    const data = {
      driver_name: selectedMarker?._id,
      // vehicle: selectVehicle,
      status: "Accepted",
    };
    console.log("🚀 ~ handleALLocate ~ data:", data)
    if(self){
      console.log("🚀 ~ handleALLocate ~ self:", self)
      data.driver_name = user.driverId
    }
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
  function handleStatusChange() {
    setFavorite(!favorite);
  }
  const handleMapClick = (event) => {
    // Check if the click event occurred on a marker
    setSelectedMarker(null);
    setRefresh(refresh);
    // if (!event.latLng) {
    //   setSelectedMarker(null);
    // }
    if (event.placeId) {
      event.stop()
    }
  };
  if (loading) {
    return <AppLoader />;
  }
  return (
    <>
      <div className="container-fluidd">
          <div className="row">
            <div className="col-md-12 px-5">
             <div className="text-end me-3"> <p>Show Favorite Driver Only</p>
              <Switch
                checkedIcon={false}
                uncheckedIcon={false}
                height={18}
                width={35}
                onChange={() => {
                  handleStatusChange();
                }}
                checked={favorite}
              />
              
              </div>
              {(user?.driverId && driver?.isVerified && driver?.isDocUploaded && driver?.defaultVehicle) && <button className="view_details_btn my-3" onClick={()=>{handleALLocate(true)}}>Alocate Self</button>} 
                             
              <GoogleMap

                mapContainerStyle={mapContainerStyle}
                center={center}

                zoom={10}
                onClick={handleMapClick}
                options={{
                  streetViewControl: false
                }}
              >
                {/* {
                  driverLocation.map(driver => (
                    <Marker
                      position={{ lat: driver.lat, lng: driver.lng }}
                      // icon={generateIcon(driver)}
                      icon = {generateIcon(driver)}
                      label = {{
                        text: driver.first_name + ' ' + driver.last_name, // Text label
                        color: "black", // White text
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleMarkerClick(driver)}
                      
                    />
                  ))
                } */}


                {selectedMarker && (
                  <InfoWindow
                  style={{
                    zIndex:"1000000 !important"
                  }}
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                    options={{
                      disableAutoPan: false,
                      pixelOffset: { width: 0},
                      zIndex: 100,
                      
                    }}
                  >
                    <div style={{ width: "250px", height: "200px", zIndex: "1000000" }}>

                      <div className="text-center">
                        <h5 className="vichle-name">Driver Details</h5>
                        <img src={selectedMarker?.defaultVehicle?.vehicle_photo} style={{borderRadius:"100px"}} alt="car logo" width="80px" height="80px" />
                      </div>
                      <h5 className="driver-name text-center">Driver Name : {selectedMarker.first_name + ' ' + selectedMarker.last_name}</h5>
                      <h6 className="vichle-name text-center" style={{fontSize:"10px !important", fontWeight:"500"}}>Vehicle Name :{`${selectedMarker?.defaultVehicle?.vehicle_make} ${selectedMarker.defaultVehicle.vehicle_model}`}</h6>
                      {/* <h6 className="vichle-name text-center" style={{fontSize:"10px !important", fontWeight:"500"}}>Vichke Type :{selectedMarker?.defaultVehicle?.vehicle_type}</h6> */}
                      <div class="text-center">
                        <button className="approve-butn" onClick={()=>{handleALLocate()}}>Approve</button>
                      </div>
                    </div>
                  </InfoWindow>
                )}

                {
                  driverLocation.map(driver => (
                   
                    <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                      position={{ lat: driver.lat, lng: driver.lng }}
                      getPixelPositionOffset={(width, height) => {
                       
                        
                        return ({
                          x: -40,
                          y: -35,
                        })
                      }}
                    
                     

                    >
                     <div style={{
                      height: "80px",
                      width: "80px",
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                     }}>
                     <div 
                     
                     style={{ 
                        backgroundColor:driver.is_available ? "green" : "red",
                        height:"45px",
                        width: "45px",
                        marginBottom:"5px",
                        textAlign:"center",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyItems: "center",
                        alignItems: "center",
                        overflow:"hidden",
                        paddingTop: "8px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        // border: "4px solid white",
                        // borderRadius: "4px",

                        clipPath: "polygon(0% 0%, 100% 0%, 100% 69%, 75% 75%, 48% 100%, 24% 75%, 0 69%)"
                        }}
                        onClick={(e) => handleMarkerClick(driver,e)}
                        >
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: "white" }}>
                          {driver?.defaultVehicle?.vehicle_type}
                          -
                          {
                            driver?.defaultVehicle?.seating_capacity
                          }
                          

                        </span>
                        
                    </div>
                    <div style={
                     {
                      width: '100%',
                      height: '30px',
                      backgroundColor: 'black',
                      opacity: 0.8,
                      textAlign: 'center',
                      color: 'white',
                      display: "flex",
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow:"hidden",
                      padding: "1px"
                    }
                    }
                    onClick={(e) => handleMarkerClick(driver,e)}
                    ><span style={{
                      fontWeight:"bold",
                    }}>{driver.nickName || driver.first_name}</span>
                    </div>
                     </div>
                   
                    </OverlayView>
                    
                  ))
                }
                
                {trip && (
                  <DirectionsService
                    options={directionsServiceOptions}
                    callback={(result, status) => {
                      if (status === "OK") {

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
    </>
  );
};

export default Allocatemap; 