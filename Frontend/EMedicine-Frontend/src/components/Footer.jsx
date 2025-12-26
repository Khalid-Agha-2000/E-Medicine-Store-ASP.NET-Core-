export default function Footer() {
    return (
        <footer className="bg-primary text-light mt-5">
            <div className="container py-4">
                <div className="row">

                    <div className="col-md-6 px-4">
                        <h5 className="mb-3">EMedicine</h5>
                        <p className="mb-2">
                            EMedicine is a simple online pharmacy platform built to
                            demonstrate a full-stack application using .NET Core Web API
                            and React.
                        </p>
                        <p className="mb-0">
                            Fast ordering, clear management, and a clean user experience.
                        </p>
                    </div>

                    <div className="col-md-6 px-4">
                        <h5 className="mb-3">Quick Links</h5>
                        <p className="mb-2">Home</p>
                        <p className="mb-2">Shop</p>
                        <p className="mb-2">Cart</p>
                        <p className="mb-2">Orders</p>
                        <p className="mb-0">Profile</p>
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