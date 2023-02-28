import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Header({ isAuth, handleLogout }) {
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
          <li className="nav-item">
            {isAuth && (
              <Button variant="primary" type="button" onClick={handleLogout}>
                Logout
              </Button>
            )}
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
