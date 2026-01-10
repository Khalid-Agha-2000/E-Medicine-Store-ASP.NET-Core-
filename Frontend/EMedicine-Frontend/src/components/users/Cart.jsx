import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Cart() {
    let navigate = useNavigate();

    let token = localStorage.getItem("token");
    let userType = null;
    let userId;

    if(token) {
        const decoded = jwtDecode(token);
        userId = parseInt(decoded.sub, 10);
    }

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/Cart/get-cart/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status == 401) {
                throw new Error("Unautherized");
            }
            return res.json();
        })
        .then(data => {
            setCarts(data.listCart || []);
        })
        .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5001/Cart/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setCarts(prev => prev.filter(cart => cart.id !== id));
        })
        .catch(err => console.error(err));
    };

    const handlePlaceOrder = () => {
        fetch(`http://localhost:5001/Cart/place-an-order/${userId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .catch(err => console.error(err));
    };

    return (
        <section className="py-5">
            <div className="container mt-5">
                <h3 className="mb-4">Your Cart</h3>

                <table className="table table-hover align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Medicine Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {carts.length > 0? (
                            carts.map((cart, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{cart.medicineName}</td>
                                    <td>{cart.unitPrice}₺</td>
                                    <td>{cart.quantity}</td>
                                    <td>{cart.discount ?? 0}</td>
                                    <td className="fw-bold">{cart.totalPrice}₺</td>
                                    <td className="text-center">
                                        <button onClick={() => handleDelete(cart.id)} className="btn btn-sm btn-danger">
                                            Remove Item
                                        </button>
                                    </td>
                                </tr>
                            )) 
                        ): (<tr>
                                <td colSpan="7" className="text-center py-4">
                                    Cart is empty <br /><br /> <button onClick={() => navigate("/shop")} className="btn btn-sm btn-success">Shop Now</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                {carts.length > 0 && (
                    <div className="mt-3 text-end">
                        <button onClick={handlePlaceOrder} className="btn btn-success">
                            Place an Order
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}