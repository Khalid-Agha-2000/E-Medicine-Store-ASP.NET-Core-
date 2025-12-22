import React from 'react';

export default function Orders() {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Your Orders</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>101</td>
                            <td>2025-12-22</td>
                            <td>Medicine A, Medicine B</td>
                            <td>$45</td>
                            <td>Delivered</td>
                        </tr>
                        <tr>
                            <td>102</td>
                            <td>2025-12-20</td>
                            <td>Medicine C</td>
                            <td>$25</td>
                            <td>Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}