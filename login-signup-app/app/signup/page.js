"use client";

import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation"; // Import useRouter for navigation

const OtpInput = ({length = 6, onOtpChange}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    onOtpChange(updatedOtp.join(""));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="otp-container">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="otp-box"
        />
      ))}
    </div>
  );
};

const Signup = () => {
  const router = useRouter(); // Initialize the router
  const [step, setStep] = useState(1); // Step 1: Enter Mobile; Step 2: Enter OTP; Step 3: Enter Details
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidMobile = (number) => /^[0-9]{10}$/.test(number);
  const isValidPassword = (pass) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);

  // UseEffect to handle back navigation
  useEffect(() => {
    // Prevent back navigation from signup page
    const handleBack = () => {
      router.replace("/login"); // Redirect to login page on back navigation
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [router]);

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (!isValidMobile(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setStep(2);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    setStep(3);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      alert(
        "Password must contain at least 1 uppercase letter, 1 number, and 1 symbol."
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    router.replace("/login"); // Go to login page after signup
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign Up</h1>
        {step === 1 && (
          <>
            <button className="google-button">
              <img src="/logo.svg" alt="Google Logo" className="google-logo" />
              Sign up with Google
            </button>

            <form onSubmit={handleGetOtp} className="auth-form">
              <div className="phone-number-container">
                <input
                  type="text"
                  value="+91"
                  readOnly
                  className="country-code-input"
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="mobile-number-input"
                />
              </div>
              <button type="submit" className="auth-button">
                Get OTP
              </button>
            </form>

            <div className="have-account">
              Already have an account?{" "}
              <button
                onClick={() => router.replace("/login")} // Prevent back navigation
                className="link-button"
              >
                Login
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Enter Otp</h2>
            <form onSubmit={handleNext} className="auth-form">
              <OtpInput length={6} onOtpChange={setOtp} />
              <button type="submit" className="auth-button">
                Next
              </button>
            </form>
            <div className="have-account">
              Already have an account?{" "}
              <button
                onClick={() => router.replace("/login")} // Prevent back navigation
                className="link-button"
              >
                Login
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <form onSubmit={handleSignup} className="auth-form">
            <div className="inline-fields">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="auth-input inline-input"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="auth-input inline-input"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
