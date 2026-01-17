import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useFlashMessage } from "./FlashMessageContext";

export default function Header() {
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setFlashMessage({message: "You are now logged out. Stay healthy!", type: "success"});
        navigate("/shop");
    }

    const handleLogin = () => {
        navigate("/login");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const token = localStorage.getItem("token");
    let isLoggedIn = false;
    let userRole = null;

    if(token) {
        isLoggedIn = true;
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <div className="container">
            <Link className="navbar-brand" to="/shop">
                <img
                    src="https://res.cloudinary.com/dmgc9mh7j/image/upload/v1768669078/Logo_for_EMedicine_cbpodu.png"
                    alt="EMedicine-logo"
                    className="img-fluid"
                    style={{ height: "40px", width: "auto", filter: "drop-shadow(0 0px 3px rgba(255,255,255,1))" }}
                />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                    {isLoggedIn && userRole === "admin" && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manage-medicines">Manage Medicines</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manage-customers">Manage Customers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manage-orders">Manage Orders</Link>
                            </li>
                        </>
                    )}
                </ul>

                    {!isLoggedIn ? (
                        <>
                            <Link className="nav-link me-4" to="/cart"><i style={{color: "white"}} className="fas fa-cart-shopping"></i></Link>
                            <button className="btn btn-success" onClick={(e) => {e.preventDefault(); handleLogin();}}>Login</button>
                            <button className="btn btn-success ms-3" onClick={(e) => {e.preventDefault(); handleRegister();}}>Register</button>
                        </>
                    ) : (
                        <>
                        <Link className="nav-link me-4" to="/cart"><i style={{color: "white"}} className="fas fa-cart-shopping"></i></Link>
                        <button className="btn btn-success ml-3" onClick={(e) => {e.preventDefault(); handleLogout();}}>Logout</button>
                        </>

                    )}

            </div>
            </div>
        </nav>
    );
}