import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Header({ isAuth, handleLogout, user }) {
  const navigate = useNavigate();
  console.log(user);

  return (
    <>
      <nav>
        <ul className="nav d-flex justify-content-end" id="main-nav">
          {!isAuth && (
            <>
              <li className="nav-item">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
          {/* check isAuth and is not admin */}
          <>
            {isAuth && (
              <>
                <li className="nav-item">
                  <NavLink to="/submit">Submit New Article</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/my-articles">My Articles</NavLink>
                </li>
              </>
            )}
            {user?.isAdmin && (
              <li className="nav-item">
                <NavLink to="/admin-view">Admin View</NavLink>
              </li>
            )}
          </>
          {/* check is admin? how do i do this? */}
          {/* {username === "admin" && <div>Admin</div>} */}
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
        <h1 className="news-header" onClick={() => navigate("/")}>
          The Greenville Times
        </h1>
      </header>
    </>
  );
}

export default Header;
