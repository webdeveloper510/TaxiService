import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import loginImg from '../../assets/images/login-img.png';
import loginLogo from '../../assets/images/login-logo.png'
import loginbg from '../../assets/images/login-bg.png'
import {Link} from "react-router-dom";
import {MDBContainer, MDBCol, MDBRow, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
function Login() {
   
      return (
        
        <div className="container-login" style={{ backgroundImage: `url(${loginbg})`, backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '100%'}}>
      <MDBContainer fluid className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form">
        <MDBRow>
          <MDBCol col='4' md='8'>
          <div class="svg-outer">
          <Link to="/">
           <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 48 48"
    >
      <g filter="url(#filter0_d_3_785)">
        <circle cx="24" cy="23" r="20" fill="#FDC101"></circle>
        <path stroke="#2C2C2C" strokeWidth="2" d="M29 13L19 23l10 10"></path>
      </g>
      <defs>
        <filter
          id="filter0_d_3_785"
          width="48"
          height="48"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="1"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3_785"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_3_785"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
    </Link>
    </div>
            <div className="login-left-content">
            <img src={loginLogo} className="login-imgg" alt="Logo" />
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead me-3">LOG IN AS SUPER-ADMIN</p>
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <MDBInput
                id='phoneNumber'
                type='number'
                size="lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <MDBInput
                id='password'
                type='password'
                size="lg"
              />
            </div>

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name='flexCheck'
                value=''
                id='flexCheckDefault'
                label='Remember me'
              />
              <a class="forgot-pwd" href="!#">Forgot password?</a>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              {/* <MDBBtn className="custom-login mb-0 px-5">
                Login
              </MDBBtn> */}
              <button class="custom-login btn btn-primary" type="submit">Login</button>
            </div>
            </div>
          </MDBCol>

          <MDBCol col='10' md='4'>
            <img src={loginImg} className="img-fluid-login " alt="login" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
      );
    };
  
   export default Login; 