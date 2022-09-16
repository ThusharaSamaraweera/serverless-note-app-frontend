import React, { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import Routes from "./routes";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./utils/context/contextLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { IAuthUser } from "./types";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);
  const [authUser, setAuthUser] = useState<IAuthUser>({
    email: "",
    id: "",
  });

  const navigate = useNavigate();

  const onLoad = async () => {
    try {
      await Auth.currentSession()
        .then((data) => {
          setAuthUser({
            email: data.getIdToken().payload.email,
            id: data.getIdToken().payload.sub,
          });
          setAuthenticated(true);
        })
        .catch((e: any) => {
          setAuthenticated(false);
          console.log(e);
        });
    } catch (e: any) {
      toast.success(e.message);
      console.log(e);
    }
    setIsAuthenticating(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const handleOnLogout = async () => {
    await Auth.signOut();
    setAuthenticated(false);
    navigate("/login");
  };

  const handleOnClickProfile = () => {
    navigate("/profile");
  };

  const handleOnClickCreateNewNote = () => {
    navigate("/create-new-note");
  };

  return !isAuthenticating ? (
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
              <>
                <Nav.Link onClick={handleOnClickCreateNewNote}>
                  Create New Note
                </Nav.Link>
                <Nav.Link onClick={handleOnClickProfile}>Profile</Nav.Link>
                <Nav.Link onClick={handleOnLogout}>Logout</Nav.Link>
              </>
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
      <ToastContainer
        closeButton={false}
        position="top-right"
        autoClose={8000}
      />
      <AppContext.Provider
        value={{
          isAuthenticated,
          setAuthenticated,
          authUser,
          setAuthUser,
        }}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  ) : (
    <></>
  );
};

export default App;
