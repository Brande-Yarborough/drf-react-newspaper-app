import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Cookies from "js-cookie";


function SubmitArticle() {
    const [article, setArticle] = useState({

        image: null,
        title: '', 
        body: '', 
        category: '',
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        //setArticle method creating shallow copy/spread of article with key value pairs
        setArticle({...article, [name]: value})
    };

    const handleImage = (event) => {
        const file = event.target.files[0];
        setArticle({...article, image:file})
        // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        const reader = new FileReader();
        reader.readAsDataURL(file);

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData
        const formData = new FormData();
        formData.append('image', article.image);
        formData.append('title', article.title);
        formData.append('body', article.body);
        formData.append('category', article.category);
        formData.append('phase', event.target.value);


    const options = {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: formData,
    };

    const response = await fetch("/api_v1/user/articles/", options);
    if (!response.ok) {
      throw new Error("Network response not ok.");
    }

    const data = await response.json();
    console.log(data);

    }


  return (
    <>
    <Container>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control name="image" type="file" onChange={handleImage} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" value={article.title} type="title" placeholder="Enter article title" onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Body</Form.Label>
        <Form.Control name="body" value={article.body} as="textarea" rows={3} onChange={handleChange} />
      </Form.Group>

      <Form.Select name="category" value={article.category} aria-label="Default select example" onChange={handleChange} >
      <option>Select Category</option>
      <option value={1}>News</option>
      <option value={2}>Sports</option>
      <option value={3}>Downtown</option>
      <option value={5}>Food</option>
    </Form.Select>

      <Button variant="primary" id="submit-article" type="submit" value="DFT" onClick={handleSubmit}>
        Save as Draft
      </Button>
      <Button variant="primary" id="submit-article" type="submit" value="SBM" onClick={handleSubmit}>
        Submit for Review
      </Button>

    </Form>
    </Container>
    </>
  );
}

export default SubmitArticle;
