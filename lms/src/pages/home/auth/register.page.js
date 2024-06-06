
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { auth_service } from "../../../services/auth.service";

// const RegisterPage = () => {
//     const defaultValue = {
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         role: "user",
//         preferredGenres: [],
//         image: null
//     };

//     const validationSchema = yup.object({
//         name: yup.string().required(),
//         email: yup.string().required().email(),
//         password: yup.string().required().min(8),
//         phone: yup.string().required(),
//         preferredGenres: yup.array().required().min(1),
//         image: yup.mixed().nullable()
//     });

//     const formik = useFormik({
//         initialValues: defaultValue,
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 let result=await auth_service.register(values);
//                 console.log("User registered successfully:", values);
//                 // Redirect to some page after successful registration
//             } catch (error) {
//                 console.error("Error registering user:", error);
//                 // Handle error
//             }
//         }
//     });

//     const handleCheckboxChange = (value) => {
//         const newPreferredGenres = formik.values.preferredGenres.includes(value)
//             ? formik.values.preferredGenres.filter(genre => genre !== value)
//             : [...formik.values.preferredGenres, value];

//         formik.setFieldValue("preferredGenres", newPreferredGenres);
//     };

//     return (
//         <div>
//             <Container>
//                 <Row>
//                     <Col>
//                         <h1 className="text-center">Sign Up</h1>
//                     </Col>
//                 </Row>
//                 <hr />
//                 <Row>
//                     <Col>
//                         <Form onSubmit={formik.handleSubmit}>
//                             <Form.Group className="row mb-3">
//                                 <Form.Label className="col-sm-3">Name: </Form.Label>
//                                 <Col sm={9}>
//                                     <Form.Control name="name" type="text" placeholder="Enter your name" required onChange={formik.handleChange} size="sm" />
//                                     <span className="text-danger">{formik.errors?.name}</span>
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group className="row mb-3">
//                                 <Form.Label className="col-sm-3">Email: </Form.Label>
//                                 <Col sm={9}>
//                                     <Form.Control name="email" type="email" placeholder="Enter your email" required onChange={formik.handleChange} size="sm" />
//                                     <span className="text-danger">{formik.errors?.email}</span>
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group className="row mb-3">
//                                 <Form.Label className="col-sm-3">Password: </Form.Label>
//                                 <Col sm={9}>
//                                     <Form.Control name="password" type="password" placeholder="Enter your Password" required onChange={formik.handleChange} size="sm" />
//                                     <span className="text-danger">{formik.errors?.password}</span>
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group className="row mb-3">
//                                 <Form.Label className="col-sm-3">Phone: </Form.Label>
//                                 <Col sm={9}>
//                                     <Form.Control name="phone" type="text" placeholder="Enter your Phone number" required onChange={formik.handleChange} size="sm" />
//                                     <span className="text-danger">{formik.errors?.phone}</span>
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group className="row mb-3">
//                                 <Form.Label className="col-sm-3">Preferred Genres: </Form.Label>
//                                 <Col sm={9}>
//                                     <div className="genre-checkboxes">
//                                         {["Thriller", "Romance", "Sci-Fi", "Fantasy"].map(genre => (
//                                             <Form.Check
//                                                 key={genre}
//                                                 inline
//                                                 label={genre}
//                                                 type="checkbox"
//                                                 id={genre}
//                                                 name="preferredGenres"
//                                                 value={genre}
//                                                 onChange={() => handleCheckboxChange(genre)}
//                                                 checked={formik.values.preferredGenres.includes(genre)}
//                                             />
//                                         ))}
//                                     </div>
//                                     <span className="text-danger">{formik.errors?.preferredGenres}</span>
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group className="row mb-3">
//                                 <Form.Label className="col-sm-3">Image: </Form.Label>
//                                 <Col sm={9}>
//                                     <Form.Control name="image" type="file" accept="image/*" onChange={(e) => {
//                                         formik.setFieldValue("image", e.currentTarget.files[0]);
//                                     }} />
//                                     <span className="text-danger">{formik.errors?.image}</span>
//                                 </Col>
//                             </Form.Group>
//                             <Form.Group className="row mb-3">
//                                 <Col sm={{ offset: 3, span: 9 }}>
//                                     <Button variant="danger" className="me-3" type="reset">
//                                         <i className="fa fa-trash me-3"></i>Cancel
//                                     </Button>
//                                     <Button variant="success" type="submit">
//                                         <i className="fa fa-paper-plane me-3"></i>Submit
//                                     </Button>
//                                 </Col>
//                             </Form.Group>
//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// };

// export default RegisterPage;

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { auth_service } from "../../../services/auth.service";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();

    const defaultValue = {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "user",
        preferredGenres: [],
        image: null
    };

    const validationSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        phone: yup.string().required(),
        preferredGenres: yup.array().required().min(1),
        image: yup.mixed().nullable()
    });

    const formik = useFormik({
        initialValues: defaultValue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let result = await auth_service.register(values);
                console.log("User registered successfully:", values);
                window.alert("Registration successful!");
                navigate('/login'); 
            } catch (error) {
                console.error("Error registering user:", error);
                window.alert("Registration failed. Please try again with another Email.");
            }
        }
    });

    const handleCheckboxChange = (value) => {
        const newPreferredGenres = formik.values.preferredGenres.includes(value)
            ? formik.values.preferredGenres.filter(genre => genre !== value)
            : [...formik.values.preferredGenres, value];

        formik.setFieldValue("preferredGenres", newPreferredGenres);
    };

    return (
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
                                <Form.Label className="col-sm-3">Name: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="name" type="text" placeholder="Enter your name" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.name}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Email: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="email" type="email" placeholder="Enter your email" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.email}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="password" type="password" placeholder="Enter your Password" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.password}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Phone: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="phone" type="text" placeholder="Enter your Phone number" required onChange={formik.handleChange} size="sm" />
                                    <span className="text-danger">{formik.errors?.phone}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Preferred Genres: </Form.Label>
                                <Col sm={9}>
                                    <div className="genre-checkboxes">
                                        {["Thriller", "Romance", "Sci-Fi", "Fantasy"].map(genre => (
                                            <Form.Check
                                                key={genre}
                                                inline
                                                label={genre}
                                                type="checkbox"
                                                id={genre}
                                                name="preferredGenres"
                                                value={genre}
                                                onChange={() => handleCheckboxChange(genre)}
                                                checked={formik.values.preferredGenres.includes(genre)}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-danger">{formik.errors?.preferredGenres}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Image: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control name="image" type="file" accept="image/*" onChange={(e) => {
                                        formik.setFieldValue("image", e.currentTarget.files[0]);
                                    }} />
                                    <span className="text-danger">{formik.errors?.image}</span>
                                </Col>
                            </Form.Group>
                            <Form.Group className="row mb-3">
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button variant="danger" className="me-3" type="reset">
                                        <i className="fa fa-trash me-3"></i>Cancel
                                    </Button>
                                    <Button variant="success" type="submit">
                                        <i className="fa fa-paper-plane me-3"></i>Submit
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegisterPage;
