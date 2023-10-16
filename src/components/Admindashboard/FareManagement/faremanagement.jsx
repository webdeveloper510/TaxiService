import React from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2";

const FareManagement=()=> {
   
      return (
       <>
       <div className="container-fluidd">
        <div className="col-md-12">
        <div>
        <SideBar2/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-0">
          <div class="map-outer"> 
          <h2>Fare Management</h2>
          </div>
          
        
        </div>
       
      </div>
    </div>
       </div>
       </div>
       </>
      );
    };
  
   export default FareManagement; 