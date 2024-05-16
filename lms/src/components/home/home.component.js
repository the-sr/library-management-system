import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const HeaderComponent = () => {
    return (<>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Library</Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink className={"nav-link"} to="/">Home</NavLink>
                    <NavLink className={"nav-link"} to="/">About</NavLink>
                    <NavLink className={"nav-link"} to="/">Contact</NavLink>
                </Nav>
                <Nav>
                    <NavLink className={"nav-link"} to="/login">Login</NavLink>
                    <NavLink className={"nav-link"} to="/register">Register</NavLink>
                    {/* <Nav.Link href="#user">User</Nav.Link>
                        <Nav.Link href="#logout">Logout</Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    </>)
} 