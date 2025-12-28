import { useState } from "react";
import "../styles/Registration.css";
import {useNavigate} from "react-router-dom";


export default function Registration() {
const navigate = useNavigate();

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
        if(!formData.terms) {
            alert('You must agree to the terms');
            return;
        }

        fetch("http://localhost:5001/User/registration", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.statusCode === 200) {
                navigate("/shop");
            } else {
                alert("Registration Failed");
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
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <p className="lead fw-bold mb-3">Register</p>

                            <div className="form-outline mb-3">
                                <input
                                    name="FirstName"
                                    type="text"
                                    id="firstName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your first name"
                                    onChange={handleChange}
                                />
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
                                />
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
                                />
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
                                />
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
                                />
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
                                    <a href="/login" className="link-danger">
                                        Login
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}