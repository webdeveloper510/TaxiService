import React from "react";
import map from '../../assets/images/map.png'
const SuperMap=()=> {
   
      return (
       <>
       <div className="container-fluidd">
      
        <div className="col-md-12">
        <div className="row">
            <div className="col-md-12">
             
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504814.743808524!2d2.639754751060554!3d52.18690687118489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c3db87e4bb%3A0xb3a175ceffbd0a9f!2sNetherlands!5e0!3m2!1sen!2sin!4v1698994986452!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: "0" }} // Change this line
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          
       </div>
       </div>
       </div>
       </>
      );
    };
  
   export default SuperMap; 