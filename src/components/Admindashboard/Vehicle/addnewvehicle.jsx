import React, { useState, useEffect } from "react";
import AppHeader from "../../TopBar/AppHeader";
import SideBar2 from "../SideBar2"
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
//import background from '../assets/images/heroimg.png';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormCheck,
  CRow,
} from '@coreui/react'
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import { addVehicle, getVehicleType } from "../../../utils/api";
import uploadfileImg from '../../../assets/images/upload-btn.png'
const AddNewVehicle = () => {


  const navigate = useNavigate();
  const [vehicleinsuranceDate, setInsuranceDate] = useState(new Date()); // Initialize with the current date for insurance renewal date

  const initialValues = {
    vehicleNo: "",
    vehicleType: "",
    vehicleModal: "",
    seatingCapacity: "",
    // pricePerKm: "",
    // minimumFare: "",
    // commission: "",
    passengerTimeLimit: "",
    passengerCharges: "",
    vehicleinsuranceDate: new Date(),
    file: "",
    AC: '',
  };

  const validationSchema = Yup.object().shape({
    vehicleNo: Yup.string().required("Vehicle No is required"),
    vehicleType: Yup.string().required("Vehicle Type is required"),
    vehicleModal: Yup.string().required("Vehicle Modal is required"),
    seatingCapacity: Yup.string().required("Seating Capacity is required"),
    // pricePerKm: Yup.string().required("Price per km is required"),
    // minimumFare: Yup.string().required("Minimum Fare is required"),
    // commission: Yup.string().required("Commission is required"),
    passengerTimeLimit: Yup.string().required("Passenger Time Limit is required"),
    passengerCharges: Yup.string().required("Passenger Cancellation Charges is required"),
    vehicleinsuranceDate: Yup.date().required("Insurance Renewal Date is required"),
    file: Yup.mixed().required("Vehicle Documents are required"),
    AC: Yup.string().required("Gender is required"),
  });

  const [vehicleType, setVehicleType] = useState()

  const [selectedAC, setSelectedAC] = useState('');

  const [image, setImage] = useState('');

  const handleACtype = (event) => {
    setSelectedAC(event.target.value);
    console.log(event.target.value);
    formik.setFieldValue('AC', event.target.value)
  };

  useEffect(() => {

    getVehicleType("Active").then(res => {
      console.log(res.result, 'vehicle')
      if (res.code === 200) {
        setVehicleType(res.result)
      }
    })

  }, []);


  const back = () => {
    formik.resetForm();
  }


  const handlevehicleInsuranceDateChange = (date) => {
    setInsuranceDate(date);
    formik.setFieldValue('vehicleinsuranceDate', date)
  };

  const uploadFile = (e) => {
    const selectedFile = e.target.files[0];
    formik.setFieldValue('file', selectedFile)
    setImage(URL.createObjectURL(selectedFile))
  
   
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      const formData = new FormData();

      formData.append('vehicle_number', values.vehicleNo);
      formData.append('vehicle_type', values.vehicleType);
      formData.append('vehicle_model', values.vehicleModal);
      formData.append('seating_capacity', values.seatingCapacity);
      // formData.append('price_per_km', values.pricePerKm);
      // formData.append('minimum_fare', values.minimumFare);
      // formData.append('commision', values.commission);
      formData.append('cancelation_time_limit', values.passengerTimeLimit);
      formData.append('cancelation_charges', values.passengerCharges);
      formData.append('insurance_renewal_date', values.vehicleinsuranceDate);
      formData.append('vehicle_photo', values.file)
      formData.append('AC', values.AC)

      addVehicle(formData).then((res) => {
        console.log("response---->>>>", res)
        if (res.data.code === 200) {
          toast.success(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          navigate("/vehicle/viewallvehicle")
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
                <h1 class="heading-for-every-page">Add New Vehicle</h1>
                <div class="active-trip-outer">
                  {/* <h2>Add New Vehicle</h2> */}
                  {/********** vehicle---information---form *****************/}
                  <CRow>

                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Vehicle Infromation</strong>
                        </CCardHeader>
                        <CCardBody>
                          
                          <form onSubmit={formik.handleSubmit} noValidate className="row g-3">

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehiclenum">Vehicle No.</CFormLabel>
                              <CFormInput aria-label="vehicle no."  {...formik.getFieldProps("vehicleNo")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicleNo && formik.errors.vehicleNo,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicleNo && !formik.errors.vehicleNo,
                                  }
                                )}
                                name="vehicleNo"
                                autoComplete="off" />
                              {formik.errors.vehicleNo && formik.touched.vehicleNo ? (
                                <div className="text-danger">{formik.errors.vehicleNo}</div>
                              ) : null}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">Vehicle Type</CFormLabel>
                              <CFormSelect  {...formik.getFieldProps("vehicleType")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicleType && formik.errors.vehicleType,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicleType && !formik.errors.vehicleType,
                                  }
                                )}
                                name="vehicleType"
                                autoComplete="off" >

                                <option default>Select Vehicle Type</option>
                                {vehicleType?.map((e, i) => {
                                  return (
                                    <>
                                      <option value={e.name} >{e.name}</option>
                                    </>
                                  )
                                })}
                              </CFormSelect>
                              {formik.errors.vehicleType && formik.touched.vehicleType ? (
                                <div className="text-danger">{formik.errors.vehicleType}</div>
                              ) : null}
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputvehivlemodal">Vehicle Model</CFormLabel>
                              <CFormInput   {...formik.getFieldProps("vehicleModal")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicleModal && formik.errors.vehicleModal,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicleModal && !formik.errors.vehicleModal,
                                  }
                                )}
                                name="vehicleModal"
                                autoComplete="off" />
                              {formik.errors.vehicleModal && formik.touched.vehicleModal ? (
                                <div className="text-danger">{formik.errors.vehicleModal}</div>
                              ) : null}
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputseating">Seating Capacity</CFormLabel>
                              <CFormInput  {...formik.getFieldProps("seatingCapacity")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.seatingCapacity && formik.errors.seatingCapacity,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.seatingCapacity && !formik.errors.seatingCapacity,
                                  }
                                )}
                                name="seatingCapacity"
                                autoComplete="off" />
                              {formik.errors.seatingCapacity && formik.touched.seatingCapacity ? (
                                <div className="text-danger">{formik.errors.seatingCapacity}</div>
                              ) : null}
                            </CCol>

                            {/* <CCol xs={6}>
                              <CFormLabel htmlFor="inputpricekm">Price per k/m (in $) </CFormLabel>
                              <CFormInput  {...formik.getFieldProps("pricePerKm")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.pricePerKm && formik.errors.pricePerKm,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.pricePerKm && !formik.errors.pricePerKm,
                                  }
                                )}
                                name="pricePerKm"
                                autoComplete="off" />
                              {formik.errors.pricePerKm && formik.touched.pricePerKm ? (
                                <div className="text-danger">{formik.errors.pricePerKm}</div>
                              ) : null}
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputfare">Minimum Fare (in $) </CFormLabel>
                              <CFormInput {...formik.getFieldProps("minimumFare")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.minimumFare && formik.errors.minimumFare,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.minimumFare && !formik.errors.minimumFare,
                                  }
                                )}
                                name="minimumFare"
                                autoComplete="off" />
                              {formik.errors.minimumFare && formik.touched.minimumFare ? (
                                <div className="text-danger">{formik.errors.minimumFare}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputcomission">Commission (in %) </CFormLabel>
                              <CFormInput id="inputcomission" {...formik.getFieldProps("commission")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.commission && formik.errors.commission,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.commission && !formik.errors.commission,
                                  }
                                )}
                                name="commission"
                                autoComplete="off" />
                              {formik.errors.commission && formik.touched.commission ? (
                                <div className="text-danger">{formik.errors.commission}</div>
                              ) : null}
                            </CCol> */}


                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputpassenger">Passenger Cancellation Time Limit (in Minutes)</CFormLabel>
                              <CFormInput id="inputpassengertimelimit"  {...formik.getFieldProps("passengerTimeLimit")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.passengerTimeLimit && formik.errors.passengerTimeLimit,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.passengerTimeLimit && !formik.errors.passengerTimeLimit,
                                  }
                                )}
                                name="passengerTimeLimit"
                                autoComplete="off" />
                              {formik.errors.passengerTimeLimit && formik.touched.passengerTimeLimit ? (
                                <div className="text-danger">{formik.errors.passengerTimeLimit}</div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputpassengercharges">Passenger Cancellation Charges (in € ) </CFormLabel>
                              <CFormInput id="inputpassengercharges"  {...formik.getFieldProps("passengerCharges")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.passengerCharges && formik.errors.passengerCharges,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.passengerCharges && !formik.errors.passengerCharges,
                                  }
                                )}
                                name="passengerCharges"
                                autoComplete="off" />
                              {formik.errors.passengerCharges && formik.touched.passengerCharges ? (
                                <div className="text-danger">{formik.errors.passengerCharges}</div>
                              ) : null}
                            </CCol>

                            <CCol md={6} className="date_pic">
                              <CFormLabel htmlFor="inputinsurancedate">Insurance Renewal Date</CFormLabel><br />
                              <DatePicker
                                selected={vehicleinsuranceDate}
                                onChange={handlevehicleInsuranceDateChange}
                                dateFormat="MM/dd/yyyy"

                                // {...formik.getFieldProps("vehicleinsuranceDate")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.vehicleinsuranceDate && formik.errors.vehicleinsuranceDate,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.vehicleinsuranceDate && !formik.errors.vehicleinsuranceDate,
                                  }
                                )}
                                name="vehicleinsuranceDate"
                                autoComplete="off" />
                              {formik.errors.vehicleinsuranceDate && formik.touched.vehicleinsuranceDate ? (
                                <div className="text-danger">{formik.errors.vehicleinsuranceDate}</div>
                              ) : null}




                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputgender" ></CFormLabel>
                              <fieldset className="row mb-12">
                                <CCol sm={12} className="mt-3">
                                  <CFormCheck inline
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    value="true"
                                    label="AC"
                                    onChange={handleACtype} // Add the onChange event handler
                                    checked={selectedAC === 'true'} // Set the checked state if Male is selected
                                  />
                                  <CFormCheck inline
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios2"
                                    value="false"
                                    label="NON-AC"
                                    onChange={handleACtype} // Add the onChange event handler
                                    checked={selectedAC === 'false'} // Set the checked state if Female is selected
                                  />
                                </CCol>
                              </fieldset>
                            </CCol>

                            <CCol md={12} className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">Upload Vehicle Image</CFormLabel>
                              <CFormLabel htmlFor="formFile"></CFormLabel>
                              {image?.length > 0 ?
                                (
                                  <img src={image} alt='img' height={300} width={100} />
                                ) :
                                ""}
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
                                  <img className="upload-icon" src={uploadfileImg} /><br /><br />
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

export default AddNewVehicle; 