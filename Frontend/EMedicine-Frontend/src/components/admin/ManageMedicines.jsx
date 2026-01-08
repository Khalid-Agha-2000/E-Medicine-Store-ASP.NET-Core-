import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const token = localStorage.getItem("token");


    const [medicines, setMedicines] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5001/Medicine/get-medicines", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => setMedicines(data.listMedicines))
        .catch(err => console.error(err));
    }, []);


    return (
        <div className="container mt-4 page-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Manage Medicines</h4>
            <button onClick={() => navigate("/add-edit-medicine")} className="btn btn-success">
            Add Medicine
            </button>
        </div>

        <table className="table table-bordered table-hover">
            <thead className="table-primary">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th style={{ width: "160px" }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {medicines.map(med => (
                <tr key={med.id}>
                <td>{med.name}</td>
                <td>{med.unitPrice}₺</td>
                <td>{med.quantity}</td>
                <td>
                    <button className="btn btn-sm btn-primary me-2">
                    Edit
                    </button>
                    <button className="btn btn-sm btn-danger">
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        <nav className="d-flex justify-content-center">
            <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(1)}>1</button>
            </li>
            <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(2)}>2</button>
            </li>
            <li className={`page-item ${currentPage === 3 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(3)}>3</button>
            </li>
            </ul>
        </nav>
        </div>
    );
}