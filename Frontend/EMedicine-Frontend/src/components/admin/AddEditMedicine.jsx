export default function AddEditMedicine() {
    return (
        <div className="container py-5 mt-5">
            <div className="row">
                <div className="col-md-6 col-lg-8 mx-auto">
                    <h4 className="mb-4">Add / Edit Medicine</h4>
                    <form className="card p-4 shadow-sm">
                        <div className="mb-3">
                            <label className="form-label">Medicine Name</label>
                            <input type="text" className="form-control" placeholder="Enter medicine name" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Manufacturer</label>
                            <input type="text" className="form-control" placeholder="Enter manufacturer" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Unit Price (₺)</label>
                            <input type="number" step="0.01" className="form-control" placeholder="Enter price" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Discount (%)</label>
                            <input type="number" step="0.01" className="form-control" placeholder="Enter discount" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stock Quantity</label>
                            <input type="number" className="form-control" placeholder="Enter stock amount" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input type="text" className="form-control" placeholder="Enter image URL" />
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
            </div>
        </div>
    );
}
