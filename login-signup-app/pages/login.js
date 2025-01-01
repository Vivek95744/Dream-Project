"use client";

import Link from "next/link";
import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "../pages/AuthContext";

const OtpInput = ({length = 6, onOtpChange, errorMessage}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const otpRefs = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < length - 1) {
      otpRefs.current[index + 1].focus();
    }

    onOtpChange(updatedOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, length);
    const otpArray = Array.from(pastedData.padEnd(length, ""));
    setOtp(otpArray);
    otpArray.forEach((_, index) => {
      if (otpRefs.current[index]) otpRefs.current[index].focus();
    });
    onOtpChange(otpArray.join(""));
  };

  useEffect(() => {
    if (otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          ref={(el) => (otpRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="otp-box"
        />
      ))}
    </div>
  );
};

const Signin = () => {
  const router = useRouter();
  const emailInputRef = useRef(null);
  const {login} = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP verification
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Autofocus the email input field
    }
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (step === 1) {
      // Handle login form
      try {
        if (email === "test@example.com" && password === "password") {
          login(); // Set logged-in state
          alert("Login successful!");
          router.push("/"); // Redirect to main page
        } else {
          throw new Error("Invalid email or password.");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else if (step === 2) {
      // Handle OTP verification
      if (otp.length !== 6) {
        setOtpError("Please enter a valid 6-digit OTP.");
        return;
      }
      setOtpError("");
      alert("OTP Verified!"); // Proceed after OTP verification
      router.push("/"); // Redirect after verification
    }
  };

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    setStep(2); // Move to OTP verification step
  };

  return (
    <div className="auth-page">
      <div className="auth-main-block">
        <div className="auth-card">
          <h1 className="auth-title">{step === 1 ? "Login" : "Enter OTP"}</h1>
          {step === 1 && (
            <>
              <button className="google-button">
                <img
                  src="/logo.svg"
                  alt="Google Logo"
                  className="google-logo"
                />
                Sign up with Google
              </button>

              {/* OR separator */}
              <div className="or-separator">
                <hr />
                <span>OR</span>
                <hr />
              </div>

              <form onSubmit={handleSignin} className="auth-form">
                {errorMessage && <p className="auth-error">{errorMessage}</p>}
                <input
                  ref={emailInputRef} // Autofocus the email input field
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="toggle-password-inside"
                    onClick={togglePasswordVisibility} // Toggle function to show/hide password
                  >
                    <img
                      src={showPassword ? "/eye-closed.png" : "/eye-open.png"} // Toggle image based on visibility
                      alt={showPassword ? "Hide Password" : "Show Password"}
                      className="toggle-password-icon"
                    />
                  </button>
                </div>
                <button type="submit" className="auth-button">
                  Login
                </button>
              </form>
              <p className="auth-footer">
                Forgot your password?{" "}
                <Link
                  href="#"
                  className="auth-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(3); // Navigate to mobile number input (forgot password)
                  }}
                >
                  Reset it
                </Link>
              </p>
              <p className="auth-footer">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="auth-link"
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace("/signup");
                  }}
                >
                  Sign up
                </Link>
              </p>
            </>
          )}

          {step === 3 && (
            <>
              <form onSubmit={handleGetOtp} className="auth-form">
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter Mobile Number"
                  required
                  className="auth-input"
                />
                {mobileError && <p className="auth-error">{mobileError}</p>}
                <button type="submit" className="auth-button">
                  Get OTP
                </button>
              </form>
              <p className="auth-footer">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="auth-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setStep(1); // Go back to login page
                  }}
                >
                  Login
                </Link>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Enter OTP</h2>
              <OtpInput onOtpChange={setOtp} errorMessage={otpError} />
              {otpError && <p className="auth-error">{otpError}</p>}
              <button onClick={handleSignin} className="auth-button">
                Verify OTP
              </button>
            </>
          )}
        </div>
        <div className="auth-content-block">
          <img className="auth-img" src="/login-person.svg" />
          <div className="content-title">Welcome Back!</div>
          <div className="content-sub-title">
            Monitor property notices without scanning newspapers daily.
          </div>
          <div className="content-list-block">
            <ui>
              <li className="content-list">Get notified instantly.</li>
              <li className="content-list">Save time and effort. </li>
              <li className="content-list">Secure and reliable service.</li>
            </ui>
          </div>
          <div className="content-para">
            We respect your privacy. Your data will never be shared with third
            parties.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
