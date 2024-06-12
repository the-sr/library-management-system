import { useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "../../pages/Notification";

export const HeaderComponent = () => {
  const [openNotification, setOpenNotification] = useState(false);

  let loggedUser = JSON.parse(localStorage.getItem("library_system"));
  let navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("library_system_token");
    localStorage.removeItem("library_system");
    navigate("/login");
  };

  const handleClickNotification = () => {
    setOpenNotification(!openNotification);
  };
  // const handleCloseNotification=()
  {
    console.log(openNotification);
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container style={{ position: "relative", top: "0" }}>
          <Nav className="me-auto">
            <NavLink className={"nav-link"} to="/">
              Home
            </NavLink>
            <NavLink className={"nav-link"} to="/about">
              About
            </NavLink>
            <NavLink className={"nav-link"} to="/contact">
              Contact
            </NavLink>
          </Nav>
          <Nav>
            {loggedUser ? (
              <>
                {/* <NavLink className={"nav-link"} to={"/notification"}><i className="fa-solid fa-id-badge me-2"/>Votification</NavLink> */}
                <div className={"nav-link"} onClick={handleClickNotification}>
                  <i class="fa-solid fa-bell"></i>
                </div>
                <NavLink className={"nav-link"} to={"/" + loggedUser.role}>
                  <i className="fa-solid fa-id-badge me-2" />
                  {loggedUser.name}
                </NavLink>
                <NavLink className={"nav-link"} to="#" onClick={logout}>
                  <i className="fa-solid fa-power-off me-2" />
                  Logout
                </NavLink>
                {openNotification && <Notification />}
              </>
            ) : (
              <>
                <NavLink className={"nav-link"} to="/login">
                  Login
                </NavLink>
                <NavLink className={"nav-link"} to="/register">
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export const FooterComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom" style={{ height: "20px" }}>
      <Container className="justify-content-center">
        <Nav>
          <Nav.Link
            href="https://github.com/the-sr"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center"
          >
            <i className="fa-brands fa-github" />
            <span className="ms-2">Sagar Rijal</span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
