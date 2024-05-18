import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { HeaderComponent } from "../../../components/home/home.component";
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
    let [data, setData] = useState({
        emial: null,
        password: null
    });
    let navigate = useNavigate();
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
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
        localStorage.setItem("library_system", JSON.stringify(user_detail.result.user));
        localStorage.setItem("library_system_token", user_detail.result.token);
        localStorage.getItem("library_system");
        localStorage.removeItem("library_system");
        //localhoststorage,cookie
        //if success ==> dashboard/admin/librarian/seller
        navigate("/" + user_detail.result.user.role);
    }
    useEffect(() => {
        let token = localStorage.getItem("library_system");
        let user = JSON.parse(localStorage.getItem("library_system"))
        if (token) {
            navigate("/" + user.role)
        }
    }, [])

    return (<>
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">Sign In</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
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

                            <NavLink to="/login" >
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