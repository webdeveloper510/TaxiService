import React from "react";
import logo from '../../assets/images/taxi-logo.png';
//import background from '../assets/images/heroimg.png';

const Topbar=()=> {
   
      return (
      
       <div className="container-fluid">
       
        <div className="col-md-12">
        <div className="row">
        <div className="top-bar">
        <div className="bar-logo">
        <img src={logo} className="App-logo" alt="logo" />
        </div>
        
        <div className="bar-content">
          dummy content
        </div>
       </div>
       </div>
       </div>
       </div>
       
      );
    };
  
   export default Topbar; 