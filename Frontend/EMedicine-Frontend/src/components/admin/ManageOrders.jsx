import { useEffect, useState } from "react";
import { useFlashMessage } from "../FlashMessageContext";
import { useNavigate } from "react-router-dom";

export default function ManageOrders() {
    let token = localStorage.getItem("token");
    const {setFlashMessage} = useFlashMessage();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // paginatin
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = orders.slice(startIndex, endIndex);
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => page >= currentPage - 2 && page <= currentPage + 2);

    useEffect(() => {
        fetch("http://localhost:5001/Cart/get-all-orders", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            setOrders(data.listOrders)
        })
        .catch(err => console.error(err));
    }, []);


    const handleChange = async (orderId, newStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === orderId
                ? {...order, orderStatus: newStatus}
                : order
            )
        );

        try{
            await fetch(
                `http://localhost:5001/Cart/update-order-status/${orderId}?status=${newStatus}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then(res => res.json())
            .then(data => {
                if(data.statusCode === 200){
                    setFlashMessage({message: "Order status changed successfully", type: "success"});
                    navigate("/manage-orders");
                } else {
                    setFlashMessage({message: "Order status change failed, try again!", type: "danger"});
                }
            });
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };


    return (
        <div className="container my-5 page-content">
            <h2 className="text-center mb-4">Manage Orders</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderTotal}₺</td>
                                <td>
                                    <select onChange={(e) => {handleChange(order.id, e.target.value)}} value={order.orderStatus || ""} className="form-select">
                                        <option value="Processing">Processing</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
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