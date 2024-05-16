import { Col, Container, Row } from "react-bootstrap";
import { HeaderComponent } from "../../components/home/home.component"

const ErrorPage = () => {
    return (<>
        <HeaderComponent />
        <Container>
            <Row>
                <Col className="text-danger">
                    404 Not Found
                </Col>
            </Row>
        </Container>
    </>)
}
export default ErrorPage;