import { useState } from "react";
import "../styles/Registration.css";
import {Link, useNavigate} from "react-router-dom";
import {useFlashMessage} from "./FlashMessageContext";


export default function Register() {
const navigate = useNavigate();
const [validated, setValidated] = useState(false);
const {setFlashMessage} = useFlashMessage();

    const [formData, setFormData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        terms: false,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRegister = () => {
        setValidated(true);
        if(!formData.terms) {
            alert('You must agree to the terms');
            return;
        }

        fetch(`${import.meta.env.VITE_API_BASE_URL}/User/register`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.statusCode === 200) {
                setFlashMessage({message: "Registration successful. Please login.", type: "success"});
                navigate("/login");
            } else {
                setFlashMessage({message: "Registration failed", type: "danger"});
            }
        })
        .catch(err => console.error(err));
    };

    

    return (
        <section className="registration-section d-flex align-items-center mt-5">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center py-5">
                    <div className="col-md-9 col-lg-6 col-xl-5 mb-4 mb-lg-0">
                        <img
                            src="https://res.cloudinary.com/dmgc9mh7j/image/upload/v1768669078/Logo_for_EMedicine_cbpodu.png"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form noValidate className={validated ? "was-validated" : ""}>
                            <p className="lead fw-bold mb-3">Register</p>

                            <div className="form-outline mb-3">
                                <input
                                    name="FirstName"
                                    type="text"
                                    id="firstName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your first name"
                                    onChange={handleChange}
                                    required
                                    value={formData.FirstName}
                                />
                                <div className="invalid-feedback">Please enter your first name</div>
                                <label className="form-label" htmlFor="firstName">
                                    First Name
                                </label>
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    name="LastName"
                                    type="text"
                                    id="lastName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your last name"
                                    onChange={handleChange}
                                    required
                                    value={formData.LastName}
                                />
                                <div className="invalid-feedback">Please enter your last name</div>
                                <label className="form-label" htmlFor="lastName">
                                    Last Name
                                </label>
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    name="Email"
                                    type="email"
                                    id="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    onChange={handleChange}
                                    required
                                    value={formData.Email}
                                />
                                <div className="invalid-feedback">Please enter a valid email address</div>
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    name="Password"
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    value={formData.Password}
                                />
                                <div className="invalid-feedback">Please enter your password (At least 6 caharacters)</div>
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="form-check mb-4">
                                <input
                                    name="terms"
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="termsCheck"
                                    onChange={handleChange}
                                    required
                                    checked={formData.terms}
                                />
                                <div className="invalid-feedback">Please accept the terms before registration</div>
                                <label className="form-check-label" htmlFor="termsCheck">
                                    I agree to the terms and conditions
                                </label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already have an account?{' '}
                                    <Link to={"/login"} className="link-danger">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}