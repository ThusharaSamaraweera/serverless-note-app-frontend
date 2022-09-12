import React, { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate()
  
  const onLoad = async () => {
    try {
      await Auth.currentSession()
        .then(() => {
          setAuthenticated(true);
        })
        .catch((e) => {
          setAuthenticated(false);
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
    setIsAuthenticating(false);
  }

  useEffect(() => {
    onLoad();
  }, []);

  const handleOnLogout = async () => {
    await Auth.signOut();
    setAuthenticated(false);
    navigate("/login");
  }

  return (
    !isAuthenticating ? (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Scratch
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleOnLogout} >Logout</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>
        <Routes />
      </AppContext.Provider>
      </div>
    ) : (
        <></>
    )
  );
}

export default App;
