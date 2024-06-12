import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth_service } from "../../../services/auth.service";
import { toast } from "react-toastify";
import "../../../assets/css/auth.page.css";

const LoginPage = () => {
  let [data, setData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let user = await auth_service.login(data);
      toast.success("Welcome");
      navigate("/" + user.role);
    } catch (e) {
      if (e?.response?.status === 400) {
        if (e?.response?.data?.msg) {
          toast.error("Invalid email or password");
        }
      } else {
        toast.warning(e.response.data.msg);
      }
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("library_system_token");
    let user = JSON.parse(localStorage.getItem("library_system"));
    if (token) {
      navigate("/" + user.role);
    }
  }, [navigate]);

  return (
    <div className="page">
      <Container>
        <Row>
          <Col>
            <h1 className="text-center lable-color">Sign In</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 lable-color"
                controlId="formGroupEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={data.email}
                />
              </Form.Group>

              <Form.Group
                className="mb-3 lable-color"
                controlId="formGroupPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                />
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
  );
};

export default LoginPage;
