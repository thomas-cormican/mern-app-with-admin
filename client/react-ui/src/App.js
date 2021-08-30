import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import { AuthContext } from "./context/auth-context";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "/api/users/getuser",
    }).then((response) => setUser(response.data.user));
  }, []);

  async function handleLogin(e, username, password) {
    e.preventDefault();
    const loginDetails = {
      username,
      password,
    };
    try {
      const res = await axios.post("/api/users/login", loginDetails);
      setUser(res.data.user);
    } catch (err) {
      return err;
    }
  }

  async function handleSignup(e, username, email, password) {
    e.preventDefault();
    console.log("handling signup");
    const signupDetails = {
      username,
      email,
      password,
    };
    try {
      const res = await axios.post("/api/users", signupDetails);
      await handleLogin(e, username, password);
    } catch (err) {
      return err;
    }
  }

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.get("/api/users/logout");
    } catch (err) {}
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Container>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/signup" exact>
                <Register />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
