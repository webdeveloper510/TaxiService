import React from 'react'
import * as Yup from "yup";
function Passengers({addOnChangeHandler,removePassenger, index}) {
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
                  <CFormInput aria-label="name" name="name" onChange={(e) => { addOnChangeHandler(e, index) 
                }

                }
                
                 />
                {error.name && <span style={{color:"red"}}>Name is required</span>}
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputphnno">Phone</CFormLabel>
                  <CFormInput id="inputphnno" name="phone" onChange={(e) => { addOnChangeHandler(e, index) }} />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputtemailadd">
                    Email Address
                  </CFormLabel>
                  <CFormInput id="inputemailadd" name="email" onChange={(e) => { addOnChangeHandler(e, index) }} />
                </CCol>
                <CCol xs={6}>
                  <CFormLabel htmlFor="inputaddress">Address</CFormLabel>
                  <CFormInput id="inputaddress" name="address" onChange={(e) => { addOnChangeHandler(e, index) }} />
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      )
}

export default Passengers