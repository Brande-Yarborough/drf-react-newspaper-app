import "./App.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const [categories, setCategories] = useState(null); //use null because it is falsy

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api_v1/articles/categories/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      //method to get Categories
      setCategories(data);
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
  };

  if (!categories) {
    return <div>Fetching data ...</div>;
  }

  const categoriesHTML = categories.map((category) => (
    <li key={category.id}>{category.title}</li>
  ));

  return (
    <div className="App">
      {categoriesHTML}
      <button type="button" onClick={addCategory}>
        Add category!
      </button>
    </div>
  );
}

export default App;
