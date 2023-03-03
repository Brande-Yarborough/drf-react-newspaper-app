import { useState } from "react";
import Cookies from "js-cookie";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ArticleEdit(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({
    ...props,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    //setArticle method creating shallow copy/spread of article with key value pairs
    setArticle({ ...article, [name]: value });
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setArticle({ ...article, image: file });
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
    if (article.image instanceof File) {
      formData.append("image", article.image);
    }
    formData.append("title", article.title);
    formData.append("body", article.body);
    formData.append("category", article.category);
    formData.append("phase", event.target.value);

    const options = {
      method: "PUT",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch(`/api_v1/user/articles/${props.id}/`, options);
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    setIsEditing(false);
  };

  const deleteArticle = async (event) => {
    const id = event.currentTarget.value;
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch(`/api_v1/user/articles/${props.id}/`, options);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      console.log(response);
      //create shallow copy of articles
      let updatedArticles = [...articles];
      //find index of article we want to delete
      const index = updatedArticles.findIndex((x) => x.id == id);
      //removing article from array
      updatedArticles.splice(index, 1);
      //reset state with updatedArticles
      setArticles(updatedArticles);
      console.log(articles);
    }
  };

  let myArticleHTML; //instantiating instance of new variable myArticleHTML
  //////////This will show the edit article option form//////////
  if (isEditing) {
    myArticleHTML = (
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control name="image" type="file" onChange={handleImage} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={article.title}
              type="title"
              placeholder="Enter article title"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              name="body"
              value={article.body}
              as="textarea"
              rows={3}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Select
            name="category"
            value={article.category}
            aria-label="Default select example"
            onChange={handleChange}
          >
            <option>Select Category</option>
            <option value={1}>News</option>
            <option value={2}>Sports</option>
            <option value={3}>Downtown</option>
            <option value={5}>Food</option>
          </Form.Select>

          <Button
            variant="primary"
            type="submit"
            value="DFT"
            onClick={handleSubmit}
          >
            Save as Draft
          </Button>
          <Button
            variant="primary"
            type="submit"
            value="SBM"
            onClick={handleSubmit}
          >
            Submit for Review
          </Button>
        </Form>
      </Container>
    );

    //////////This will show the list of my articles//////////
  } else {
    myArticleHTML = (
      <Container id="my-articles-container">
        <Card className="card" style={{ width: "60rem" }} key={article.id}>
          <Card.Img variant="top" src={article.image} />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Title>Author: {article.author_name}</Card.Title>
            <Card.Text>{article.body}</Card.Text>
            <div>{article.phase}</div>
            {article.phase === "DFT" ||
              ("REJ" && (
                <>
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Article
                  </Button>
                  <Button type="submit" onClick={deleteArticle}>
                    Delete
                  </Button>
                  <Button type="submit" value="SBM" onClick={handleSubmit}>
                    Submit for Review
                  </Button>
                </>
              ))}
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return <div>{myArticleHTML}</div>;
}
export default ArticleEdit;
