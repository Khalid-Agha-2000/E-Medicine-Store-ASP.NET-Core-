import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";

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
        if(!userId) return;

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

            {orders.length > 0 ? (
                orders.map(order => (
                    <div
                        key={order.id}
                        className="border rounded p-4 mb-4 shadow-sm"
                    >
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <strong>Order ID</strong>
                                <div>{order.id}</div>
                            </div>

                            <div className="col-md-4">
                                <strong>Total Price</strong>
                                <div>{order.orderTotal}</div>
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
        </div>
    );
}