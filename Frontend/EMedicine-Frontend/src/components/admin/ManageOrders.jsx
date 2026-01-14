import { useEffect, useState } from "react";
import { useFlashMessage } from "../FlashMessageContext";

export default function ManageOrders() {
    let token = localStorage.getItem("token");
    const {setFlashMessage} = useFlashMessage();
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
                        {orders.map(order => (
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
        </div>
    );
}