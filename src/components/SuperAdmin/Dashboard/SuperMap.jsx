import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import map from '../../../assets/images/map.png'

const SuperTaxiMap=()=> {
   
      return (
       <>
       <div className="container-fluidd">
      
        <div className="col-md-12">
        <div className="row">
            <div className="col-md-12">
             
           {/* <img src={map} alt="map" className="map-img"/> */}
           <MapContainer center={[52.379189, 4.899431]} zoom={10} style={{ height: '400px' }}>
                 <TileLayer
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 />
               </MapContainer>
            </div>
          
       </div>
       </div>
       </div>
       </>
      );
    };
  
   export default SuperTaxiMap; 