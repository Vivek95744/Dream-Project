import {useState, useEffect, useRef} from "react";
import Link from "next/link";
import "../styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target) // Exclude hamburger menu click
      ) {
        setIsOpen(false); // Close the menu if clicking outside
      }
    };

    // Add event listener to detect click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <h2>MyApp</h2>
        </div>

        {/* Desktop Navbar */}
        <ul className="navbar-links">
          <li>
            <Link href="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/today-notice" className="navbar-link"></Link>
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

        {/* Navbar Buttons */}
        <div className="navbar-buttons">
          <Link href="/login" className="btn btn-login">
            Login
          </Link>
          <Link href="/signup" className="btn btn-signup">
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div
          ref={hamburgerRef}
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
          <div className={`line ${isOpen ? "open" : ""}`}></div>
        </div>
      </nav>

      {/* Sidebar Menu for Mobile */}
      <div
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on sidebar click
      >
        <ul className="sidebar-links">
          <li>
            <Link href="/" className="sidebar-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/today-notice" className="sidebar-link">
              as
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="sidebar-link">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="sidebar-link">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
