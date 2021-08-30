import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Container from "../Container/Container";
import { AuthContext } from "../../context/auth-context";
import { ReactComponent as YourSvg } from "./icons8-menu.svg";
import "./Navbar.css";

const linkStyles = { textDecoration: "none", margin: "10px", color: "white" };

export default function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  async function logout(e) {
    await auth.logout(e);
    closeMenu();
    history.push("/");
  }

  function toggleMenu() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  let navLinks;

  if (!auth.user) {
    navLinks = (
      <div className="auth-links">
        <div className="auth-link">
          <Link to="/login" onClick={closeMenu} style={linkStyles}>
            Login
          </Link>
        </div>
        <div className="auth-link">
          <Link to="/signup" onClick={closeMenu} style={linkStyles}>
            Signup
          </Link>
        </div>
      </div>
    );
  } else {
    navLinks = (
      <div className="auth-links">
        <div className="auth-link">
          <Link onClick={logout} to="/" style={linkStyles}>
            Logout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="navbar">
        <Container>
          <nav>
            <div className="nav-home">
              <Link to="/" style={linkStyles}>
                Home
              </Link>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
              <div className="menu-icon">
                <YourSvg />
              </div>
            </div>
            {navLinks}
          </nav>
        </Container>
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="my-transition"
        unmountOnExit
      >
        <div className="menu">{navLinks}</div>
      </CSSTransition>
    </div>
  );
}
