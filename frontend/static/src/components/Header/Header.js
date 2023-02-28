import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <nav>
        <ul className="nav d-flex justify-content-end" id="main-nav">
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
      <header>
        <h1 className="news-header">The Greenville Times</h1>
      </header>
    </>
  );
}

export default Header;
