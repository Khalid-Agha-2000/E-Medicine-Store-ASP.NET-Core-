import { useEffect, useState } from "react";

export default function AdminOrders() {
    let token = localStorage.getItem("token");
    const [orders, setOrders] = useState([]);

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
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderTotal}₺</td>
                                <td>
                                    <select value={order.orderStatus || ""} className="form-select">
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
        </div>
    );
}