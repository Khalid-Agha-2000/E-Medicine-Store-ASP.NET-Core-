export default function AddEditMedicine() {
    return (
        <div className="container mt-4">
            <h4 className="mb-4">Add / Edit Medicine</h4>

            <form className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Medicine Name</label>
                    <input type="text" className="form-control" placeholder="Enter medicine name" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price (₺)</label>
                    <input type="number" className="form-control" placeholder="Enter price" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Stock Quantity</label>
                    <input type="number" className="form-control" placeholder="Enter stock amount" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder="Optional description"></textarea>
                </div>

                <button type="submit" className="btn btn-success">
                    Save Medicine
                </button>
            </form>
        </div>
    );
}
