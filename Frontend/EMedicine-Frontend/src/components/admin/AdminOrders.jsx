export default function AdminOrders() {
    return (
        <div className="container my-5 page-content">
            <h2 className="text-center mb-4">Manage Orders</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>101</td>
                            <td>john@email.com</td>
                            <td>2025-12-22</td>
                            <td>$45</td>
                            <td>Pending</td>
                            <td>
                                <select className="form-select">
                                    <option>Pending</option>
                                    <option>Processing</option>
                                    <option>Shipping</option>
                                    <option>Delivered</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>102</td>
                            <td>mary@email.com</td>
                            <td>2025-12-20</td>
                            <td>$25</td>
                            <td>Shipped</td>
                            <td>
                                <select className="form-select">
                                    <option>Pending</option>
                                    <option>Processing</option>
                                    <option>Shipping</option>
                                    <option>Delivered</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}