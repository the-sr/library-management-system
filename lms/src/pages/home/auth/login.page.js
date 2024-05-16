import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { HeaderComponent } from "../../../components/home/home.component";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
    let [data, setData] = useState({
        emial: null,
        password: null
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data: ", data)
        //TODO: API INTEGRATION
        let user_detail = {
            result: {
                user: { _id: 123, name: '', email: '', role: 'librarian' },
                token: "jwttoken"
            }
        };
        localStorage.setItem("library_system", JSON.stringify(user_detail));
        localStorage.getItem("library_system");
        localStorage.removeItem("library_system");
        //localhoststorage,cookie
        //if success ==> dashboard/admin/librarian/seller
        navigate("/" + user_detail.result.user.role);
    }
    return (<>
        <div>
            <HeaderComponent />
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">LoginPage</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <NavLink >
                                <Button variant="danger me-3" type="reset">
                                    Cancel
                                </Button>
                            </NavLink>

                            <NavLink>
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                            </NavLink>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>

    </>)
}

export default LoginPage;