export default function MedicineDetails() {
    return (
        <div className="container my-5">
            <div className="card shadow-lg border-0">
                
                {/* BIG IMAGE */}
                <img
                    src="https://via.placeholder.com/1200x500"
                    className="card-img-top"
                    alt="Medicine"
                    style={{ objectFit: "cover", maxHeight: "500px" }}
                />

                <div className="card-body p-5">
                    <h2 className="card-title mb-3">
                        Paracetamol 500mg Tablets
                    </h2>

                    <h4 className="text-success mb-4">
                        20 ₺
                    </h4>

                    <p className="text-muted fs-5">
                        Paracetamol is a widely used medicine for relieving mild to moderate
                        pain and reducing fever. It is commonly taken for headaches, muscle
                        pain, back pain, toothaches, and cold or flu-related discomfort.
                        This medicine is suitable for daily use when taken according to the
                        recommended dosage and is generally gentle on the stomach.
                    </p>

                    <p className="text-muted fs-5">
                        Each tablet contains 500mg of Paracetamol and is manufactured under
                        strict pharmaceutical standards to ensure safety and effectiveness.
                        It is recommended to consult a healthcare professional before use
                        if you are pregnant, breastfeeding, or taking other medications.
                    </p>

                    <p className="mb-4">
                        <strong>Status:</strong>{" "}
                        <span className="text-success">In Stock</span>
                        <span className="ms-3 text-muted">
                            (50 units available)
                        </span>
                    </p>

                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            className="form-control me-3"
                            style={{ width: "120px" }}
                            min="1"
                            defaultValue="1"
                        />
                        <button className="btn btn-primary btn-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}