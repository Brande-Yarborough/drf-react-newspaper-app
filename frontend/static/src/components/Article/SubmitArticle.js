import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


function SubmitArticle() {
    const [article, setArticle] = useState({

        image: null,
        title: '', 
        body: '', 
        category: '',
    });

  return (
    <>
    <Container>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="title" placeholder="Enter article title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Body</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="News">News</option>
      <option value="Sports">Sports</option>
      <option value="Downtown">Downtown</option>
      <option value="Food">Food</option>
    </Form.Select>

      <Button variant="primary" type="submit">
        Save as Draft
      </Button>
      <Button variant="primary" type="submit">
        Submit for Review
      </Button>

    </Form>
    </Container>
    </>
  );
}

export default SubmitArticle;
