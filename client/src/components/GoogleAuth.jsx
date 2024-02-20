import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { setLogin } from "../state";

const GoogleAuth = () => {
  const clientId = "96761309582-mtdj5s9a4n8jscpq0p2v8ju87ltvhpho.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (values, onSubmitProps) => {
    try {
        console.log("Logging in...",values);
        const loggedInResponse = await fetch("http://localhost:3001/auth/googleAuth", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        
    if (loggedIn.accessToken && loggedIn.refreshToken) {
            console.log("logged successfully!!");
            console.log("LoggedIn",loggedIn);
            
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    accessToken: loggedIn.accessToken,
                    refreshToken: loggedIn.refreshToken,
                })
            );
            navigate("/home");
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

  const handleSuccess = async (credentialResponse) => {
    console.log("Success:", credentialResponse);
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log("User Object:", credentialResponseDecoded);

    // Prepare JSON object with decoded token data
    const userData = {
      email: credentialResponseDecoded.email,
      email_verified: credentialResponseDecoded.email_verified,
      given_name: credentialResponseDecoded.given_name,
      family_name: credentialResponseDecoded.family_name,
      picture: credentialResponseDecoded.picture,
    };
    console.log("User Data:", userData);
    await login(userData);

    
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
