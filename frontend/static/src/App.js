import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ArticleList from "./components/ArticleList";
import LoginForm from "./components/LoginForm";

function App() {
  const [categories, setCategories] = useState(null); //use null because it is falsy
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [page, setPage] = useState(!!Cookies.get("Authorization") ? 'articles' : 'login');
  const [page, setPage] = useState('articles');

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api_v1/articles/categories/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Categories
      setCategories(data);
      setSelectedCategory(data[0].id);
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
    setSelectedCategory(data.id);
  };

  if (!categories) {
    return <div>Fetching data ...</div>;
  }

  const categoriesHTML = categories.map((category) => (
    <Nav.Item key={category.id} onClick={() => setSelectedCategory(category.id)}>
      <Nav.Link>{category.title}</Nav.Link>
    </Nav.Item>

    // <NavLink key={category.id} href={category.title} 
    // onClick={() => setSelectedCategory(category.id)} >
    //    {category.title}
    // </NavLink>
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
      {page === 'articles' && 
      <>
      
      <Navbar  className="navbar" bg="light" variant="light">
        <Nav className="nav-categories">
        <Button variant="primary" type="button" onClick={() => setPage('login')}>
          Login
        </Button>
          {categoriesHTML}
          
        </Nav>

          {/* <Button type="button" variant="dark" onClick={addCategory}>
            Add Category
          </Button> */}
      </Navbar>
      {selectedCategory && <ArticleList selectedCategory={selectedCategory}/>}
      </>
    }

    {page === 'login' && <LoginForm  setPage={setPage}/>}
      <footer>© CCS News 2023</footer>
    </>

    
  );
}

export default App;
