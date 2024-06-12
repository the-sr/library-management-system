import "../../assets/css/about-page.css";
import { Container, Row, Col, Card } from "react-bootstrap";

const AboutPage = () => {
  return (
    <div className="about-page">
      <Container style={{ marginTop: "50px" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h1 className="text-center mb-4">About Us</h1>
                <h5 className="text-center mb-4">Library Management System</h5>
                <hr />
                <p>
                  Developed By: <strong>Sagar Rijal</strong>
                </p>
                <p>
                  This product was developed as the requirement for the degree
                  of BIM
                </p>
                <p>
                  For only use in{" "}
                  <strong>Siddhartha Vanasthali Institute</strong>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage;
