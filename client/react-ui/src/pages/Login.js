import React, { useState } from "react";
import LoginForm from "../components/Forms/LoginForm";

import "./Form.css";

export default function Login() {
  const [error, setError] = useState();

  function handleError(error) {
    setError(error);
  }

  return (
    <div className="form-wrapper">
      {error && error.status === 401 && <p>Incorrect username or password</p>}
      {error && error.status != 401 && <p>An unexpected error occurred</p>}
      <h2>LOGIN</h2>
      <LoginForm onError={handleError} />
    </div>
  );
}
