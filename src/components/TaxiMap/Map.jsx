import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { activeDrivers } from "../../utils/api";
import { NavItem } from "react-bootstrap";
const SuperMap=()=> {
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
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  if (loadError) {
    return <div>Error loading maps</div>;
  }
      return (
       <>
       <div className="container-fluidd">
      
        <div className="col-md-12">
        <div className="row">
            <div className="col-md-12">
             
            {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          // mapContainerClassName="map-container"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}

        > 
        {
          driverLocation.map(driver=>(
            <Marker
            position={{ lat: driver.lat, lng: driver.lng }}
            icon={customMarker}
            onClick={() => handleMarkerClick(driver)}
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
                      <div>
                        <h2>Driver Details</h2>
                        <p>{selectedMarker.first_name + ' ' + selectedMarker.last_name}</p>
                        <p>Latitude: {selectedMarker.lat}</p>
                        <p>Longitude: {selectedMarker.lng}</p>
                        {/* Add more details as needed */}
                      </div>
                    </InfoWindow>
                  )}
        </GoogleMap>
      )}
            </div>
          
       </div>
       </div>
       </div>
       </>
      );
    };
  
   export default SuperMap; 