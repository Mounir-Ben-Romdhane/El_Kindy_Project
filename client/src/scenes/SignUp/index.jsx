import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import {  } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
  import { Formik } from "formik";
  import FlexBetween from "../../components/FlexBetween";
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
};

function Index() {

    
    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const register = async (values, onSubmitProps) => {
        console.log("values",values);
        // this allow us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);
        console.log("formData",formData);
        
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            console.log('User added!');
                console.log("user", savedUser);
                navigate('/');
        } 
    };
    

    const handleFormSubmit = async (values, onSubmitProps) => {
        await register(values, onSubmitProps);
    };

    
  return (
    <div>
         {/* **************** MAIN CONTENT START **************** */}
         <main>
        <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
            <div className="container-fluid">
            <div className="row">
                {/* left */}
                <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
                <div className="p-3 p-lg-5">
                    {/* Title */}
                    <div className="text-center">
                    <h2 className="fw-bold">Welcome to our largest community</h2>
                    <p className="mb-0 h6 fw-light">Let's learn something new today!</p>
                    </div>
                    {/* SVG Image */}
                    <img src="assets/images/element/02.svg" className="mt-5" alt />
                    {/* Info */}
                    <div className="d-sm-flex mt-5 align-items-center justify-content-center">
                    <ul className="avatar-group mb-2 mb-sm-0">
                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/01.jpg" alt="avatar" /></li>
                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/02.jpg" alt="avatar" /></li>
                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/03.jpg" alt="avatar" /></li>
                        <li className="avatar avatar-sm"><img className="avatar-img rounded-circle" src="assets/images/avatar/04.jpg" alt="avatar" /></li>
                    </ul>
                    {/* Content */}
                    <p className="mb-0 h6 fw-light ms-0 ms-sm-3">4k+ Students joined us, now it's your turn.</p>
                    </div>
                </div>
                </div>
                {/* Right */}
                <div className="col-12 col-lg-6 m-auto overflow-auto">
                <div className="row my-5">
                    <div className="col-sm-10 col-xl-8 m-auto">
                    {/* Title */}
                    <img src="assets/images/element/03.svg" className="h-40px mb-2" alt />
                    <h2>Sign up for your account!</h2>
                    <p className="lead mb-4">Nice to see you! Please Sign up with your account.</p>
                    {/* Form START */}
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValuesRegister }
                        validationSchema={registerSchema }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                    <form onSubmit={handleSubmit}>
                        {/* firstName */}
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">First Name *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                <TextField 
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    className="form-control border-0 bg-light rounded-end ps-1"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />                            
                                </div>
                        </div>
                        {/* lastName */}
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Last Name *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                <TextField 
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    className="form-control border-0 bg-light rounded-end ps-1"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                <TextField 
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                className="form-control border-0 bg-light rounded-end ps-1"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                                />                            
                            </div>
                        </div>
                        <div className="mb-4">
                            <Box
                                gridColumn="span 4"
                                border={`1px solid red`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => 
                                        setFieldValue("picture", acceptedFiles[0])
                                        }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed blue`}
                                            p="1rem"
                                            sx= {{ "&:hover" : { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="inputPassword5" className="form-label">Password *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                <TextField 
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    className="form-control border-0 bg-light rounded-end ps-1"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </div>
                        </div>

                        {/* Check box */}
                        <div className="mb-4">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="checkbox-1" />
                                <label className="form-check-label" htmlFor="checkbox-1">By signing up, you agree to the<a href="#"> terms of service</a></label>
                            </div>
                        </div>
                        {/* Button */}
                        <div className="align-items-center mt-0">
                            <div className="d-grid">
                                <button className="btn btn-primary mb-0" type="submit">Sign Up</button>
                            </div>
                        </div>
                    </form>
                    )}
                    </Formik>
                    {/* Form END */}
                    {/* Social buttons */}
                    <div className="row">
                        {/* Divider with text */}
                        <div className="position-relative my-4">
                        <hr />
                        <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                        </div>
                        {/* Social btn */}
                        <div className="col-xxl-6 d-grid">
                        <a href="#" className="btn bg-google mb-2 mb-xxl-0"><i className="fab fa-fw fa-google text-white me-2" />Signup with Google</a>
                        </div>
                        {/* Social btn */}
                        <div className="col-xxl-6 d-grid">
                        <a href="#" className="btn bg-facebook mb-0"><i className="fab fa-fw fa-facebook-f me-2" />Signup with Facebook</a>
                        </div>
                    </div>
                    {/* Sign up link */}
                    <div className="mt-4 text-center">
                        <span>Already have an account?<Link to="/"> Sign in here</Link></span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        </main>
        {/* **************** MAIN CONTENT END **************** */}
    </div>
  )
}

export default Index