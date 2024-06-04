import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import UserProfile from "../common/user-profile.component";

export const HeaderComponent = () => {
    let loggedUser = JSON.parse(localStorage.getItem("library_system"));
    let navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("library_system_token");
        localStorage.removeItem("library_system");
        navigate("/login");
    }
    return (<>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container style={{ position: "relative", top: "0" }}>
                <Nav className="me-auto">
                    <NavLink className={"nav-link"} to="/">Home</NavLink>
                    <NavLink className={"nav-link"} to="/">About</NavLink>
                    <NavLink className={"nav-link"} to="/">Contact</NavLink>
                </Nav>
                <Nav>
                    {
                        loggedUser ? <>
                            <NavLink className={"nav-link"} to={"/" + loggedUser.role}>{loggedUser.name}</NavLink>
                            <NavLink className={"nav-link"} to="#logout" onClick={logout}>Logout</NavLink>
                        </> : <>
                            <NavLink className={"nav-link"} to="/login">Login</NavLink>
                            <NavLink className={"nav-link"} to="/register">Register</NavLink>
                        </>
                    }
                </Nav>
            </Container>
        </Navbar>

    </>)
}

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
}