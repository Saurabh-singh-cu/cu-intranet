import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { notification } from "antd";
import logo from "../assets/images/logo.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();
  const recaptchaRef = useRef();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 3,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!recaptchaValue) {
    //   openNotification(
    //     "warning",
    //     "reCAPTCHA Required",
    //     "Please complete the reCAPTCHA verification."
    //   );
    //   return;
    // }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://172.17.2.77:8080/intranetapp/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: email,
            password: password,
            recaptcha: recaptchaValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred during login");
      }

      // Save user data in local storage
      localStorage.setItem("user", JSON.stringify(data));

      openNotification(
        "success",
        "Login Successful",
        "Redirecting to dashboard..."
      );
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      console.log("Login successful", data);
    } catch (err) {
      openNotification("error", "Login Failed", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-wrapper">
         <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}> <img src={logo} /></div>
          <h2 className="login-title">Welcome back</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="recaptcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeComoqAAAAAM7fMSrGeagGkmaDdtqdt12MzRjE"
                onChange={handleRecaptchaChange}
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="sign-in-link">
            Don't have an account?{" "}
            <a href="#" className="sign-in-anchor">
              Sign up
            </a>
          </p>
        </div>
      </div>
      <div className="login-image-container">
        <div className="login-image-overlay">
          <h1 className="image-title">Welcome to Cu-Intranet</h1>
          <p className="typewriter">
            Discover amazing features and boost your productivity
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
