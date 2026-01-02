import '../styles/Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

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
        fetch("http://localhost:5001/User/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.statusCode === 200) {
                localStorage.setItem("token", data.token);
                navigate("/shop");
            } else {
                alert("Login Failed Please Try Again");
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <section className="login-section d-flex align-items-center">
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
                            <p className="lead fw-bold mb-3">Sign in</p>

                            <div className="form-outline mb-4">
                                <input
                                    name="Email"
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    onChange={handleChange}
                                />
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
                                />
                                <label className="form-label" htmlFor="form3Example4">
                                    Password
                                </label>
                            </div>

                            {/* <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id="form2Example3"
                                    />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">
                                    Forgot password?
                                </a>
                            </div> */}

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
                                    <a href="/registration" className="link-danger">
                                        Register
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