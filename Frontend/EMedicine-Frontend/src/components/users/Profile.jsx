import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Profile() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox"? checked : value,
        });
    };

    let token = localStorage.getItem("token");
    let id;
    if(token) {
        const decoded = jwtDecode(token);
        id = parseInt(decoded.sub, 10);
    }

    const handleUpdate = () => {
        fetch(`http://localhost:5001/User/update-profile/${id}`, {method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .catch(err => console.error(err));
    };

    useEffect(() => {
        fetch(`http://localhost:5001/User/get-user/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            const user = data.user;
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            });
        })
        .catch(err => console.error(err));
    }, [id, token]);

    return (
        <div className="container my-5 page-content">
            <h2 className="text-center mb-4">My Profile</h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="text"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
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