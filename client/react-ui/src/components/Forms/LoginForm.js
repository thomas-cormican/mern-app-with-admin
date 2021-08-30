import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../Input/Input";
import Button from "../Button/Button";
import { AuthContext } from "../../context/auth-context";

import "./LoginForm.css";

export default function LoginForm(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    const res = await auth.login(event, username, password);
    setUsername("");
    setPassword("");
    if (res) {
      console.log(res.response);
      props.onError(res.response);
    } else {
      history.push("/");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <Input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <Button type="submit" style="primary">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}
