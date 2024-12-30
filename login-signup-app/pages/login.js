"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../pages/AuthContext";

const Signin = () => {
  const router = useRouter();
  const emailInputRef = useRef(null);
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Autofocus the email input field
    }
  }, []);

  useEffect(() => {
    const handleBack = () => {
      router.replace("/"); // Redirect to home page on back navigation
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [router]);

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      // Mock authentication
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
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <button className="google-button">
          <img src="/logo.svg" alt="Google Logo" className="google-logo" />
          Sign up with Google
        </button>
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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
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
      </div>
    </div>
  );
};

export default Signin;
