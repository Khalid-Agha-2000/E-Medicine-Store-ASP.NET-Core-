export default function Header() {
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
                    <li className="nav-item">
                        <a className="nav-link" href="managemedicines">Manage Medicines</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/customerlist">Manage Customers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/adminorders">Manage Orders</a>
                    </li>
                </ul>
         
                    <a href='/login' className="btn btn-success">Login</a>
                    <a href='/registration' className="btn btn-success ms-3" type="submit">Register</a>

            </div>
            </div>
        </nav>
    );
}