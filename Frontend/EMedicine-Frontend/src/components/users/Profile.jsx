import { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Profile() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        Address: "",
    });
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "chekcbox"? checked : value,
        });
    };

    let token = localStorage.getItem("token");
    let id;
    if(token) {
        const decoded = jwtDecode(token);
        id = parseInt(decoded.sub, 10);
    }

    const handleUpdate = () => {
        fetch(`/Cart/updateUser/${id}`, {method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => console.log("Update user"))
        .catch(err => console.error(err));
    };

    return (
        <div className="container my-5 page-content">
            <h2 className="text-center mb-4">My Profile</h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue="John"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue="Doe"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                defaultValue="john@email.com"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                defaultValue=""
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                defaultValue="Istanbul, Turkey"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" onClick={(e) => {e.preventDefault(); handleUpdate();}} className="btn btn-primary w-100">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}