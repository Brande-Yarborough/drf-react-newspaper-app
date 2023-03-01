import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function MyArticles() {
  const [myArticles, setMyArticles] = useState([]);

  useEffect(() => {
    const getMyArticles = async () => {
      const response = await fetch(`/api_v1/user/articles/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setMyArticles(data);
    };
    getMyArticles();
  }, []);

  const MyArticlesHTML = myArticles.map((article) => (
    <Card className="card" style={{ width: "60rem" }} key={article.id}>
      <Card.Img variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Title>Author: {article.author_name}</Card.Title>
        <Card.Text>{article.body}</Card.Text>
      </Card.Body>
    </Card>
  ));

  return <div>{MyArticlesHTML}</div>;
}

export default MyArticles;
