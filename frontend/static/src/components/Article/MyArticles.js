import { useEffect, useState } from "react";
import ArticleEdit from "./ArticleEdit";

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

  const MyArticleListHTML = myArticles.map((article) => (
    <ArticleEdit key={article.id} {...article} />
  ));

  return <div>{MyArticleListHTML}</div>;
}

export default MyArticles;
