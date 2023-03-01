import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./components/App/App.js";
import LoginForm from "./components/Auth/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm";
import reportWebVitals from "./reportWebVitals";
import ArticleList from "./components/ArticleList";
import SubmitArticle from "./components/Article/SubmitArticle";
import MyArticles from "./components/Article/MyArticles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
          {/* Index routes render into their parent's Outlet at their parent's URL (like a default child route). */}
          {/* https://reactrouter.com/en/main/route/route#index */}
          <Route index element={<ArticleList />} />
          <Route path="submit" element={<SubmitArticle />} />
          <Route path="my-articles" element={<MyArticles />} />
        </Route>
        {/* //always put this at bottom for 404 page */}
        <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
