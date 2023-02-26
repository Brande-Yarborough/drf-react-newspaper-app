// import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
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

  return (
    <>
      <div className="main-container">
        <section className="article-container">{articlesHTML}</section>
        <aside className="main-aside">
          <h4>Upcoming Events</h4>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="media/aside/basketball.jpg"
              alt="basketball"
            />
            <Card.Body>
              <Card.Title>SEC Women's Basketball Tournament</Card.Title>
              <Button>
                <a
                  href="https://www.secsports.com/article/10971306/championship-women-basketball"
                  target="_blank"
                  variant="primary"
                >
                  Get Tickets
                </a>
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="media/aside/concert.jpg"
              alt="concert"
            />
            <Card.Body>
              <Card.Title>Beyonce Rennaisance Tour</Card.Title>
              <Button>
                <a
                  href="https://tour.beyonce.com/"
                  target="_blank"
                  variant="primary"
                >
                  Get Tickets
                </a>
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="media/aside/duck2.jpg"
              alt="rubber ducks"
            />
            <Card.Body>
              <Card.Title>Reedy River Duck Derby</Card.Title>
              <Button>
                <a
                  href="https://www.duckrace.com/greenville"
                  target="_blank"
                  variant="primary"
                >
                  Adopt a Duck
                </a>
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="media/aside/laptop.jpg" alt="laptop" />
            <Card.Body>
              <Card.Title>Carolina Code School Demo Day</Card.Title>
              <Button>
                <a
                  href="https://www.eventbrite.com/e/demo-day-at-carolina-code-school-cohort-14-tickets-506535630707"
                  target="_blank"
                  variant="primary"
                >
                  RSVP Now
                </a>
              </Button>
            </Card.Body>
          </Card>
        </aside>
      </div>
    </>
  );
}

export default ArticleList;
