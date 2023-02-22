import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};

function LoginForm(props) {
  const [state, setState] = useState(INITIAL_STATE);

  const handleInput = (e) => {
    const { name, value } = e.target; //value of this inside event listener is event.target, value of this in fat arrow is LoginForm
    setState((prevState) => ({
      //previous changes to state will be executed in correct order, that is why we use function here
      //go get previous object, and now I'm going to update it
      //you would lose other properties if didn't spread out prevState
      ...prevState,
      [name]: value,
    }));
  };
  const handleError = (err) => {
    console.warn(err);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state), //state is object that has all properties to send up on post request: name, email, pass
    };
    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json(); //when we login and are registered we get key
    Cookies.set("Authorization", `Token ${data.key}`); //set auth cookie and value is token with key value when logged in and registered
    //when logout, need to remove cookie
    props.setAuth(true);
  };

  return (
    // <form onSubmit={handleSubmit}>

    //   <label htmlFor="username"></label>
    //   <input
    //     id="username"
    //     type="text"
    //     placeholder="Enter username"
    //     name="username"
    //     value={state.username}
    //     onChange={handleInput}
    //   />

    //   <label htmlFor="email"></label>
    //   <input
    //     id="email"
    //     type="email"
    //     placeholder="Enter email"
    //     name="email"
    //     value={state.email}
    //     onChange={handleInput}
    //   />

    //   <label htmlFor="password">Password</label>
    //   <input
    //     id="password"
    //     type="password"
    //     placeholder="password"
    //     name="password"
    //     value={state.password}
    //     onChange={handleInput}
    //   />

    //   <button type="submit">Login</button>
    // </form>
    <>
      <h1 className="news-header">The Greenville Times</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={state.email}
            onChange={handleInput}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={state.password}
            onChange={handleInput}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;