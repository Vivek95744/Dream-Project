import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>MyApp</h2>
        </div>
        <div className="navbar-links">
          <Link href="/login" className="navbar-link">
            Login
          </Link>
          <Link href="/signup" className="navbar-link">
            Sign Up
          </Link>
        </div>
      </nav>
      {/* <div className="home-content">
        <h1>Welcome to Login and Signup App</h1>
        <p>
          Navigate to <a href="/login">Login</a> or <a href="/signup">Signup</a>
        </p>
      </div> */}
    </div>
  );
}
