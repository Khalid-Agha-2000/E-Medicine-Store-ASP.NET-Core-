import '../styles/Login.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFlashMessage } from './FlashMessageContext';

export default function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const {setFlashMessage} = useFlashMessage();

    const [formData, setFormData] = useState({
        Email: "",
        Password: "",
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleLogin = () => {
        setValidated(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}/User/login`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.statusCode === 200) {
                localStorage.setItem("token", data.token);
                setFlashMessage({message: "Welcome to E-Medicine. Find your medicines and stay healthy.", type: "success"});
                navigate("/shop");
            } else {
                setFlashMessage({message: "Failed to login. Please try again", type: "danger"});
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <section className="login-section d-flex align-items-center">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center mt-4 py-5">
                    <div className="col-md-9 col-lg-6 col-xl-5 mb-4 mb-lg-0">
                        <img
                            src="https://res.cloudinary.com/dmgc9mh7j/image/upload/v1768669078/Logo_for_EMedicine_cbpodu.png"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form noValidate className={validated ? "was-validated" : ""}>
                            <p className="lead fw-bold mb-3">Log in</p>
                            <p className="lead">Please login as an admin</p>
                            <p>Email: admin@emedicine.com Password: Admin321</p>
                            
                            <div className="form-outline mb-4">
                                <input
                                    name="Email"
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    onChange={handleChange}
                                    required
                                    value={formData.Email}
                                />
                                <div className="invalid-feedback">Please enter avalid email</div>
                                <label className="form-label" htmlFor="form3Example3">
                                    Email address
                                </label>
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    name="Password"
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    required
                                    value={formData.Password}
                                    minLength={6}
                                />
                                <div className="invalid-feedback">Please enter your password (At least 6 characters)</div>
                                <label className="form-label" htmlFor="form3Example4">
                                    Password
                                </label>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>

                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{' '}
                                    <Link to={"/register"} className="link-danger">
                                        Register
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