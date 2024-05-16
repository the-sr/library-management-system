import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { HeaderComponent } from "../../../components/home/home.component";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    let [data, setData] = useState({
        emial: null,
        password: null
    })
    const handleChange = (e) => {
        //let { name, type, value, checked, files } = e.target
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
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