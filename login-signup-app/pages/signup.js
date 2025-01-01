"use client";

import React, {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

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

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const mobileInputRef = useRef(null);
  const firstNameInputRef = useRef(null);

  useEffect(() => {
    if (mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (step === 3 && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
  }, [step]);

  const isValidMobile = (number) => /^[0-9]{10}$/.test(number);
  const isValidPassword = (pass) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleGetOtp = (e) => {
    e.preventDefault();
    if (!isValidMobile(mobile)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    setStep(2);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }
    setOtpError("");
    setStep(3);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let isValid = true;
    setPasswordError("");

    if (!firstName) {
      setMobileError("Please enter your first name.");
      isValid = false;
    }
    if (!lastName) {
      setOtpError("Please enter your last name.");
      isValid = false;
    }
    if (!isValidEmail(email)) {
      setEmail("");
      isValid = false;
    }
    if (!isValidPassword(password)) {
      setPasswordError(
        "Password must contain at least 1 uppercase letter, 1 number, and 1 symbol."
      );
      isValid = false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      isValid = false;
    }

    if (isValid) {
      router.replace("/login");
    }
  };

  const handleMobileInput = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setMobile(value);
    }
  };

  // Function to format mobile number as +91XXXXXXXX1 (where middle digits are hidden)
  const formatMobileNumber = (number) => {
    if (number.length === 10) {
      return `+91${number.slice(0, 4)}****${number.slice(8)}`;
    }
    return `+91${number}`;
  };

  return (
    <div className="auth-page">
      <div className="auth-main-block">
        <div className="auth-card">
          <h1 className="auth-title">Sign Up</h1>
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

              <form onSubmit={handleGetOtp} className="auth-form">
                <div className="phone-number-container">
                  <input
                    type="text"
                    value="+91"
                    readOnly
                    className="country-code-input"
                  />
                  <input
                    ref={mobileInputRef}
                    type="text"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={handleMobileInput}
                    required
                    className="mobile-number-input"
                  />
                </div>
                {mobileError && (
                  <div className="error-message">{mobileError}</div>
                )}
                <button type="submit" className="auth-button">
                  Get OTP
                </button>
              </form>

              <div className="have-account">
                Already have an account?{" "}
                <button
                  onClick={() => router.replace("/login")}
                  className="link-button"
                >
                  Login
                </button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p>
                A one-time password has been sent to this number{" "}
                {formatMobileNumber(mobile)}.
              </p>
              <h4 className="enter-otp">Enter Verification Code</h4>

              <form onSubmit={handleNext} className="auth-form">
                <OtpInput
                  length={6}
                  onOtpChange={setOtp}
                  errorMessage={otpError}
                />
                {otpError && <div className="error-message">{otpError}</div>}
                <button type="submit" className="auth-button">
                  Next
                </button>
              </form>
              <div className="resend-otp">
                <p>
                  Didn’t get the OTP? <a href="#">Resend OTP</a>
                </p>
              </div>
              <div className="have-account">
                Already have an account?{" "}
                <button
                  onClick={() => router.replace("/login")}
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
                  ref={firstNameInputRef}
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
                className="auth-input"
              />
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="auth-input"
                />
                <button
                  type="button"
                  className="toggle-password-inside"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? "/eye-closed.png" : "/eye-open.png"}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                    className="toggle-password-icon"
                  />
                </button>
              </div>
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="auth-input"
                />
                <button
                  type="button"
                  className="toggle-password-inside"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img
                    src={
                      showConfirmPassword ? "/eye-closed.png" : "/eye-open.png"
                    }
                    alt={
                      showConfirmPassword ? "Hide Password" : "Show Password"
                    }
                    className="toggle-password-icon"
                  />
                </button>
              </div>
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
              <button type="submit" className="auth-button">
                Sign Up
              </button>
            </form>
          )}
        </div>
        <div className="auth-content-block">
          <img className="auth-img" src="/login-person.svg" />
          <div className="content-title">Glad To See You!</div>
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

export default Signup;

//

// "use client";

// import React, {useState, useEffect, useRef} from "react";
// import {useRouter} from "next/navigation";
// import {useAuth} from "../pages/AuthContext";
// import Link from "next/link";

// const Signin = () => {
//   const router = useRouter();
//   const {login} = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [mobileError, setMobileError] = useState("");
//   const [otpError, setOtpError] = useState("");

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   useEffect(() => {
//     if (step === 1 && email) {
//       document.getElementById("password").focus();
//     }
//   }, [step, email]);

//   const handleSignin = async (e) => {
//     e.preventDefault();

//     if (step === 1) {
//       try {
//         if (email === "test@example.com" && password === "password") {
//           login(); // Set logged-in state
//           alert("Login successful!");
//           router.push("/"); // Redirect to the main page after login
//         } else {
//           throw new Error("Invalid email or password.");
//         }
//       } catch (error) {
//         setErrorMessage(error.message);
//       }
//     } else if (step === 2) {
//       // Handle OTP verification
//       if (otp.length !== 6) {
//         setOtpError("Please enter a valid 6-digit OTP.");
//         return;
//       }
//       setOtpError("");
//       alert("OTP Verified!"); // Proceed after OTP verification
//       router.push("/"); // Redirect after OTP verification
//     }
//   };

//   const handleGetOtp = (e) => {
//     e.preventDefault();
//     if (!/^[0-9]{10}$/.test(mobile)) {
//       setMobileError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setMobileError("");
//     setStep(2); // Move to OTP verification step
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-main-block">
//         <div className="auth-card">
//           <h1 className="auth-title">{step === 1 ? "Login" : "Enter OTP"}</h1>
//           {step === 1 && (
//             <>
//               <button className="google-button">
//                 <img
//                   src="/logo.svg"
//                   alt="Google Logo"
//                   className="google-logo"
//                 />
//                 Sign up with Google
//               </button>

//               <div className="or-separator">
//                 <hr />
//                 <span>OR</span>
//                 <hr />
//               </div>

//               <form onSubmit={handleSignin} className="auth-form">
//                 {errorMessage && <p className="auth-error">{errorMessage}</p>}
//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="auth-input"
//                 />
//                 <div className="password-field">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="auth-input"
//                   />
//                   <button
//                     type="button"
//                     className="toggle-password-inside"
//                     onClick={togglePasswordVisibility}
//                   >
//                     <img
//                       src={showPassword ? "/eye-closed.png" : "/eye-open.png"}
//                       alt={showPassword ? "Hide Password" : "Show Password"}
//                       className="toggle-password-icon"
//                     />
//                   </button>
//                 </div>
//                 <button type="submit" className="auth-button">
//                   Login
//                 </button>
//               </form>
//               <p className="auth-footer">
//                 Forgot your password?{" "}
//                 <Link
//                   href="/forgot-password"
//                   className="auth-link"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setStep(3); // Navigate to mobile number input (forgot password)
//                   }}
//                 >
//                   Reset it
//                 </Link>
//               </p>
//               <p className="auth-footer">
//                 Don't have an account?{" "}
//                 <Link
//                   href="/signup"
//                   className="auth-link"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     router.replace("/signup");
//                   }}
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </>
//           )}

//           {step === 3 && (
//             <>
//               <form onSubmit={handleGetOtp} className="auth-form">
//                 <input
//                   type="text"
//                   placeholder="Enter Mobile Number"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   required
//                   className="auth-input"
//                 />
//                 {mobileError && <p className="auth-error">{mobileError}</p>}
//                 <button type="submit" className="auth-button">
//                   Get OTP
//                 </button>
//               </form>
//               <p className="auth-footer">
//                 Remember your password?{" "}
//                 <Link
//                   href="/login"
//                   className="auth-link"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setStep(1); // Go back to login page
//                   }}
//                 >
//                   Login
//                 </Link>
//               </p>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <h2>Enter OTP</h2>
//               <div className="otp-container">
//                 <input
//                   type="text"
//                   maxLength="6"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="auth-input"
//                 />
//                 {otpError && <p className="auth-error">{otpError}</p>}
//                 <button onClick={handleSignin} className="auth-button">
//                   Verify OTP
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signin;
