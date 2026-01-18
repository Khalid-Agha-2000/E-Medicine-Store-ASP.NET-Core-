import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-primary text-light mt-5">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-6 px-3">
                        <h5 className="mb-3" style={{ maxWidth: '350px', marginTop: "20px" }}>EMedicine</h5>
                        <p className="mb-2">
                             EMedicine — full-stack e-commerce pharmacy system
                             with Admin and User sides, built with React,
                             .NET Core Web API, and SQL Server.
                        </p>
                        <p className="mb-0">
                            Fast ordering, clear management, and a clean user experience.
                        </p>
                    </div>

                    <div className="col-md-6 px-3">
                        <div style={{ maxWidth: '350px', marginTop: "20px" }}>
                            <h5 className="mb-3">Quick Links</h5>
                            <p className="mb-2"><Link style={{color: "white"}} to={"/shop"}>Shop</Link></p>
                            <p className="mb-2"><Link style={{color: "white"}} to={"/cart"}>Cart</Link></p>
                            <p className="mb-2"><Link style={{color: "white"}} to={"/orders"}>Orders</Link></p>
                            <p className="mb-0"><Link style={{color: "white"}} to={"/profile"}>Profile</Link></p>
                        </div>
                    </div>
                </div>

                <hr className="border-light my-3" />

                <div className="text-center">
                    <small>
                        © {new Date().getFullYear()} EMedicine. All rights reserved.
                    </small>
                </div>
            </div>
        </footer>
    );
}