import React, { useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
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
import SuperSideBar from "../SiderNavBar/Sidebar";
import { countryList } from "../../../utils/saticData";
import { ClipLoader } from "react-spinners";
import SuperAdminSideBar from "../../SuperAdmin/Sidebar/SideBar";
//import background from '../assets/images/heroimg.png';

const AddNewDriver = () => {

  const navigate = useNavigate();


  const [image, setImage] = useState('');
  const [doc, setDoc] = useState('');
  const initialValues = {
    FirstName: "",
    LastName: "",
    Address1: "",
    Address2: "",
    Country: "Netherlands",
    City: "",
    Zip: "",
    Email: "",
    MobileNo: "",
    Gender: "",
    file: "",
    doc
  };
  const handleMobile = (event, max) => {
    const pattern = /^[0-9]+$/;
    if (
      event.key === "Backspace" ||
      event.key === "Enter" ||
      event.key === "Tab" ||
      event.key === "Shift" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      formik.setFieldValue(event.target.name, event.target.value);
      formik.setFieldTouched(event.target.name, true);
    } else {
      let value = event.target.value.toString();
      if (value.length > max) {
        event.stopPropagation();
        event.preventDefault();
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          formik.setFieldValue(event.target.name, event.target.value);
          formik.setFieldTouched(event.target.name, true);
        }
      }
    }
  };

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().trim().required("First Name No is required"),
    LastName: Yup.string().trim().required("Last Name  is required"),
    Address1: Yup.string().trim().required("Address1  is required"),
    Address2: Yup.string().trim().required("Address2  is required"),
    Country: Yup.string().trim().required("Country is required"),
    City: Yup.string().trim().required("City  is required"),
    Zip: Yup.string().trim().required("Zip is required"),
    Email: Yup.string().trim().email().required("Email  is required"),
    MobileNo: Yup.string().trim().matches(/^[0-9]+$/, "Must be only digits").required("MobileNo is required"),
    Gender: Yup.string().trim().required("Gender is required"),
    file: Yup.mixed().required("Driver's Photo is required"),
    doc: Yup.mixed().required("Driver's Document is required"),
  });

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      formik.setFieldValue('file', selectedFile)
      setImage(URL.createObjectURL(selectedFile))
    }
  }
  const removefile = (e) => {
    formik.setFieldValue('file', "")
    setImage(null)
  }
  const uploadDoc = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedDoc(selectedFile)
      formik.setFieldValue('doc', selectedFile)
      setDoc(URL.createObjectURL(selectedFile))
    }
  }
  const removeDoc = (e) => {
    setSelectedDoc(null)
    formik.setFieldValue('doc', "")
    setDoc(null)

  }
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    console.log(event.target.value);
    formik.setFieldValue('Gender', event.target.value)
  };


  const back = () => {
    navigate("/super-admin/driver/listofdrivers")
  }

  // const handleRadioChange = (event) => {


  // };
  const [submitLoader, setSubmitLoader] = useState(false);

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
      formData.append('city', values.City);
      formData.append('country', values.Country);
      formData.append('zip_code', values.Zip);
      formData.append('email', values.Email);
      formData.append('phone', values.MobileNo);
      formData.append('gender', values.Gender);
      formData.append('driver_image', values.file);
      formData.append('driver_documents', values.doc);
      formData.append('password', '12587574545');
      setSubmitLoader(true);
      addDriver(formData).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          // navigate("/taxi/drivernavigate/listofdrivers")
          navigate("/super-admin/driver/listofdrivers")
        } else {
          toast.warning(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      }).finally(()=>{
        setSubmitLoader(false)
      })


    },
  });

  const downloadFile = () => {
    if (selectedDoc) {
      const url = URL.createObjectURL(selectedDoc);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedDoc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  function previewPDF() {
    const file = selectedDoc

    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();

        reader.onload = function (e) {
            const pdfData = e.target.result;

            // Open a new tab with the PDF content
            const newTab = window.open();
            newTab.document.write('<embed width="100%" height="100%" src="data:application/pdf;base64,' + window.btoa(pdfData) + '" type="application/pdf" />');
        };

        reader.readAsBinaryString(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
}
  return (
    <>
      <div className="container-fluidd">

        <div className="col-md-12">

          <div>
          <SuperAdminSideBar/>

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3" style={{ paddingBottom: "20px" }}>
                {/* <h1 class="heading-for-every-page">Add New Super Driver</h1> */}
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
                              <CFormLabel htmlFor="inputfirstname">First Name<span class="asterisk-mark">*</span></CFormLabel>
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
                              <CFormLabel htmlFor="inputlastname">Last Name<span class="asterisk-mark">*</span></CFormLabel>
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
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputAddress">Street Address 1<span class="asterisk-mark">*</span></CFormLabel>
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
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputAddress2">Street Address 2<span class="asterisk-mark">*</span></CFormLabel>
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
                                <option default>Netherlands</option>
                                {countryList.map((c)=>{
                                   return (<option>{c}</option>)
                                })}

                              </CFormSelect>

                              {formik.errors.Country && formik.touched.Country ? (
                                <div className="text-danger">{formik.errors.Country}</div>
                              ) : null}
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputCity">City<span class="asterisk-mark">*</span></CFormLabel>
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
                              <CFormLabel htmlFor="inputZip">Zip<span class="asterisk-mark">*</span></CFormLabel>
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
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputEmail4">Email<span class="asterisk-mark">*</span></CFormLabel>
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
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputmobile">Mobile No.<span class="asterisk-mark">*</span></CFormLabel>
                              <CFormInput type="text" id="inputmobile"
                                onKeyDown={(e) => {
                                  handleMobile(e, 17);
                                }}
                                {...formik.getFieldProps("MobileNo")}
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


                            <CCol md={3} className="gender-outer">
                              <CFormLabel htmlFor="inputgender">Gender<span class="asterisk-mark">*</span></CFormLabel>
                              <fieldset className="row mb-12">
                                <CCol sm={12} className="radio_inner">
                                  <CFormCheck inline
                                    type="radio"
                                    name="Gender"
                                    id="gridRadios1"
                                    value="Male"
                                    label="Male"
                                    onChange={handleGenderChange} // Add the onChange event handler
                                    checked={selectedGender === 'Male'} // Set the checked state if Male is selected
                                  />
                                  <CFormCheck inline
                                    type="radio"
                                    name="Gender"
                                    id="gridRadios2"
                                    value="Female"
                                    label="Female"
                                    onChange={handleGenderChange} // Add the onChange event handler
                                    checked={selectedGender === 'Female'} // Set the checked state if Female is selected
                                  />
                                </CCol>
                                {formik.errors.Gender && formik.touched.Gender ? (
                                <div className="text-danger">{formik.errors.Gender}</div>
                              ) : null}
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




                            <CCol md={6} className="upload-file-input image-docs">
                              <CFormLabel htmlFor="inputmobile">Upload Profile Photo<span class="asterisk-mark">*</span></CFormLabel>

                              <div class="driver_img_outer">
                                {image?.length > 0 ?
                                  (
                                    <>
                                      <img src={image} alt='img' height={300} width={100} />

                                      <button
                                        className="remove-btn"
                                        onClick={() => {
                                         removefile()
                                        }}
                                      >X</button></>
                                  ) :
                                  ""}</div>
                                  {!image?.length > 0 && <>
                              <CFormInput  accept="image/*" type="file" id="formFile" onChange={(e) => { uploadFile(e) }}

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
                             
                             
                                {!image && formik.errors.file && formik.touched.file ? (
                                  <div className="text-danger">{formik.errors.file}</div>
                                ) : null}
                                <label htmlFor="formFile" className="custom-file-upload">
                                  <div className="files-outer">
                                    <img className="upload-icon" src={uploadfileImg} alt='img' /><br /><br />
                                    <span>Drop Image Here ...</span>
                                  </div>
                                </label>
                              </>}
                            </CCol>

                            <CCol md={6} className="upload-file-input driver-docs">

                              <CFormLabel htmlFor="inputmobile">Upload Driver Doc in PDF<span class="asterisk-mark">*</span></CFormLabel>

                              {/* {doc?.length > 0 ?
                                (
                                  <embed src={doc} height={300} width={100} />
                                ) :
                                ""} */}
                              {selectedDoc && (
                                <div class="pdf_doc">
                                  <p>Selected file: {selectedDoc.name}</p>
                                  <button
                                    className="remove-btn"
                                    onClick={() => {
                                      removeDoc()
                                    }}
                                  >X</button>
                                  <button
                                    className="submit-btn"
                                    onClick={previewPDF}>Preview</button>
                             
                                </div>
                              )}
                              {!selectedDoc && <>
                                <CFormInput type="file"
                                  accept=".pdf"
                                  id="formFile" onChange={(e) => { uploadDoc(e) }}

                                  className={clsx(
                                    "form-control bg-transparent",
                                    {
                                      "is-invalid":
                                        formik.touched.doc && formik.errors.doc,
                                    },
                                    {
                                      "is-valid":
                                        formik.touched.doc && !formik.errors.doc,
                                    }
                                  )}
                                  name="doc"
                                  autoComplete="off" />
                                {formik.errors.doc && formik.touched.doc ? (
                                  <div className="text-danger">{formik.errors.doc}</div>
                                ) : null}
                                <label htmlFor="formFile" className="custom-file-upload">
                                  <div className="files-outer">
                                    <img className="upload-icon" src={uploadfileImg} alt='img' /><br /><br />
                                    <span>Drop Document Here ...</span>
                                  </div>
                                </label>

                              </>}
                            </CCol>
                            <CCol xs={12}>
                              <div className="d-flex justify-content-center" style={{ marginTop: "40px" }}>
                                <CButton type="submit" className="submit-btn">{submitLoader?<ClipLoader color="#000000" />:"Submit"}</CButton>

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