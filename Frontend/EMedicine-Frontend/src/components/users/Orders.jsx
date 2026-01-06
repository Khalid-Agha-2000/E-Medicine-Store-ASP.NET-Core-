import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Orders() {

    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    let userId;

    if(token){
        const decoded = jwtDecode(token);
        userId = parseInt(decoded.sub, 10);
    }

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/User/orderList/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data.listOrders || []);
        })
        .catch(err => console.error(err));
    },[]);

    return (
        <div className="container my-5 page-content">
            <h2 className="text-center mb-4">Your Orders</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ?(
                            orders.map(order => (
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.orderTotal}</td>
                                    <td>{order.orderStatus}</td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    You haven't placed any orders yet! <br /><br /> <button onClick={() => navigate("/shop")} className="btn btn-sm btn-success">Shop Now</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}