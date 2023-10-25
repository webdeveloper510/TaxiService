import { useFormik } from 'formik';
import React from 'react'
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
  CRow,
} from '@coreui/react'
import clsx from 'clsx';
function PassengersComponent({addOnChangeHandler,removePassenger, index}) {
    const instialValue ={
        name: "",
        email: "",
        address: "",
        phone: "",
      };
      const validationSchema = Yup.object().shape({
        name: Yup.string().required("First Name No is required"),
        email: Yup.string().required("Last Name  is required"),
        address: Yup.string().required("Address1  is required"),
        phone: Yup.string().required("Address2  is required"),
      });
      const formik = useFormik({
        instialValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          
        },
      });
    return (
        <CCol xs={12} key={index}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Passenger Details</strong>
              {index >= 0 && (
                <CButton
                  type="button"
                  onClick={() => removePassenger(index)}
                  className="remove_passenger_btn"
                >
                  - Remove Passenger
                </CButton>
              )}
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputname">Name</CFormLabel>
                  <CFormInput aria-label="name" onChange={(e) => { addOnChangeHandler(e, index) 
                }

                }
                {...formik.getFieldProps("name")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.name && formik.errors.name,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.name && !formik.errors.name,
                                  }
                                )}
                                name="name"
                                autoComplete="off" />
                              {formik.errors.name && formik.touched.name ? (
                                <div className="text-danger">{formik.errors.name}</div>
                              ) : null}
               
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                  <CFormInput id="inputphnno" onChange={(e) => { addOnChangeHandler(e, index) }}
                  {...formik.getFieldProps("phone")}
                  maxLength="50"
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.phone && formik.errors.phone,
                    },
                    {
                      "is-valid":
                        formik.touched.phone && !formik.errors.phone,
                    }
                  )}
                  name="phone"
                  autoComplete="off" />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="text-danger">{formik.errors.phone}</div>
                ) : null}
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputtemailadd">
                    Email Address
                  </CFormLabel>
                  <CFormInput id="inputemailadd"  onChange={(e) => { addOnChangeHandler(e, index) }} 
                  {...formik.getFieldProps("email")}
                  maxLength="50"
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.email && formik.errors.email,
                    },
                    {
                      "is-valid":
                        formik.touched.email && !formik.errors.email,
                    }
                  )}
                  name="email"
                  autoComplete="off" />
                {formik.errors.email && formik.touched.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputaddress">Address</CFormLabel>
                  <CFormInput id="inputaddress" onChange={(e) => { addOnChangeHandler(e, index) }} 
                  {...formik.getFieldProps("address")}
                  maxLength="50"
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        formik.touched.address && formik.errors.address,
                    },
                    {
                      "is-valid":
                        formik.touched.address && !formik.errors.address,
                    }
                  )}
                  name="address"
                  autoComplete="off" />
                {formik.errors.address && formik.touched.address ? (
                  <div className="text-danger">{formik.errors.address}</div>
                ) : null}
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      )
}

export default PassengersComponent