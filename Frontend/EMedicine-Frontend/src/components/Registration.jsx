import "../styles/Registration.css";

export default function Registration() {
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
                                    type="text"
                                    id="firstName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your first name"
                                />
                                <label className="form-label" htmlFor="firstName">
                                    First Name
                                </label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="text"
                                    id="lastName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your last name"
                                />
                                <label className="form-label" htmlFor="lastName">
                                    Last Name
                                </label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                />
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label>
                            </div>
                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                />
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    id="termsCheck"
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