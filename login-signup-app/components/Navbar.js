"use client";

import Link from "next/link";
import { useAuth } from "../pages/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // Get login state and logout function

  return (
    <header>
      <nav className="navbar">
        {/* Left: Logo */}
        <div className="navbar-logo">
          <h2>MyApp</h2>
        </div>

        {/* Center: Links */}
        <ul className="navbar-links">
          <li>
            <Link href="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/today-notice" className="navbar-link">
              Today's Notice
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="navbar-link">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="navbar-link">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right: Buttons */}
        <div className="navbar-buttons">
          {isLoggedIn ? (
            <>
              <div className="user-avatar">
                <img
                  src="/user.svg"
                  alt="User Avatar"
                  className="avatar-img"
                />
              </div>
              <button onClick={logout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-login">
                Login
              </Link>
              <Link href="/signup" className="btn btn-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
