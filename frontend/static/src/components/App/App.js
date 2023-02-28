import "./App.css";
import { useState } from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function App() {
  const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));

  const navigate = useNavigate();
  // const [setAuth] = useOutletContext();

  const handleLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json(); //when we login and are registered we get key
    Cookies.remove("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
    //when logout, need to remove cookie
    setAuth(false);
    navigate("/");
  };

  const handleError = (err) => {
    console.warn(err);
  };

  return (
    //login/logout button...conditionally render which button based on whether or not a user is logged in or not
    <>
      <Header isAuth={isAuth} />
      {isAuth && (
        <Button variant="primary" type="button" onClick={handleLogout}>
          Logout
        </Button>
      )}

      <Outlet context={[setAuth]} />
      {/* {page === "articles" && ( */}

      {/* <Navbar className="navbar" bg="light" variant="light">
            <Button
              className="homepage-login"
              variant="primary"
              type="button"
              onClick={() => setPage("login")}
            >
              Login
            </Button>

            <Nav className="nav-categories">{categoriesHTML}</Nav> */}
      {/* <Button type="button" variant="dark" onClick={addCategory}>
            Add Category
          </Button> */}
      {/* </Navbar>
          {selectedCategory && (
            <ArticleList selectedCategory={selectedCategory} />
          )} */}
      {/* )} */}

      {/* {page === "login" && <LoginForm setPage={setPage} />}
      {page === "registration" && <RegistrationForm setPage={setPage} />} */}

      <footer>© CCS News 2023</footer>
    </>
  );
}

export default App;
