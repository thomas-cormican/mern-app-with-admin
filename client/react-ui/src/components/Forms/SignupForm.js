import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../Input/Input";
import Button from "../Button/Button";
import { AuthContext } from "../../context/auth-context";
import "./LoginForm.css";

export default function SignupForm(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: [],
    username: [],
    password: [],
  });

  async function handleSubmit(event) {
    console.log("creating user");
    const res = await auth.signup(event, username, email, password);
    if (res) {
      console.log(res.response.data.errors);
      setErrors({
        email: res.response.data.errors.filter(
          (error) => error.param === "email" || error.path === "email"
        ),
        username: res.response.data.errors.filter(
          (error) => error.param === "username" || error.path === "username"
        ),
        password: res.response.data.errors.filter(
          (error) => error.param === "password"
        ),
      });
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      history.push("/");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <Input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorsList={errors.email}
          />
          <Input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            errorsList={errors.username}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorsList={errors.password}
          />
        </div>
        <div className="button-wrapper">
          <Button type="submit" style="primary">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
