import "../styles/Registration.css";

export default function Registration() {
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img 
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" 
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <p className="lead fw-bold mb-3 me-3">Register with</p>
                            <div className="form-outline mb-3">
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    className="form-control form-control-lg" 
                                    placeholder="Enter your first name" 
                                />
                                <label className="form-label" htmlFor="firstName">First Name</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    className="form-control form-control-lg" 
                                    placeholder="Enter your last name" 
                                />
                                <label className="form-label" htmlFor="lastName">Last Name</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" 
                                />
                                <label className="form-label" htmlFor="email">Email address</label>
                            </div>

                            <div className="form-outline mb-3">
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="form-control form-control-lg"
                                    placeholder="Enter password" 
                                />
                                <label className="form-label" htmlFor="password">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="form-check">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="termsCheck" />
                                    <label className="form-check-label" htmlFor="termsCheck">
                                        I agree to the terms and conditions
                                    </label>
                                </div>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-success btn-lg"
                                    style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>
                                    Register
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already have an account? <a href="/" className="link-danger">Login</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>
                <div>
                    <a href="#!" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
                    <a href="#!" className="text-white me-4"><i className="fab fa-twitter"></i></a>
                    <a href="#!" className="text-white me-4"><i className="fab fa-google"></i></a>
                    <a href="#!" className="text-white"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </section>
    );
}