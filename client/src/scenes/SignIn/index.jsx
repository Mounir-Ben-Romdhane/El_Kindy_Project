import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state";
import QRCode from "qrcode.react";

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.token));
  const [twoFactorCode, setTwoFactorCode] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth, navigate]);

  const login = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password, twoFactorCode }),
      });
      const data = await response.json();
      console.log(data); // Log to see the actual response
      if (response.ok) {
        if (data.token) {
          dispatch(
            setLogin({
              user: data.user,
              token: data.token,
            })
          );
          navigate("/home");
        }
      } else if (data.twoFactorRequired) {
        // 2FA is required, display QR code and input field for 2FA code
        setQRCodeUrl(data.qrCodeUrl);
        setLoginError("");
      } else {
        setLoginError("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setLoginError("An error occurred, please try again.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!qrCodeUrl) {
      // If no QR code is present, perform regular login
      await login();
    } else if (twoFactorCode) {
      // If 2FA is enabled and a code is provided, attempt login with 2FA code
      await login();
    } else {
      setLoginError("Please enter the 2FA code.");
    }
  };

  return (
    <div>
      {/* Main Content Start */}
      <main>
        <section className="p-0 d-flex align-items-center position-relative overflow-hidden">
          <div className="container-fluid">
            <div className="row">
              {/* Left Section */}
              <div className="col-12 col-lg-6 m-auto">
                <div className="row my-5">
                  <div className="col-sm-10 col-xl-8 m-auto">
                    {/* Title and Introduction */}
                    <span className="mb-0 fs-1">👋</span>
                    <h1 className="fs-2">Login into Eduport!</h1>
                    <p className="lead mb-4">
                      Nice to see you! Please log in with your account.
                    </p>
  
                    {/* Login Form */}
                    <form onSubmit={handleFormSubmit}>
                      {/* Email Input */}
                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address *
                        </label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <i className="bi bi-envelope-fill"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control border-0 bg-light rounded-end ps-1"
                            placeholder="E-mail"
                            id="exampleInputEmail1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Password Input */}
                      <div className="mb-4">
                        <label htmlFor="inputPassword5" className="form-label">
                          Password *
                        </label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text bg-light rounded-start border-0 text-secondary px-3">
                            <i className="fas fa-lock"></i>
                          </span>
                          <input
                            type="password"
                            className="form-control border-0 bg-light rounded-end ps-1"
                            placeholder="Password"
                            id="inputPassword5"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* 2FA Code Input */}
                      {qrCodeUrl && (
                        <div className="mb-3">
                          <label htmlFor="twoFactorCode" className="form-label">
                            Enter 2FA Code
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="twoFactorCode"
                            value={twoFactorCode}
                            onChange={(e) => setTwoFactorCode(e.target.value)}
                          />
                        </div>
                      )}
                      {/* QR Code Display for 2FA */}
                      {qrCodeUrl && (
                        <div className="mb-3">
                          <p>Scan the QR code with your authenticator app:</p>
                          <QRCode value={qrCodeUrl} />
                        </div>
                      )}
                      {/* Login Error Message */}
                      {loginError && (
                        <div className="alert alert-danger" role="alert">
                          {loginError}
                        </div>
                      )}
                      {/* Submit Button */}
                      <div className="d-grid">
                        <button className="btn btn-primary mb-0" type="submit">
                          Login
                        </button>
                      </div>
                    </form>
                    {/* Additional Links */}
                    <div className="mt-4 text-center">
                      <span>
                        Don't have an account?{" "}
                        <Link to="/signup">Sign up here</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Section - Static Content */}
              <div className="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
                <div className="p-3 p-lg-5">
                  <h2 className="fw-bold">Welcome to our largest community</h2>
                  <p className="mb-0 h6 fw-light">
                    Let's learn something new today!
                  </p>
                  <img
                    src="assets/images/element/02.svg"
                    className="mt-5"
                    alt="community visual"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Main Content End */}
    </div>
  );
                      }
export default Index;
