import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import loginImg from "../../assets/images/login-img.png";
import loginLogo from "../../assets/images/login-logo.png";
import loginbg from "../../assets/images/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import backtologin from '../../assets/images/left-arrow.png'
import forgotPassowd from '../../assets/images/forgot-password.png'
function ForgotPassword() {
  const initialValues = {
    phoneNo: "",
    password: "",
  };




  return (
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
        className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form custom-forgot-password"
      >
        <MDBRow>
          <MDBCol col="4" md="8">
            <div className="svg-outer">

            </div>
            <form noValidate>
              <div className="login-left-content">
                <img src={loginLogo} className="login-  " alt="Logo" />
               <br/><br/>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {/* <p className="lead me-3">LOG IN</p> */}<br/><br/><br/><br/>
                <p> <img className="lock-img" src={forgotPassowd} alt="forgot"/>Enter your email and we'll send you a <strong>OTP</strong> to <br/>reset your password.</p>
                </div>

                <div className="" id="forgot-outer">
                  {/* <label htmlFor="phoneNumber" className="form-label">
                   Enter your Email Address 
                  </label> */}
                  <MDBInput
                    id="forgotphoneNumber"
                    type="text"
                    size="lg"
                   
                    maxLength="50"
                    className=
                      "form-control bg-transparent"
                       name="phoneNo"
                    autoComplete="off"
                  />
                
                </div>

                <div className="text-center text-md-start mt-4 pt-2">
                  {/* <MDBBtn className="custom-login mb-0 px-5">
                Login
              </MDBBtn> */}
                  <button className="custom-login btn btn-primary" type="submit">
                
                  Continue
                  </button>
                </div>

                <div className="mb-4 bak-to-login-btn">
                <Link to={"/enter-otp"} className="back-to-login" href="!#">enter new otp</Link>
                  <Link to={"/login"} className="back-to-login" href="!#">
                  <img src={backtologin} alt="edit" />  Back to Login
                  </Link>
                </div>
              </div>
            </form>
          </MDBCol>

          <MDBCol col="10" md="4">
            <img src={loginImg} className="img-fluid-login " alt="login" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ForgotPassword;