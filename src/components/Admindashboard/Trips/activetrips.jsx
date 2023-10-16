import React from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
//import background from '../assets/images/heroimg.png';

const ActiveTrip=()=> {
   
      return (
       <>
       <div className="container-fluidd">
       
        <div className="col-md-12">
       
        <div>
        <SideBar2/>

      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-0">
          <h1>Active Trip</h1>
          <div class="active-trip-outer"> 
          <h2>Active Trip</h2>
          
          </div>
        
        </div>
       
      </div>
    </div>
      
       </div>
       </div>
       
       </>
      );
    };
  
   export default ActiveTrip; 