import React, { useReducer, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dashboard from "./Dashboard";
import Alert from "react-bootstrap/Alert";
/**
 *
 * @param {*} state
 * @param {*} action
 * handling different actions
 */
function loginReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "validate": {
      return {
        ...state,
        validated: true,
      };
    }
    case "login": {
      return {
        ...state,
        isLoading: true,
        validated: true,
        error: false,
      };
    }
    case "success": {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case "error": {
      return {
        ...state,
        error: true,

        isLoading: false,
        username: "",
        password: "",
      };
    }
    case "logout": {
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: "",
        error: false,
        validated: false,
      };
    }
    default:
      break;
  }
  return state;
}
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: false,
  errorMsg: "Incorrect username or password",
  isLoggedIn: false,
  validated: false,
};
const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const {
    username,
    password,
    isLoading,
    error,
    isLoggedIn,
    validated,
    errorMsg,
  } = state;

  const handleLogout = () => {
    // sessionStorage.setItem('auth',false);
    dispatch({ type: "logout" });
    //setAuth(sessionStorage.setItem('auth',false))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    {
      dispatch({ type: "validate" });
    }
    if (validated) {
      try {
        axios
          .get("http://localhost:4000/login")
          .then(function (response) {
            console.log(response);
            if (
              response.data.username === username &&
              response.data.password === password
            ) {
              dispatch({ type: "success" });
            } else {
              dispatch({ type: "error" });
            }
          })
          .catch(function (error) {
            console.log(error);
            //  dispatch({type:'error'})
          });

        //setIsLoggedIn(true)
      } catch (error) {
        //setError('Incorrect')
        dispatch({ type: "error" });
      }
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <Dashboard handleLogout={handleLogout} />
      ) : (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div data-testid="errorID">
            {error ? <Alert variant="danger">{errorMsg}</Alert> : ""}
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.currentTarget.value,
                })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please choose a email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.currentTarget.value,
                });
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};
export default Login;
