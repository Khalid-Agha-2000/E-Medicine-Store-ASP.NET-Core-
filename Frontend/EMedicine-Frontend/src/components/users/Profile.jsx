import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useFlashMessage } from "../FlashMessageContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [validated, setValidated] = useState(false);
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate();

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
        .then (data => {
            if(data.statusCode === 200){
                setFlashMessage({message: "Your profile info was update!", type: "success"});
                navigate("/shop");
            } else {
                setFlashMessage({Message: "Sorry, profile update failed!", type: "danger"});
            }
        })
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
        <div className="container mb-5 my-2 page-content">
            <h2 className="text-center mb-4">My Profile</h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form noValidate className={validated ? "was-validated" : ""}>
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">First name cannot be empty</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">Last name cannot be empty</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="invalid-feedback">Enter a valid email</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="text"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                            <div className="invalid-feedback">Password must be at least 6 characters</div>
                        </div>

                        <button type="submit" onClick={(e) => {e.preventDefault(); handleUpdate(); setValidated(true);}} className="btn btn-primary w-100">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}