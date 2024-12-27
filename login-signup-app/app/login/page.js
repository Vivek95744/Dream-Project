"use client";

import Link from "next/link";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation"; // Import useRouter for navigation

const Signin = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UseEffect to handle back navigation
  useEffect(() => {
    // Prevent back navigation from login page
    const handleBack = () => {
      router.replace("/"); // Redirect to home or navigation page on back navigation
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [router]);

  const handleSignin = (e) => {
    e.preventDefault();
    console.log("Signin successful:", {email, password});
    alert("Signin successful!");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <button className="google-button">Login with Google</button>
        <form onSubmit={handleSignin} className="auth-form">
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
              e.preventDefault(); // Prevent going to signup page if already on signup
              router.replace("/signup"); // Use replace to avoid back navigation
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
