
import React, {useState} from "react";
import AppHeader from "../TopBar/AppHeader";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBCheckbox,
  } from "mdb-react-ui-kit";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { Link } from 'react-router-dom';
//import background from '../assets/images/heroimg.png';
import backtovehicle from '../../assets/images/left-arrow.png'
import { ClipLoader } from "react-spinners";
import SideBar2 from "../Hotel/SideBar2";
import profileImg from '../../assets/images/avtar1.jpg'
function EditProfile() {
    const [visible, setVisible] = useState(false);
    const [passVissible, setPassVissible] = useState(false);
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
      if (!passVissible) {
        setIcon(eye);
  
      } else {
        setIcon(eyeOff)
  
      }
    }
    return (
      <>
        <div className="container-fluidd">
  
          <div className="col-md-12">
  
            <div>
            <SideBar2/>
  
              <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                
                  <h1 class="heading-for-every-page">
                    <Link to="/super-admin/dashboard/">
                    <img src={backtovehicle} alt="edit" />  Edit Profile</Link></h1>
                 
                  
                  <div class="active-trip-outer">
                    {/* <h2>Add New Driver</h2> */}
                    <CRow>
  
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          
                          <CCol md={6} className="d-flex edit_profile_user mt-4 ml-2">
                            <div className="profile_img"><img src={profileImg} alt="profile-pic"/></div>
                                
                                <div className="profile_name_text">
                                <span><strong>Amanda Smith</strong></span><br/>
                                <span>
                                  <div className="mb-3" id="profile_img_outer">
                                   <CFormInput type="file" id="profileFile" />
                                  <span>Edit Profile Image</span> 
                                     </div></span>
                                </div>
                                
                              </CCol>
                              
                          
                          <CCardBody>
  
  
  
                            <form noValidate className="row g-3">
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputfirstname">First Name</CFormLabel>
                                <CFormInput aria-label="First name"
                                  maxLength="50"
                                  className=
                                    "form-control bg-transparent"
                                 
                                  name="FirstName"
                                  autoComplete="off" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputlastname">Last Name</CFormLabel>
                                <CFormInput aria-label="Last name"
                                  maxLength="50"
                                  className=
                                    "form-control bg-transparent"
                                  name="LastName"
                                  autoComplete="off" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                                <CFormInput type="email" id="inputEmail4" 
                                  maxLength="50"
                                  className=
                                    "form-control bg-transparent"
                                  name="Email"
                                  autoComplete="off" />
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="inputAddress">Address </CFormLabel>
                                <CFormInput id="inputAddress" 
                                  maxLength="50"
                                  className=
                                    "form-control bg-transparent"
                                  name="Address1"
                                  autoComplete="off" />   
                              </CCol>
                              <CCol xs={6}>
                              <CButton className="change_pwd_btn" onClick={() => setVisible(!visible)}>Change Password</CButton>
                              </CCol>
                       
                              <CCol md={12} className="edit_profile_btn">
                                <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                  <CButton type="submit" className="submiit-btn">Save Changes</CButton>
                                  <CButton type="button" className="canceel-btn">Cancel</CButton>
                                </div>
                              </CCol>
                            </form>
  
  
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
  
 {/* changepasswordmodalpopup */}

                   
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle id="changepassword">Change Passowrd</CModalTitle>
      </CModalHeader>
      <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4">
                            <CCardBody>
                            <form  noValidate>
              <div className="change-password-content">
                <div className="mb-4" id="pwd_field">
                  <label htmlFor="password" className="form-label">
                   New  Password
                  </label>
                  <MDBInput
                    id="password"
                    type={passVissible ? "text" : "password"}
                    size="lg" 
                    maxLength="50"
                    className=
                      "form-control bg-transparent input_pwd" 
                    name="password"
                    autoComplete="off"
                  />
                  
                  <span class="flex justify-around items-center eye_pwd_icon">
                    <Icon onClick={() => {
                      setPassVissible(!passVissible)
                      handleToggle()
                    }} class="absolute mr-10" icon={icon} size={25} />
                  </span>
                </div>

                <div className="mb-4" id="pwd_field">
                  <label htmlFor="password" className="form-label">
                  Confirm  Password
                  </label>
                  <MDBInput
                    id="password"
                    type={passVissible ? "text" : "password"}
                    size="lg"
                    
                    maxLength="50"
                    className=
                      "form-control bg-transparent input_pwd"
                     
                    name="password"
                    autoComplete="off"
                  />
                  
                  <span class="flex justify-around items-center eye_pwd_icon">
                    <Icon onClick={() => {
                      setPassVissible(!passVissible)
                      handleToggle()
                    }} class="absolute mr-10" icon={icon} size={25} />
                  </span>
                </div>



                {/* <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
             /> */}

                

                <div className="text-center text-md-start mt-4 pt-2">
                  {/* <MDBBtn className="custom-login mb-0 px-5">
                Login
              </MDBBtn> */}
                  <button className="custom-login btn btn-primary" type="submit" id="rest_btn">
                   Reset Password
                  </button>
                </div>
              </div>
            </form>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>

    </CModal>


      

     

                  {/* endpasswordpopup */}
  
                  </div>
  
                </div>
  

  
             

              </div>
            </div>
  
          </div>
        </div>
  
      </>
    );
}

export default EditProfile;