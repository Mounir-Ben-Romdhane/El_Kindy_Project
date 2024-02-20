import React from "react";
import FacebookLoginButton from 'react-facebook-login';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state";

const FacebookLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values) => {
    try {
      console.log("values", values);
      if  (!values.accessToken || !values.id) throw new Error('Missing access token or user id');
      if(values.accessToken&&values.id){
        const loggedInResponse = await fetch("http://localhost:3001/auth/facebooklogin", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        
        if (!loggedInResponse.ok) {
          const errorData = await loggedInResponse.json();
          throw new Error(`Failed to log in: ${errorData.message}`);
        }
        if (loggedInResponse.status===200) {
          
            const loggedIn = await loggedInResponse.json();
              console.log("loggedIn.accessToken:", loggedIn.accessToken);
              console.log("loggedIn.refreshToken:", loggedIn.refreshToken);
        
                console.log("logged successfully!!");
                console.log("LoggedIn", loggedIn);
        
                dispatch(
                  setLogin({
                    user: loggedIn.user,
                    accessToken: loggedIn.accessToken,
                    refreshToken: loggedIn.refreshToken,
                  })
                );
        
                console.log("Redirection vers /home");
                navigate("/home");
              
                }
                  }

     } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  const responseFacebook = async (response) => {
    console.log(response);
    await login(response);
  };
const handleClick = ()=>{
  console.log("hh")
}
  return (
    <div className="col-xxl-6 d-grid">
    <FacebookLoginButton
    className="btn bg-facebook mb-2 mb-xxl-0"
    cssClass="btn bg-facebook mb-2 mb-xxl-0"

     // onSuccess={responseFacebook}
      appId="923840302571080"
     // autoLoad={false}
      callback={responseFacebook}
      
    >
     <i className="fab fa-fw fa-google text-white me-2" />
   </FacebookLoginButton>
    </div>
  );
};

export default FacebookLogin;
