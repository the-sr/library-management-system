import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

const RegisterPage = () => {

    let defaultValue = {
        name: "",
        email: "",
        password: "",
        address: "",
        role: "",
        image: null
    };

    let validate = yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        address: yup.string().nullable(),
        role: yup.string().required(),
        image: yup.mixed().nullable()
    })

    let formik = useFormik(
        {
            initialValues: defaultValue,
            validationSchema: validate,
            onSubmit: (values) => {
                console.log("submit:", values)
            }
        }
    )

    return (<>
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">Sign Up</h1>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col sm-3">Name: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="name" type="text" placeholder="Enter your name" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.name}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col sm-3">Email: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="email" type="email" placeholder="Enter your email" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.email}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="password" type="password" placeholder="Enter your Password" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.password}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col sm-3">Address: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="address" as={"textarea"} placeholder="Enter your Address" required onChange={formik.handleChange} size="sm" rows={7} style={{ resize: "none" }} />
                                    <span className="text-danger">{formik.errors?.address}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col sm-3">Role: </Form.Label>
                                <Col sm={9}>
                                    <Form.Select name="role" required onChange={formik.handleChange} size="sm">
                                        <option>--Select Any One--</option>
                                        <option value="user">User</option>
                                        <option value="librarian">Librarian</option>
                                    </Form.Select>
                                    <span className="text-danger">{formik.errors?.role}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col sm-3">Image: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="image" type="file" accept="image/*" onChange={(e) => {
                                        let { files } = e.target;
                                        let file = files[0];
                                        let ext = file.name.split(".");
                                        ext = ext.pop();
                                        if (['jp', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext.toLowerCase())) {
                                            if (file.size <= 10000000) {
                                                formik.setValues({
                                                    ...formik.values,
                                                    image: file
                                                })
                                            } else {
                                                formik.setErrors({
                                                    ...formik.errors,
                                                    image: "File size must be less than 10mb"
                                                })
                                            }
                                        } else {
                                            formik.setErrors({
                                                ...formik.errors,
                                                image: "File format not supported"
                                            })
                                        }
                                    }} />
                                    <span className="text-danger">{formik.errors?.image}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button variant="danger" className="me-3" type="reset" >
                                        <i className="fa fa-trash"></i>Cancel
                                    </Button>
                                    <Button variant="success" type="submit" >
                                        <i className="fa fa-paper-plane"></i>Submit
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>

    </>)
}

export default RegisterPage;