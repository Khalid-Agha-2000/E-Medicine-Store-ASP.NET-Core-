import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let userId;

    if (token) {
        const decoded = jwtDecode(token);
        userId = parseInt(decoded.sub, 10);
    }

    const itemsPerPage = 3;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = orders.slice(startIndex, endIndex);
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => page >= currentPage - 2 && page <= currentPage + 2);

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:5001/User/order-list/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data.listOrders || []);
        })
        .catch(err => console.error(err));
    }, [userId]);

    return (
        <div className="container my-5 page-content">
            <h2 className="text-center mb-4">Your Orders</h2>

            {currentOrders.length > 0 ? (
                currentOrders.map(order => (
                    <div key={order.id} className="border rounded p-4 mb-4 shadow-sm">
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <strong>Order ID</strong>
                                <div>{order.id}</div>
                            </div>

                            <div className="col-md-4">
                                <strong>Total Price</strong>
                                <div>{order.orderTotal}₺</div>
                            </div>

                            <div className="col-md-4">
                                <strong>Status</strong>
                                <div>{order.orderStatus}</div>
                            </div>
                        </div>

                        <div>
                            <strong>Order Items</strong>
                            <div className="mt-2">
                                {order.orderItems && order.orderItems.length > 0
                                    ? order.orderItems.map((item, index) => (
                                        <div key={index}>
                                            {item.medicine.name}
                                        </div>
                                    ))
                                    : "No items"}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-4">
                    You haven't placed any orders yet! <br /><br />
                    <button
                        onClick={() => navigate("/shop")}
                        className="btn btn-sm btn-success"
                    >
                        Shop Now
                    </button>
                </div>
            )}

            {totalPages > 1 && (
                <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        {visiblePages.map(pageNumber => (
                            <li
                                key={pageNumber}
                                className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}