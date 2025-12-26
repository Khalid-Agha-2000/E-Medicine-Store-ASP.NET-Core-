export default function CustomerList() {
    const customers = [
        { id: 1, name: "Ali Veli", email: "ali@mail.com", role: "User" },
        { id: 2, name: "Ayşe Demir", email: "ayse@mail.com", role: "User" },
        { id: 3, name: "Mehmet Kaya", email: "mehmet@mail.com", role: "Admin" },
    ];

    return (
        <div className="container mt-4 page-content">
            <h4 className="mb-3">Manage Customers</h4>

            <table className="table table-bordered table-hover">
                <thead className="table-success">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th style={{ width: "160px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
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
        </div>
    );
}