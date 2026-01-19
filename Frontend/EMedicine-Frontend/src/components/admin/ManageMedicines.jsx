import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useFlashMessage } from "../FlashMessageContext";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const {setFlashMessage} = useFlashMessage();
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem("token");
    const [medicines, setMedicines] = useState([]);

    // pagination calculations
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMedicines = medicines.slice(startIndex, endIndex);
    const totalPages = Math.ceil(medicines.length / itemsPerPage);
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(page =>
        page >= currentPage - 2 && page <= currentPage + 2
    );


    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/Medicine/get-medicines`, {
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

    const handleDelete = (id) => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/Medicine/delete-medicine/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            if(data.statusCode === 200){
                setFlashMessage({message: "Medicine was deleted successfully", type: "danger"});
                setMedicines(prev => prev.filter(med => med.id !== id));
            } else {
                setFlashMessage({message: "Medicine was not deleted, try again!", type: "danger"});
            }
        })
        .catch(err => console.error(err));
    }

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
                {currentMedicines.map(med => (
                    <tr key={med.id}>
                    <td>{med.name}</td>
                    <td>{med.unitPrice}₺</td>
                    <td>{med.quantity}</td>
                    <td>
                        <button onClick={() => navigate("/add-edit-medicine",
                            {state: {
                                medicine: {
                                    ID: med.id,
                                    Name: med.name,
                                    Manufacturer: med.manufacturer,
                                    UnitPrice: med.unitPrice,
                                    Discount: med.discount,
                                    Quantity: med.quantity,
                                    ImageUrl: med.imageUrl,
                                    Description: med.description,
                                }
                            }
                            })} className="btn btn-sm btn-primary me-2">
                        Edit
                        </button>
                        <button onClick={() => {handleDelete(med.id)}} className="btn btn-sm btn-danger">
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {visiblePages.map(pageNumber => {
                        return(
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
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}