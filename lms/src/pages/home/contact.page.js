import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../assets/css/contact-page.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Container style={{ marginTop: "50px" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <h1 className="text-center mb-4">Contact Us</h1>
                <h5 className="text-center mb-4">
                  We're here to help and answer any questions you might have
                </h5>
                <hr />
                <p>Contact Us Through</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:test@gmail.com">test@gmail.com</a>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:01-0000000">01-0000000</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
