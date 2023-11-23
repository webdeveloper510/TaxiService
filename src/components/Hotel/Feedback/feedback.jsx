import React, { useState } from 'react'
import SideBar2 from '../SideBar2'
import AppHeader from '../../TopBar/AppHeader'
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import clsx from "clsx";
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
} from "@coreui/react";
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router';
import { sendFeedback } from '../../../utils/api';

const Feedback = () => {

    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        feedback: Yup.string()
            .min(10)
            .required("Feedback is required"),

    });
    const initialValues = {
        feedback: "",
    };

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            sendFeedback({comment:values.feedback}).then((res) => {
                console.log(res, "fromFeedback")
                if(res?.code === 200) {
                    toast.success(`Thank you for your feedback`, {
                        position: "top-right",
                        autoClose: 1000,
                      });
                      formik.resetForm()

                }else{
                    throw new Error(`Invalid feedback`);
                }
            }).catch((err) => {
                toast.warning(`There is some problem`, {
                    position: "top-right",
                    autoClose: 1000,
                  });
            });
        },
    });


    return (
        <>
            <div>
                <div className="container-fluidd">
                    <div className="col-md-12">
                        <div>
                            <SideBar2 />
                            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                                <AppHeader />
                                <div
                                    className="body flex-grow-1 px-3"
                                    style={{ paddingBottom: "20px" }}
                                >
                                    <h1 class="heading-for-every-page">Feedback</h1>

                                    <CRow>
                                        <CCol xs={2}></CCol>
                                        <CCol xs={8}>
                                            <div class="active-trip-outer mx-5 p-4">
                                                <form onSubmit={formik.handleSubmit} noValidate>
                                                    <div className="">
                                                        <div className="mb-4" id="pwd_field">
                                                            <label htmlFor="feedback" className="form-label">
                                                                Feedback
                                                            </label>
                                                            <textarea
                                                                id="feedback"
                                                                type="text"
                                                                rows={15}
                                                                style={{height:"200px"}}
                                                                // size="lg"
                                                                {...formik.getFieldProps("feedback")}
                                                                // maxLength="50"
                                                                className={clsx(
                                                                    "form-control bg-transparent ",
                                                                    {
                                                                        "is-invalid":
                                                                            formik.touched.feedback &&
                                                                            formik.errors.feedback,
                                                                    },
                                                                    {
                                                                        "is-valid":
                                                                            formik.touched.feedback &&
                                                                            !formik.errors.feedback,
                                                                    }
                                                                )}
                                                                name="feedback"
                                                                autoComplete="off"
                                                            />
                                                            {formik.errors.feedback &&
                                                                formik.touched.feedback ? (
                                                                <div className="text-danger text-start">
                                                                    {formik.errors.feedback}
                                                                </div>
                                                            ) : null}


                                                        </div>


                                                        <div className="text-center text-md-start mt-2">
                                                            <button
                                                                className="custom-login btn btn-primary"
                                                                type="submit"
                                                                id="rest_btn"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </CCol>
                                        <CCol xs={2}></CCol>
                                    </CRow>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback