import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth_service } from "../../../services/auth.service";

const LoginPage = () => {
    let [data, setData] = useState({
        email: null,
        password: null
    });
    let navigate = useNavigate();
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(data);
            let user = await auth_service.login(data);
            navigate("/" + user.role);
        } catch (e) {
            console.log("Axios Error ", e);
        }
    }
    useEffect(() => {
        let token = localStorage.getItem("library_system_token");
        let user = JSON.parse(localStorage.getItem("library_system"))
        if (token) {
            navigate("/" + user.role)
        }
    }, [navigate])

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
                                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="danger me-3" type="reset">
                                Cancel
                            </Button>

                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>

    </>)
}

export default LoginPage;