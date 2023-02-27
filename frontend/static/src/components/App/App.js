import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ArticleList from "../ArticleList";
import LoginForm from "../Auth/LoginForm";
import RegistrationForm from "../Auth/RegistrationForm";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [isAuth, setAuth] = useState(false);

  // if (!categories) {
  //   return <div>Fetching data ...</div>;
  // }

  return (
    //login/logout button...conditionally render which button based on whether or not a user is logged in or not
    <>
      <Header isAuth={isAuth} />
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
