import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      <header>
        <h1 className="news-header">The Greenville Times</h1>
      </header>
    </>
  );
}

export default Header;
