import { useEffect, useState } from "react";

export default function ManageCustomers() {
    let token = localStorage.getItem("token");

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/User/get-all-users", {
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
        fetch(`http://localhost:5001/User/delete-user/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(() => {
            setCustomers(prev => prev.filter(user => user.id !== id))
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
                    {customers.map(user => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.type}</td>
                            <td>
                                <button onClick={() => {handleDelete(user.id)}} className="btn btn-sm btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}