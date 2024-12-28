import Link from "next/link";
// Import CSS

export default function Navbar() {
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
          <Link href="/login" className="btn btn-login">
            Login
          </Link>
          <Link href="/signup" className="btn btn-signup">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
