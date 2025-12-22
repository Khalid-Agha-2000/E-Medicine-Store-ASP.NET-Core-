export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
            <a className="navbar-brand" href="#">EMedicine</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Shop</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cart</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Orders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Manage Medicines</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Manage Customers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Manage Orders</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <button className="btn btn-success" type="submit">Login</button>
                    <button className="btn btn-success ms-3" type="submit">Register</button>
                </form>
            </div>
            </div>
        </nav>
    );
}