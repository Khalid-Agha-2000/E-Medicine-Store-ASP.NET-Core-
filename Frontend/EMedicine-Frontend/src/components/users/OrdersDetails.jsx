export default function OrderDetails() {
    return (
        <div className="container my-5">
            <h3 className="mb-4 text-center">Order Details</h3>

            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Order ID:</strong> #12345</p>
                            <p><strong>Status:</strong> Processing</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Order Date:</strong> 12 Sep 2025</p>
                            <p><strong>Total Amount:</strong> ₺420</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Ordered Medicines</h5>

                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-success">
                            <tr>
                                <th>Medicine</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Paracetamol</td>
                                <td>2</td>
                                <td>₺50</td>
                                <td>₺100</td>
                            </tr>
                            <tr>
                                <td>Vitamin C</td>
                                <td>1</td>
                                <td>₺80</td>
                                <td>₺80</td>
                            </tr>
                            <tr>
                                <td colSpan="3"><strong>Total</strong></td>
                                <td><strong>₺180</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}