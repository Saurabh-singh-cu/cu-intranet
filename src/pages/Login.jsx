import React from "react";
import intranet from "../assets/images/intra.png"
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {

    // const handleCaptchaChange = (value) => {
    //     setAcknowledgement((prev) => ({ ...prev, captchaValue: value }));
    //   };
  return (
    <div className="login-container">
      <div className="login-form">
        
        <h1>Welcome back</h1>
      
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <ReCAPTCHA 
        sitekey="6LeComoqAAAAAM7fMSrGeagGkmaDdtqdt12MzRjE"
        // onChange={(value) =>
        //   setAcknowledgement((prev) => ({ ...prev, captchaValue: value }))
        // }
      />
          <button type="submit" className="sign-up-button">
            Sign up
          </button>
        </form>
        <p className="sign-in-link">
          Already have an account? <a href="#">Sign in</a>
        </p>
        
      </div>
     
     
    </div>
  );
};
export default Login;
