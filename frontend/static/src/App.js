import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavLink from "react-bootstrap/esm/NavLink";
import ArticleList from "./components/ArticleList";

function App() {
  const [categories, setCategories] = useState(null); //use null because it is falsy

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api_v1/articles/categories/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Categories
      setCategories(data);
    };
    //call getCategories
    getCategories();
  }, []);

  const addCategory = async () => {
    const category = {
      title: "A category added from React",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(category),
    };

    const response = await fetch("/api_v1/articles/categories/", options);
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    // console.log({ data });
    setCategories([...categories, data]);
  };

  if (!categories) {
    return <div>Fetching data ...</div>;
  }

  const categoriesHTML = categories.map((category) => (
    <NavLink className="nav-text" key={category.id} href={category.title}>
      {category.title}
    </NavLink>
  ));

  return (
    // <div className="App">
    //   {categoriesHTML}
    //   <button type="button" onClick={addCategory}>
    //     Add category!
    //   </button>
    // </div>
    <>
      <header>
        <h1 className="news-header">The Greenville Times</h1>
      </header>

      <Navbar  className="navbar" bg="light" variant="light">
        <Nav className="nav-categories">
          {categoriesHTML}
          {/* <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#news">News</Nav.Link>
          <Nav.Link href="#sports">Sports</Nav.Link>
          <Nav.Link href="#downtown">Downtown</Nav.Link>
          <Nav.Link href="#food">Food</Nav.Link> */}
        </Nav>

          {/* <Button type="button" variant="dark" onClick={addCategory}>
            Add Category
          </Button> */}
      </Navbar>
      <ArticleList/>
      <footer>© CCS News 2023</footer>
    </>

    
  );
}

export default App;
