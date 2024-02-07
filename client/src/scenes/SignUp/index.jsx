import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup";
import {  } from "react-router-dom";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

function Index() {

    
    //const dispatch = useDispatch();
    const navigate = useNavigate();

    const register = async (values) => {
        try {
            console.log("values",values);
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const savedUser = await response.json();

            if (savedUser) {
                console.log('User added!');
                navigate('/');
            } 
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleFormSubmit =  async (values) => {
        values.preventDefault(); // Prevent default form submission behavior
        const formData = new FormData(values.target); // Create FormData object from form
        const formValues = Object.fromEntries(formData.entries()); // Convert FormData to plain object
        // register(values);
        console.log("formValues", formValues);
        try {
            console.log("values",formValues);
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            const savedUser = await response.json();

            if (savedUser) {
                console.log('User added!');
                //navigate('/');
            } 
        } catch (error) {
            console.error('Error registering user:', error);
        }
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
                    <form onSubmit={handleFormSubmit}>
                        {/* firstName */}
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">First Name *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                <input type="text" name="firstName" className="form-control border-0 bg-light rounded-end ps-1" placeholder="First Name" id="exampleInputEmail" required />
                            </div>
                        </div>
                        {/* lastName */}
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Last Name *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                <input type="text" name="lastName" className="form-control border-0 bg-light rounded-end ps-1" placeholder="Last Name" id="exampleInputFirstName" required />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="bi bi-envelope-fill" /></span>
                                <input type="email" name="email" className="form-control border-0 bg-light rounded-end ps-1" placeholder="E-mail" id="exampleInputLastname" required />
                            </div>
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="inputPassword5" className="form-label">Password *</label>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i className="fas fa-lock" /></span>
                                <input type="password" name="password" className="form-control border-0 bg-light rounded-end ps-1" placeholder="*********" id="inputPassword5" required />
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