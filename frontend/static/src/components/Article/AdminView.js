import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";

function AdminView(article) {
  const [adminArticles, setAdminArticles] = useState([]);

  useEffect(() => {
    const getAdminArticles = async () => {
      const response = await fetch(`/api_v1/admin/articles/`);

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get AdminArticles
      setAdminArticles(data);
      console.log(data);
    };
    //call getAdminArticles
    getAdminArticles();
  }, []);

  const updatePhasePublish = async (event) => {
    event.preventDefault();
    const phase = event.target.value;
    const id = event.target.dataset.id;

    const formData = new FormData();

    formData.append("title", article.title);
    formData.append("body", article.body);
    formData.append("category", article.category);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phase }),
    };

    const response = await fetch(
      `/api_v1/admin/articles/${id}/publish/`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    console.log(data);
  };

  const updatePhaseReject = async (event) => {
    event.preventDefault();
    const phase = event.target.value;
    const id = event.target.dataset.id;

    const formData = new FormData();

    formData.append("title", article.title);
    formData.append("body", article.body);
    formData.append("category", article.category);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phase }),
    };

    const response = await fetch(
      `/api_v1/admin/articles/${id}/reject/`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    console.log(data);
  };
  console.log(adminArticles);

  const AdminArticlesListHTML = adminArticles.map((article) => (
    //////////Shows admin view for articles//////////
    <Container id="admin-view-container">
      <Card className="card" style={{ width: "60rem" }} key={article.id}>
        <Card.Img variant="top" src={article.image} />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Title>Author: {article.username}</Card.Title>
          <Card.Text>{article.body}</Card.Text>
          <div>{article.phase}</div>
          <>
            <Button
              type="button"
              // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
              data-id={article.id}
              value="PUB"
              onClick={updatePhasePublish}
            >
              Publish
            </Button>
            <Button
              type="button"
              data-id={article.id}
              value="REJ"
              onClick={updatePhaseReject}
            >
              Reject
            </Button>
          </>
        </Card.Body>
      </Card>
    </Container>
  ));

  return <div>{AdminArticlesListHTML}</div>;
}

export default AdminView;
