import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/shop");
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/registration");
    }

    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    let userRole = null;

    if(token) {
        isLoggedIn = true;
        const decoded = jwtDecode(token);
        userRole = decoded.role || decoded.type;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
            <a className="navbar-brand" href="/shop">EMedicine</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/shop">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">Cart</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/orders">Orders</a>
                    </li>
                    {isLoggedIn && userRole === "admin" && (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/managemedicines">Manage Medicines</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/customerlist">Manage Customers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/adminorders">Manage Orders</a>
                            </li>
                        </>
                    )}
                </ul>

                    {!isLoggedIn ? (
                        <>
                            <button className="btn btn-success" onClick={(e) => {e.preventDefault(); handleLogin();}}>Login</button>
                            <button className="btn btn-success ms-3" onClick={(e) => {e.preventDefault(); handleRegister();}}>Register</button>
                        </>
                    ) : (
                        <button className="btn btn-success" onClick={(e) => {e.preventDefault(); handleLogout();}}>Logout</button>
                    )}

            </div>
            </div>
        </nav>
    );
}