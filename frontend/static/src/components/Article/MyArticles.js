import { useEffect, useState } from "react";

function MyArticles() {
  const [myArticles, setMyArticles] = useState(null);

  useEffect(() => {
    const getMyArticles = async () => {
      const response = await fetch(`/api_v1/articles/`);
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setMyArticles(data);
    };
    getMyArticles();
  }, []);

  return <div>My articles</div>;
}

export default MyArticles;
