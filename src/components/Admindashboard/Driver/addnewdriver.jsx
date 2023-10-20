import React, { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
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
} from '@coreui/react'
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { addDriver } from "../../../utils/api";
import { toast } from 'react-toastify';
import uploadfileImg from '../../../assets/images/upload-btn.png'
//import background from '../assets/images/heroimg.png';

const AddNewDriver = () => {

  const navigate = useNavigate();




  const initialValues = {
    FirstName: "",
    LastName: "",
    Address1: "",
    Address2: "",
    Country: "",
    City: "",
    Zip: "",
    Email: "",
    MobileNo: "",
    Gender: "",
    file: "",
  };


  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("First Name No is required"),
    LastName: Yup.string().required("Last Name  is required"),
    Address1: Yup.string().required("Address1  is required"),
    Address2: Yup.string().required("Address2  is required"),
    Country: Yup.string().required("Country is required"),
    City: Yup.string().required("City  is required"),
    Zip: Yup.string().required("Zip is required"),
    Email: Yup.string().required("Email  is required"),
    MobileNo: Yup.string().required("MobileNo is required"),
    Gender: Yup.string().required("Gender is required"),
    file: Yup.mixed().required("Driver Documents are required"),
  });

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    formik.setFieldValue('file', selectedFile)
    console.log(selectedFile)
  }

  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    console.log(event.target.value);
    formik.setFieldValue('Gender', event.target.value)
  };


  const back = () => {
    formik.resetForm();
  }

  // const handleRadioChange = (event) => {
   

  // };

  
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      const formData = new FormData();

      formData.append('first_name', values.FirstName);
      formData.append('last_name', values.LastName);
      formData.append('address_1', values.Address1);
      formData.append('address_2', values.Address2);
      formData.append('city', values.Country);
      formData.append('country', values.City);
      formData.append('zip_code', values.Zip);
      formData.append('email', values.Email);
      formData.append('phone', values.MobileNo);
      formData.append('gender', values.Gender);
      formData.append('driver_image', values.file);
      formData.append('password', '12587574545');

      addDriver(formData).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate("/driver/listofdrivers")
        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      })


    },
  });


  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
            <SideBar2 />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                <h1 class="heading-for-every-page">Add New Driver</h1>
                <div class="active-trip-outer">
                  {/* <h2>Add New Driver</h2> */}
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Basic Infromation</strong>
                        </CCardHeader>
                        <CCardBody>



                          <form onSubmit={formik.handleSubmit} noValidate className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputfirstname">First Name</CFormLabel>
                              <CFormInput aria-label="First name" {...formik.getFieldProps("FirstName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.FirstName && formik.errors.FirstName,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.FirstName && !formik.errors.FirstName,
                                  }
                                )}
                                name="FirstName"
                                autoComplete="off" />
                              {formik.errors.FirstName && formik.touched.FirstName ? (
                                <div className="text-danger">{formik.errors.FirstName}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlastname">Last Name</CFormLabel>
                              <CFormInput aria-label="Last name" {...formik.getFieldProps("LastName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.LastName && formik.errors.LastName,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.LastName && !formik.errors.LastName,
                                  }
                                )}
                                name="LastName"
                                autoComplete="off" />
                              {formik.errors.LastName && formik.touched.LastName ? (
                                <div className="text-danger">{formik.errors.LastName}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputAddress">Street Address 1</CFormLabel>
                              <CFormInput id="inputAddress" {...formik.getFieldProps("Address1")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Address1 && formik.errors.Address1,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Address1 && !formik.errors.Address1,
                                  }
                                )}
                                name="Address1"
                                autoComplete="off" />
                              {formik.errors.Address1 && formik.touched.Address1 ? (
                                <div className="text-danger">{formik.errors.Address1}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputAddress2">Street Address 2</CFormLabel>
                              <CFormInput id="inputAddress2"  {...formik.getFieldProps("Address2")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Address2 && formik.errors.Address2,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Address2 && !formik.errors.Address2,
                                  }
                                )}
                                name="Address2"
                                autoComplete="off" />
                              {formik.errors.Address2 && formik.touched.Address2 ? (
                                <div className="text-danger">{formik.errors.Address2}</div>
                              ) : null}
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputcountry">Country</CFormLabel>
                              <CFormSelect id="inputcountry" {...formik.getFieldProps("Country")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Country && formik.errors.Country,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Country && !formik.errors.Country,
                                  }
                                )}
                                name="Country"
                                autoComplete="off" >
                                  <option default>Select Country</option>
                                <option>India</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>USA</option>
                                <option>AUS</option>
                              </CFormSelect>

                              {formik.errors.Country && formik.touched.Country ? (
                                <div className="text-danger">{formik.errors.Country}</div>
                              ) : null}
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputCity">City</CFormLabel>
                              <CFormInput id="inputCity" {...formik.getFieldProps("City")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.City && formik.errors.City,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.City && !formik.errors.City,
                                  }
                                )}
                                name="City"
                                autoComplete="off" />
                              {formik.errors.City && formik.touched.City ? (
                                <div className="text-danger">{formik.errors.City}</div>
                              ) : null}
                            </CCol>

                            <CCol md={4}>
                              <CFormLabel htmlFor="inputZip">Zip</CFormLabel>
                              <CFormInput id="inputZip" {...formik.getFieldProps("Zip")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Zip && formik.errors.Zip,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Zip && !formik.errors.Zip,
                                  }
                                )}
                                name="Zip"
                                autoComplete="off" />
                              {formik.errors.Zip && formik.touched.Zip ? (
                                <div className="text-danger">{formik.errors.Zip}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                              <CFormInput type="email" id="inputEmail4" {...formik.getFieldProps("Email")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Email && formik.errors.Email,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Email && !formik.errors.Email,
                                  }
                                )}
                                name="Email"
                                autoComplete="off" />
                              {formik.errors.Email && formik.touched.Email ? (
                                <div className="text-danger">{formik.errors.Email}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputmobile">Mobile No.</CFormLabel>
                              <CFormInput type="number" id="inputmobile" {...formik.getFieldProps("MobileNo")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.MobileNo && formik.errors.MobileNo,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.MobileNo && !formik.errors.MobileNo,
                                  }
                                )}
                                name="MobileNo"
                                autoComplete="off" />
                              {formik.errors.MobileNo && formik.touched.MobileNo ? (
                                <div className="text-danger">{formik.errors.MobileNo}</div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputgender">Gender</CFormLabel>
                              <fieldset className="row mb-12">
                              <CCol sm={12}>
          <CFormCheck inline
            type="radio"
            name="gridRadios"
            id="gridRadios1"
            value="Male"
            label="Male"
            onChange={handleGenderChange} // Add the onChange event handler
            checked={selectedGender === 'Male'} // Set the checked state if Male is selected
          />
          <CFormCheck inline
            type="radio"
            name="gridRadios"
            id="gridRadios2"
            value="Female"
            label="Female"
            onChange={handleGenderChange} // Add the onChange event handler
            checked={selectedGender === 'Female'} // Set the checked state if Female is selected
          />
        </CCol>
                              </fieldset>
                            </CCol>




{/* 
                            <CCol md={12} className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">Upload Profile Photo</CFormLabel><br />
                              {uploadedImages.length > 0 ? (
                                <div className="uploaded-images">
                                  {uploadedImages.map((url, index) => (
                                    <img key={index} src={url} alt={`Uploaded ${index + 1}`} />
                                  ))}
                                </div>
                              ) : (
                                <>
                                  <input
                                    type="file"
                                    id="formFile"
                                    onChange={handleImageUpload}
                                    multiple // Allow multiple file selection
                                    style={{ display: "none" }}
                                  />
                                  <label htmlFor="formFile" className="custom-file-upload">
                                  <div className="files-outer">
                                  <img className="upload-icon" src={uploadfileImg}/><br/><br/>
                                    <span>Drop files here or click to upload.</span>
                                    </div>
                                  </label>
                                </>
                              )}
                            </CCol> */}




                            <CCol md={12}  className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">Upload Profile Photo</CFormLabel>
                              
                              <CFormInput type="file" id="formFile" onChange={(e) => { uploadFile(e) }}

                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.file && formik.errors.file,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.file && !formik.errors.file,
                                  }
                                )}
                                name="file"
                                autoComplete="off" />
                              {formik.errors.file && formik.touched.file ? (
                                <div className="text-danger">{formik.errors.file}</div>
                              ) : null}
                                  <label htmlFor="formFile" className="custom-file-upload">
                                  <div className="files-outer">
                                  <img className="upload-icon" src={uploadfileImg}/><br/><br/>
                                    <span>Drop Image Here ...</span>
                                    </div>
                                  </label>
                            </CCol>
                            <CCol xs={12}>
                              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                <CButton type="submit" className="submit-btn">Submit</CButton>
                                <CButton type="button" className="cancel-btn" onClick={back}>Cancel</CButton>
                              </div>
                            </CCol>
                          </form>


                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>



                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </>
  );
};

export default AddNewDriver; 