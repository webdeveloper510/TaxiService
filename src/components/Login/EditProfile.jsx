
import React, {useState} from "react";
import AppHeader from "../TopBar/AppHeader";
import * as Yup from "yup";
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
import { useFormik } from "formik";
import { changeForgotPass, changePass } from "../../utils/api";
import { toast } from "react-toastify";
function EditProfile() {
    const [visible, setVisible] = useState(false);
    const [passVissible, setPassVissible] = useState(false);
    const [icon, setIcon] = useState(eyeOff);
    const [passVissibleOld, setPassVissibleOld] = useState(false);
    const [iconOld, setIconOld] = useState(eyeOff);
    const validationSchema = Yup.object().shape({
      password: Yup.string()
      .min(6, "Password must be 6 characters long")
      // .matches(/[0-9]/, "Password requires a number")
      // .matches(/[a-z]/, "Password requires a lowercase letter")
      // .matches(/[A-Z]/, "Password requires an uppercase letter")
      // .matches(/[^\w]/, "Password requires a symbol")
      .required("Password is required"),
      newPassword: Yup.string()
        .min(6, "New Password must be 6 characters long")
        // .matches(/[0-9]/, "Password requires a number")
        // .matches(/[a-z]/, "Password requires a lowercase letter")
        // .matches(/[A-Z]/, "Password requires an uppercase letter")
        // .matches(/[^\w]/, "Password requires a symbol")
        .required("Confirm Password is required"),
    });
  
    const initialValues = {
      password: "",
      newPassword: "",
    };
    const handleToggle = () => {
      if (!passVissible) {
        setIcon(eye);
  
      } else {
        setIcon(eyeOff)
  
      }
    }
    const handleToggleOld = () => {
      console.log("Toggle old password: ", !passVissibleOld);
      if (!passVissibleOld) {
        setIconOld(eye);
  
      } else {
        setIconOld(eyeOff)
  
      }
    }
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        if(values.password == values.newPassword){
          toast.warning("New Password and Old Password must not be same", {
            position: 'top-right',
            autoClose: 1000,
          });
          return
        }
        setLoading(true);
        console.log("values", values);
        changePass({
          oldPassword:values.password,
          password:values.newPassword
        }).then((response) => {
          console.log("response---->>>>", response)
          if (response.data.code === 200
          
          ) {
            toast.success(`${response.data.message}`, {
              position: 'top-right',
              autoClose: 1000,
            });
            setVisible(false)
  
          } else {
            toast.warning(`${response.data.message}`, {
              position: 'top-right',
              autoClose: 1000,
            });
          }
        }).catch((error) => {
          console.log(error)
        }).finally(() => { setLoading(false) })
      },
    });
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
                              <CCol md={6}>
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
        <CModalTitle id="changepassword">Change Password</CModalTitle>
      </CModalHeader>
      <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4">
                            <CCardBody>
                            <form  onSubmit={formik.handleSubmit} noValidate>
              <div className="change-password-content">
                <div className="mb-4" id="pwd_field">
                  <label htmlFor="password" className="form-label">
                   Old  Password
                  </label>
                  <MDBInput
                    id="password"
                    type={passVissible ? "text" : "password"}
                    size="lg" 
                    {...formik.getFieldProps("password")}
                    maxLength="50"
                    className={clsx(
                      "form-control bg-transparent input_pwd",
                      {
                        "is-invalid":
                          formik.touched.password && formik.errors.password,
                      },
                      {
                        "is-valid":
                          formik.touched.password && !formik.errors.password,
                      }
                    )}
                    name="password"
                    autoComplete="off"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-danger text-start">{formik.errors.password}</div>
                  ) : null}

                  
                  <span class="flex justify-around items-center eye_pwd_icon">
                    <Icon onClick={() => {
                      setPassVissibleOld(!passVissibleOld)
                      handleToggleOld()
                    }} class="absolute mr-10" icon={iconOld} size={25} />
                  </span>
                </div>

                <div className="mb-4" id="pwd_field">
                  <label htmlFor="password" className="form-label">
                  New  Password
                  </label>
                  <MDBInput
                    id="password"
                    type={passVissible ? "text" : "password"}
                    size="lg"
                    {...formik.getFieldProps("newPassword")}
                    maxLength="50"
                    className={clsx(
                      "form-control bg-transparent input_pwd",
                      {
                        "is-invalid":
                          formik.touched.newPassword && formik.errors.newPassword,
                      },
                      {
                        "is-valid":
                          formik.touched.newPassword && !formik.errors.newPassword,
                      }
                    )}
                    name="newPassword"
                    autoComplete="off"
                  />
                  {formik.errors.newPassword && formik.touched.newPassword ? (
                    <div className="text-danger text-start">{formik.errors.newPassword}</div>
                  ) : null}

                  
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