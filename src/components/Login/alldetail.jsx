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
import userContext from "../../utils/context";
function Address() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [doc, setDoc] = useState("");
  const { user, setUser, appLoaded } = useContext(userContext);
  const initialValues = {
    // FirstName: "",
    // LastName: "",
    Address1: "",
    Address2: "",
    Country: "Netherlands",
    City: "",
    Zip: "",
    companyName:"",
    bankNumber:"",
    kvk: "",
    // Email: "",
    // MobileNo: "",
    // Gender: "",
    file: "",
    doc,
  };
  useEffect(()=>{
    if(user?.isDocUploaded) navigate("/past-trips")
  },[])
  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .trim()
      .max(20, "Company Name must be at most 20 characters")
      .matches(/^[^\d]+$/, "Company Name is not valid")
      .required("Company Name is required"),
    kvk: Yup.string()
    .trim()
    .max(20, "KVK Number must be at most 20 characters")
    // .matches(/^[0-9]+$/, "Must be only digits")
    .required("KVK Number is required"),
    bankNumber: Yup.string()
      .trim()
      .max(20, "Bank Number must be at most 20 characters")
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Bank Number is required"),
    Address1: Yup.string()
      .trim()
      .max(20, "Address must be at most 20 characters")
      .required("Street Address 1  is required"),
    Address2: Yup.string()
      .trim()
      .max(20, "Address must be at most 20 characters")
      .required("Street Address 2  is required"),
    Country: Yup.string().trim().required("Country is required"),
    City: Yup.string().trim().required("City is required"),
    Zip: Yup.string().trim()
    .max(6, "ZIP Code must be at most 6 characters")
    .required("Zip is required"),
    // Email: Yup.string().trim().email().required("Email  is required"),
    // MobileNo: Yup.string()
    //   .trim()
    //   .matches(/^[0-9]+$/, "Must be only digits")
    //   .required("Mobile Number is required"),
    // Gender: Yup.string().trim().required("Gender is required"),
    file: Yup.mixed().required("Driver's Photo is required"),
    doc: Yup.mixed().required("Driver's Document is required"),
  });

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      formik.setFieldValue("file", selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };
  const removefile = (e) => {
    formik.setFieldValue("file", "");
    setImage(null);
  };
  const uploadDoc = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedDoc(selectedFile);
      formik.setFieldValue("doc", selectedFile);
      setDoc(URL.createObjectURL(selectedFile));
    }
  };
  const removeDoc = (e) => {
    setSelectedDoc(null);
    formik.setFieldValue("doc", "");
    setDoc(null);
  };
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [submitLoader, setSubmitLoader] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      const formData = new FormData();      
      formData.append("address_1", values.Address1);
      formData.append("address_2", values.Address2);
      formData.append("city", values.City);
      formData.append("country", values.Country);
      formData.append("zip_code", values.Zip);
      formData.append("driver_image", values.file);
      formData.append("driver_documents", values.doc);
      formData.append("companyName", values.companyName);
      formData.append("kvk", values.kvk);
      formData.append("bankNumber", values.bankNumber);
      formData.append("isDocUploaded","true")
      setSubmitLoader(true);
      editDriver(formData, user._id)
        .then((res) => {
          console.log("response from add driver --->>>>", res);
          if (res?.data?.code === 200) {
            toast.success(`${res.data.message}`, {
              position: "top-right",
              autoClose: 1000,
            });
            navigate("/driver-verification");
          } else {
            toast.warning(`${res?.data?.message || "There is some problem"}`, {
              position: "top-right",
              autoClose: 1000,
            });
          }
        })
        .finally(() => {
          setSubmitLoader(false);
        });
    },
  });

  const downloadFile = () => {
    if (selectedDoc) {
      const url = URL.createObjectURL(selectedDoc);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedDoc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  function previewPDF() {
    const file = selectedDoc;

    if (file && file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onload = function (e) {
        const pdfData = e.target.result;
        const newTab = window.open();
        newTab.document.write(
          '<embed width="100%" height="100%" src="data:application/pdf;base64,' +
            window.btoa(pdfData) +
            '" type="application/pdf" />'
        );
      };

      reader.readAsBinaryString(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  }

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
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="login-left-content">
                  <img src={loginLogo} className="login-  " alt="Logo" />
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    {/* <p className="lead me-3">LOG IN</p> */}
                  </div>
  
                  <MDBRow>
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label htmlFor="inputAddress" className="form-label">
                          Address 1
                        </label>
                        <CFormInput
                          id="inputAddress"
                          {...formik.getFieldProps("Address1")}
                          maxLength="50"
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.Address1 && formik.errors.Address1,
                            },
                            {
                              "is-valid":
                                formik.touched.Address1 &&
                                !formik.errors.Address1,
                            }
                          )}
                          name="Address1"
                          autoComplete="off"
                        />
                        {formik.errors.Address1 && formik.touched.Address1 ? (
                          <div className="text-danger text-start">
                            {formik.errors.Address1}
                          </div>
                        ) : null}
                      </div>
                    </MDBCol>
  
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label htmlFor="inputAddress2" className="form-label">
                          Address 2
                        </label>
                        <CFormInput
                          id="inputAddress2"
                          {...formik.getFieldProps("Address2")}
                          maxLength="50"
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.Address2 && formik.errors.Address2,
                            },
                            {
                              "is-valid":
                                formik.touched.Address2 &&
                                !formik.errors.Address2,
                            }
                          )}
                          name="Address2"
                          autoComplete="off"
                        />
                        {formik.errors.Address2 && formik.touched.Address2 ? (
                          <div className="text-danger">
                            {formik.errors.Address2}
                          </div>
                        ) : null}
                      </div>
                    </MDBCol>
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label htmlFor="inputcountry" className="form-label">
                          Country
                        </label>
                        <CFormSelect
                          id="inputcountry"
                          {...formik.getFieldProps("Country")}
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
                          autoComplete="off"
                        >
                          <option default>Netherlands</option>
                          {countryList.map((c) => {
                            return <option>{c}</option>;
                          })}
                        </CFormSelect>
  
                        {formik.errors.Country && formik.touched.Country ? (
                          <div className="text-danger">
                            {formik.errors.Country}
                          </div>
                        ) : null}
                      </div>
                    </MDBCol>
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label htmlFor="inputCity" className="form-label">
                          City
                        </label>
                        <CFormInput
                         
                          {...formik.getFieldProps("City")}
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
                          autoComplete="off"
                        />
                        {formik.errors.City && formik.touched.City ? (
                          <div className="text-danger text-start">{formik.errors.City}</div>
                        ) : null}
                      </div>
                    </MDBCol>
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label className="form-label">
                          Company Name
                        </label>
                        <CFormInput
                          
                          {...formik.getFieldProps("companyName")}
                          maxLength="50"
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.companyName && formik.errors.companyName,
                            },
                            {
                              "is-valid":
                                formik.touched.companyName && !formik.errors.companyName,
                            }
                          )}
                          name="companyName"
                          autoComplete="off"
                        />
                        {formik.errors.companyName && formik.touched.companyName ? (
                          <div className="text-danger text-start">{formik.errors.companyName}</div>
                        ) : null}
                      </div>
                    </MDBCol>
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label  className="form-label">
                          KVK Number
                        </label>
                        <CFormInput
                          
                          {...formik.getFieldProps("kvk")}
                          maxLength="50"
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.kvk && formik.errors.kvk,
                            },
                            {
                              "is-valid":
                                formik.touched.kvk && !formik.errors.kvk,
                            }
                          )}
                          name="kvk"
                          autoComplete="off"
                        />
                        {formik.errors.kvk && formik.touched.kvk ? (
                          <div className="text-danger text-start">{formik.errors.kvk}</div>
                        ) : null}
                      </div>
                    </MDBCol>
                    <MDBCol col="12" md="6">
                      <div className="mb-4">
                        <label className="form-label">
                          Bank Number
                        </label>
                        <CFormInput
                          {...formik.getFieldProps("bankNumber")}
                          maxLength="50"
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                formik.touched.bankNumber && formik.errors.bankNumber,
                            },
                            {
                              "is-valid":
                                formik.touched.bankNumber && !formik.errors.bankNumber,
                            }
                          )}
                          name="bankNumber"
                          autoComplete="off"
                        />
                        {formik.errors.bankNumber && formik.touched.bankNumber ? (
                          <div className="text-danger text-start">{formik.errors.bankNumber}</div>
                        ) : null}
                      </div>
                    </MDBCol>
                    <MDBCol col="12" md="6">
                      <div className="mb-4" id="pwd_field">
                        <label htmlFor="inputzip" className="form-label">
                          Zip
                        </label>
                        <CFormInput
                          id="inputZip"
                          {...formik.getFieldProps("Zip")}
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
                          autoComplete="off"
                        />
                        {formik.errors.Zip && formik.touched.Zip ? (
                          <div className="text-danger text-start">{formik.errors.Zip}</div>
                        ) : null}
                      </div>
                    </MDBCol>
  
                    <CCol
                      md={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                      className="upload-file-input image-docs"
                    >
                      <CFormLabel htmlFor="inputmobile">
                        Upload Profile Photo
                        <span class="asterisk-mark">*</span>
                      </CFormLabel>
  
                      <div
                        style={{
                          direction: "flex",
                          justifyContent: "center",
                          width: "60%",
                          margin: "auto",
                        }}
                        class="driver_img_outer"
                      >
                        {image?.length > 0 ? (
                          <>
                            <img src={image} alt="img" height={300} width={100} />
  
                            <button
                              className="remove-btn"
                              onClick={() => {
                                removefile();
                              }}
                            >
                              X
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {!image?.length > 0 && (
                        <>
                          <CFormInput
                            accept="image/*"
                            type="file"
                            id="formFile"
                            onChange={(e) => {
                              uploadFile(e);
                            }}
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
                            autoComplete="off"
                          />
  
                         
                          <label
                            htmlFor="formFile"
                            className="custom-file-upload"
                          >
                            <div className="files-outer">
                              <img
                                style={{
                                  objectFit: "contain",
                                  height: "100%",
                                }}
                                className="upload-icon"
                                src={uploadfileImg}
                                alt="img"
                              />
                              <br />
                              <br />
                              <span>Drop Image Here ...</span>
                            </div>
                          </label>
                          {!image && formik.errors.file && formik.touched.file ? (
                            <div className="text-danger text-start">
                              {formik.errors.file}
                            </div>
                          ) : null}
                        </>
                      )}
                    </CCol>
                    <CCol md={6} className="upload-file-input driver-docs">
                      <CFormLabel htmlFor="inputmobile">
                        Upload Driver Doc in PDF
                        <span class="asterisk-mark">*</span>
                      </CFormLabel>
  
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
                              removeDoc();
                            }}
                          >
                            X
                          </button>
                          <button
                            className="submit-btn"
                            type="button"
                            onClick={previewPDF}
                          >
                            Preview
                          </button>
                        </div>
                      )}
                      {!selectedDoc && (
                        <>
                          <CFormInput
                            type="file"
                            accept=".pdf"
                            id="formFile"
                            onChange={(e) => {
                              uploadDoc(e);
                            }}
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
                            autoComplete="off"
                          />
                        
                          <label
                            htmlFor="formFile"
                            className="custom-file-upload"
                          >
                            <div className="files-outer">
                              <img
                              style={{
                                objectFit: "contain",
                                height: "100%",
                              }}
                              className="upload-icon"
                                src={uploadfileImg}
                                alt="img"
                              />
                              <br />
                              <br />
                              <span>Drop Document Here ...</span>
                            </div>
                          </label>
                          {formik.errors.doc && formik.touched.doc ? (
                            <div className="text-danger text-start">{formik.errors.doc}</div>
                          ) : null}
                        </>
                      )}
                    </CCol>
                  </MDBRow>
                  <div className="d-flex justify-content-between mb-4 login-remember-forgot"></div>
  
                  <div className="text-center text-md-start mt-4 pt-2">
                    <button
                      className="custom-login btn btn-primary"
                      type="submit"
                    >
                      {loading ? <ClipLoader color="#000000" /> : "Upload"}
                    </button>
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
      </>
  );
}

export default Address;
