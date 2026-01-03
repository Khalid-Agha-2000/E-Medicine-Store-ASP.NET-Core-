import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

export default function Cart() {

    let token = localStorage.getItem("token");
    let userType = null;
    let userId;

    if(token) {
        const decoded = jwtDecode(token);
        userType = decoded.type;
        userId = decoded.ID;
    }

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/Cart/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status == 401) {
                throw new Error("Unautherized");
            }
            return res.json();
        })
        .then(data => {
            setCarts(data.listCart || []);
        })
        .catch(err => console.error(err));
    }, [])

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-left">
                    <div className="col mb-5">
                        <div className="card h-100">
                            <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            <div className="card-body p-4">
                                <div className="text-center">
                                    <h5 className="fw-bolder">Fancy Product</h5>
                                    $40.00
                                </div>
                            </div>
                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Remove Medicine</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}