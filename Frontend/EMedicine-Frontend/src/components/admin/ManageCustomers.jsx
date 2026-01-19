import { useEffect, useState } from "react";
import { useFlashMessage } from "../FlashMessageContext";

export default function ManageCustomers() {
    let token = localStorage.getItem("token");
    const {setFlashMessage} = useFlashMessage();
    const [customers, setCustomers] = useState([]);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomers = customers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(customers.length / itemsPerPage);
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page => page >= currentPage - 2 && page <= currentPage + 2);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/User/get-all-users`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => setCustomers(data.listUsers))
        .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/User/delete-user/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => {
            if(data.statusCode === 200){
                setFlashMessage({message: "Medicine data saved successfully", type: "success"});
                setCustomers(prev => prev.filter(user => user.id !== id));
            } else {
                setFlashMessage({message: "Medicine data was not saved, try again!", type: "danger"});
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div className="container mt-4 page-content">
            <h4 className="mb-3">Manage Customers</h4>

            <table className="table table-bordered table-hover">
                <thead className="table-primary">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th style={{ width: "160px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCustomers.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td>
                                {user.type === "user" ? (
                                    <button onClick={() => {handleDelete(user.id)}} className="btn btn-sm btn-danger">
                                        Delete
                                    </button>
                                ) : null }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                    <nav className="d-flex justify-content-center mt-3">
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