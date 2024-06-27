
import React, { useContext, useEffect, useState } from "react";
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
import { Link, useNavigate } from 'react-router-dom';
//import background from '../assets/images/heroimg.png';
import backtovehicle from '../../assets/images/left-arrow.png'
import { ClipLoader } from "react-spinners";
import SideBar2 from "../Hotel/SideBar2";
import profileImg from '../../assets/images/avtar1.jpg'
import { useFormik } from "formik";
import { changeForgotPass, changePass, editCompanyDetail, getProfile } from "../../utils/api";
import { toast } from "react-toastify";
import userContext from "../../utils/context";
import SuperAdminSideBar from "../SuperAdmin/Sidebar/SideBar";
import SuperSideBar from "../Taxi/SiderNavBar/Sidebar";
function EditProfile() {
  const navigate = useNavigate()
  const { user, setUser, appLoaded } = useContext(userContext)
  useEffect(() => {
    if (appLoaded) {
      if (!user) {
        navigate("/");
      }
    };
  }, [appLoaded])
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
  const validationSchemaProfile = Yup.object().shape({
    firstName: Yup.string()
    .matches(/^[^\d]+$/, 'First Name is not valid')
      .required("First Name is required").trim(),
    lastName: Yup.string()
    .matches(/^[^\d]+$/, 'Last Name is not valid')
      .required("Last Name is required").trim(),
    companyName: Yup.string()
    .required("Last Name is required").trim(),
    phone: Yup.string().min(6).max(16).trim().required(),
    email: Yup.string().trim().required()
  });

  const initialValues = {
    password: "",
    newPassword: "",
  };
  const initialValuesProfile = {
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    companyName: user?.company_detail?.company_name || "",
    phone: user?.phone || "",
    email: user?.email || ""
  };
  const handleToggle = () => {
    if (!passVissible) {
      setIcon(eye);

    } else {
      setIcon(eyeOff)

    }
  }
  const handleToggleOld = () => {
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
      if (values.password == values.newPassword) {
        toast.warning("New Password and Old Password must not be same", {
          position: 'top-right',
          autoClose: 1000,
        });
        return
      }
      setLoading(true);
      console.log("values", values);
      changePass({
        oldPassword: values.password,
        password: values.newPassword
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
  
  useEffect(()=>{
    if(!visible){
      setIcon(eyeOff)
      setIconOld(eyeOff);
      formik.resetForm();
    }
  },[visible])
  const formikProfile = useFormik({
    initialValues: initialValuesProfile,
    validationSchema: validationSchemaProfile,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("values", values);
      const payLoad = {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        company_name: values.companyName.trim(),
        phone: values.phone.trim(),
      }
      editCompanyDetail(user._id, payLoad).then((response) => {
        console.log("response---->>>>", response)
        if (response.data.code === 200

        ) {
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          const newUser = { ...user };
          newUser.first_name = values.firstName.trim();
          newUser.last_name = values.lastName.trim();
          formikProfile.setFieldValue("firstName", newUser.first_name);
          formikProfile.setFieldValue("lastName", newUser.last_name);
          getProfile(localStorage.getItem('token')).then(res => {
            console.log(res, 'profile data')
            if (res?.code === 200) {
              setUser(res.result)

            }else{
              console.log("remove token from wrong app")
              localStorage.clear();
              navigate("/")
            }
          }).catch((err)=>{
            console.log("remove token from catch app")
            localStorage.clear();
            navigate("/")
          })
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
  const back = ()=>{
    navigate("/")
  }
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            {
              user?.role == "SUPER_ADMIN" && <SuperAdminSideBar />
            }
            {
              user?.role == "COMPANY" && <SuperSideBar />
            }
            {
              user?.role == "HOTEL" && <SideBar2 />
            }

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

                        {/* <CCol md={6} className="d-flex edit_profile_user mt-4 ml-2">
                            <div className="profile_img"><img src={profileImg} alt="profile-pic"/></div>
                                
                                <div className="profile_name_text">
                                <span><strong>Amanda Smith</strong></span><br/>
                                <span>
                                  <div className="mb-3" id="profile_img_outer">
                                   <CFormInput type="file" id="profileFile" />
                                  <span>Edit Profile Image</span> 
                                     </div></span>
                                </div>
                                
                              </CCol> */}


                        <CCardBody>



                          <form onSubmit={formikProfile.handleSubmit} noValidate className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputfirstname">First Name</CFormLabel>
                              <CFormInput aria-label="First name"

                                {...formikProfile.getFieldProps("firstName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent input_pwd",
                                  {
                                    "is-invalid":
                                      formikProfile.touched.firstName && formikProfile.errors.firstName,
                                  },
                                  {
                                    "is-valid":
                                      formikProfile.touched.firstName && !formikProfile.errors.firstName,
                                  }
                                )}
                                name="firstName"
                                autoComplete="off"
                              />
                              {formikProfile.errors.firstName && formikProfile.touched.firstName ? (
                                <div className="text-danger text-start">{formikProfile.errors.firstName}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlastname">Last Name</CFormLabel>
                              <CFormInput aria-label="Last name"
                                {...formikProfile.getFieldProps("lastName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent input_pwd",
                                  {
                                    "is-invalid":
                                      formikProfile.touched.lastName && formikProfile.errors.lastName,
                                  },
                                  {
                                    "is-valid":
                                      formikProfile.touched.lastName && !formikProfile.errors.lastName,
                                  }
                                )}
                                name="lastName"
                                autoComplete="off"
                              />
                              {formikProfile.errors.lastName && formikProfile.touched.lastName ? (
                                <div className="text-danger text-start">{formikProfile.errors.lastName}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlastname">Company Name</CFormLabel>
                              <CFormInput aria-label="Last name"
                                {...formikProfile.getFieldProps("companyName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent input_pwd",
                                  {
                                    "is-invalid":
                                      formikProfile.touched.companyName && formikProfile.errors.companyName,
                                  },
                                  {
                                    "is-valid":
                                      formikProfile.touched.companyName && !formikProfile.errors.companyName,
                                  }
                                )}
                                name="companyName"
                                autoComplete="off"
                              />
                              {formikProfile.errors.companyName && formikProfile.touched.companyName ? (
                                <div className="text-danger text-start">{formikProfile.errors.companyName}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlastname">Phone Number</CFormLabel>
                              <CFormInput aria-label="Last name"
                                {...formikProfile.getFieldProps("phone")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent input_pwd",
                                  {
                                    "is-invalid":
                                      formikProfile.touched.phone && formikProfile.errors.phone,
                                  },
                                  {
                                    "is-valid":
                                      formikProfile.touched.phone && !formikProfile.errors.phone,
                                  }
                                )}
                                name="phone"
                                autoComplete="off"
                              />
                              {formikProfile.errors.phone && formikProfile.touched.phone ? (
                                <div className="text-danger text-start">{formikProfile.errors.phone}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlastname">Email</CFormLabel>
                              <CFormInput aria-label="Last name"
                              disabled
                                {...formikProfile.getFieldProps("email")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent input_pwd",
                                  {
                                    "is-invalid":
                                      formikProfile.touched.email && formikProfile.errors.email,
                                  },
                                  {
                                    "is-valid":
                                      formikProfile.touched.email && !formikProfile.errors.email,
                                  }
                                )}
                                name="email"
                                autoComplete="off"
                              />
                              {formikProfile.errors.email && formikProfile.touched.email ? (
                                <div className="text-danger text-start">{formikProfile.errors.email}</div>
                              ) : null}
                            </CCol>
                            {/* <CCol md={6}>
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
<<<<<<< HEAD
                              </CCol> */}
                            <CCol xs={6}>
                              </CCol>
                            <CCol md={6}>
                              <CButton className="change_pwd_btn" onClick={() => setVisible(!visible)}>Change Password</CButton>
                            </CCol>

                            <CCol md={12} className="edit_profile_btn">
                              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                <CButton type="submit" className="submiit-btn">Update</CButton>
                                <CButton type="button" className="canceel-btn"
                                onClick={back}
                                >Cancel</CButton>
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
                              <form onSubmit={formik.handleSubmit} noValidate>
                                <div className="change-password-content">
                                  <div className="mb-4" id="pwd_field">
                                    <label htmlFor="password" className="form-label">
                                      Old  Password
                                    </label>
                                    <MDBInput
                                      id="password"
                                      type={passVissibleOld ? "text" : "password"}
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