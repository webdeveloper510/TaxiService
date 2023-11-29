
import React, { useContext, useEffect, useState } from "react";
import AppHeader from "../TopBar/AppHeader";
import * as Yup from "yup";
import uploadfileImg from '../../assets/images/upload-btn.png'

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
import { changeForgotPass, changePass, editCompanyDetail } from "../../utils/api";
import { toast } from "react-toastify";
import userContext from "../../utils/context";
import SuperAdminSideBar from "../SuperAdmin/Sidebar/SideBar";
import SuperSideBar from "../Taxi/SiderNavBar/Sidebar";
function EditBookingForm() {
  const navigate = useNavigate()
  const { user, setUser, appLoaded, refreshUserData } = useContext(userContext)
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

 
  const validationSchemaProfile = Yup.object().shape({
    background_color: Yup.string()
      .required("First Name is required").trim(),
    logo: Yup.string()
      .required("Last Name is required").trim(),
   
  });

 
  const initialValuesProfile = {
    background_color: user?.background_color || "",
    logo: user?.last_name || "",
  };
  
 
  const [loading, setLoading] = useState(false)
  

  const formikProfile = useFormik({
    initialValues: initialValuesProfile,
    validationSchema: validationSchemaProfile,
    onSubmit: async (values) => {
       const formData = new FormData();

      formData.append('background_color', values.background_color);
      formData.append('logo', values.logo);
      setLoading(true);
      console.log("values", values);
      editCompanyDetail(user._id, formData).then((response) => {
        console.log("response---->>>>", response)
        if (response.data.code === 200

        ) {
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          refreshUserData()
          back()

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
  const [image, setImage] = useState(user?.logo);
  const [image1, setImage1] = useState(null);

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      formikProfile.setFieldValue('logo', selectedFile)
      setImage(URL.createObjectURL(selectedFile))
    }
  }
  const removefile = (e) => {
    formikProfile.setFieldValue('logo', "")
    setImage(null)
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
                    <img src={backtovehicle} alt="edit" />  Edit Booking Form Page</Link></h1>


                <div class="active-trip-outer">
                  {/* <h2>Add New Driver</h2> */}
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">



                        <CCardBody>



                          <form onSubmit={formikProfile.handleSubmit} noValidate className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputfirstname">Background Color</CFormLabel>
                              <CFormInput type="color" aria-label="background"

                                {...formikProfile.getFieldProps("background_color")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent input_pwd",
                                  {
                                    "is-invalid":
                                      formikProfile.touched.background_color && formikProfile.errors.background_color,
                                  },
                                  {
                                    "is-valid":
                                      formikProfile.touched.background_color && !formikProfile.errors.background_color,
                                  }
                                )}
                                name="background_color"
                                autoComplete="off"
                              />
                              {formikProfile.errors.background_color && formikProfile.touched.background_color ? (
                                <div className="text-danger text-start">{formikProfile.errors.background_color}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6} className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">Upload Logo</CFormLabel>

                              {image?.length > 0 ?
                                (
                                  <img src={image} alt='img' height={300} width={100} />
                                ) :
                                ""}

                              <CFormInput accept="image/*" type="file" id="formFile" onChange={(e) => { uploadFile(e) }}



                                name="file"
                                autoComplete="off" />

                              <label htmlFor="formFile" className="custom-file-upload">
                                <div className="files-outer">
                                  <img className="upload-icon" src={uploadfileImg} alt='img' /><br /><br />
                                  <span>Drop Logo Here ...</span>
                                </div>
                              </label>
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

export default EditBookingForm;