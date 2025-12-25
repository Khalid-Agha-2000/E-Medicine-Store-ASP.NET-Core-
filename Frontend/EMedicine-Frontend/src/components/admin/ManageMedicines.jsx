import { useState } from "react";
export default function AdminDashboard() {
    const [currentPage, setCurrentPage] = useState(1);

    const medicines = [
        { id: 1, name: "Paracetamol", price: 20, stock: 50 },
        { id: 2, name: "Ibuprofen", price: 30, stock: 40 },
        { id: 3, name: "Aspirin", price: 25, stock: 60 },
    ];

    return (
        <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Manage Medicines</h4>
            <button className="btn btn-success">
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
                <td>{med.price} ₺</td>
                <td>{med.stock}</td>
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