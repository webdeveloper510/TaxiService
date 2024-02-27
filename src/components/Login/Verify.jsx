

import userContext from '../../utils/context';
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import logo from '../../assets/images/taxi-logo.png';
import loginImg from "../../assets/images/login-img.png";
import loginLogo from "../../assets/images/login-logo.png";
import loginbg from "../../assets/images/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import uploadfileImg from "../../assets/images/upload-btn.png";
import { CCol, CFormInput, CFormLabel, CFormSelect } from "@coreui/react";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { addDriver, editDriver } from "../../utils/api";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { countryList } from "../../utils/saticData";


export default function DriverVerification() {
   const { user, setUser, appLoaded } = useContext(userContext);
    const navigate = useNavigate()
    useEffect(() =>{
        if(user?.isVerified == true){
            navigate("/past-trip");
        }
    },[])

    const handleLogout=()=>{
      localStorage.clear()
      navigate('/')
    }
  

  return (
    <>
      <header>
      
      <div class="p-2">
    <div className="text-start"><button class="login-btn" onClick={()=>handleLogout()}>Log Out</button></div>
    
     </div>
    </header>
    <div
        className="container-login"
        style={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "100%",
        }}
      >
        <MDBContainer
          fluid
          className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form"
        >
          <MDBRow>
            <MDBCol col="4" md="8">
              <div className="svg-outer"></div>
                <div className="login-left-content">
                  <img src={loginLogo} className="login-  " alt="Logo" />
                  <div className="d-flex flex-row align-items-center justify-content-center">
                  <div>
                  <h1 className='document-heading'>Document Under Review</h1>
                  <p className="form-label">Your document is currently under review.</p>
                  </div>
                  </div>
                </div>
            </MDBCol>
  
            <MDBCol col="10" md="4">
              <img src={loginImg} className="img-fluid-login " alt="login" />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    {/* <div style={{
        height: '100vh',
        width: '100vw',
    }}>
      <h1>Document Under Review</h1>
        <div>
          <p>Your document is currently under review.</p>
          
        </div>
    </div> */}
    </>
  );
}

