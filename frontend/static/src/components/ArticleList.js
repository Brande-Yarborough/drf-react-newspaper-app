// import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavLink from "react-bootstrap/esm/NavLink";
import Card from "react-bootstrap/Card";

function ArticleList({ selectedCategory }) {
  const [articles, setArticles] = useState(null); //use null because it is falsy

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch(
        `/api_v1/articles/?category=${selectedCategory}`
      );

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Articles
      setArticles(data);
    };
    //call getArticles
    getArticles();
  }, [selectedCategory]);

  const addArticle = async () => {
    const article = {
      title: "An article added from React",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(article),
    };

    const response = await fetch("/api_v1/articles/", options);
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    // console.log({ data });
    setArticles([...articles, data]);
  };

  if (!articles) {
    return <div>Fetching data ...</div>;
  }

  const articlesHTML = articles.map((article) => (
    <Card className="card" style={{ width: "60rem" }} key={article.id}>
      <Card.Img variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.body}</Card.Text>
      </Card.Body>
    </Card>
  ));

  return <div className="article-container">{articlesHTML}</div>;
}

export default ArticleList;
