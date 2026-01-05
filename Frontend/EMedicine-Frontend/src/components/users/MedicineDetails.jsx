import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MedicineDetails() {
    const {id} = useParams();

    const [med, setMed] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5001/Medicine/getMedicine/${id}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setMed(data.medicine);
            console.log("Medicine data:", data.medicine)
        })
        .catch(err => console.error(err));
    }, [id]);

    if (!med) {
        return null;
    }

    return (
        <div className="container py-5 my-5">
            <div className="card shadow-lg border-0">
                
                <img
                    src={med.imageUrl}
                    className="card-img-top"
                    alt="Medicine"
                    style={{ objectFit: "fit", maxHeight: "500px" }}
                />

                <div className="card-body p-5">
                    <h2 className="card-title mb-3">
                        {med.name} - {med.manufacturer}
                    </h2>

                    <h4 className="text-success mb-4">
                        {med.unitPrice}₺
                    </h4>

                    <p className="text-muted fs-5">
                        {med.description}
                        Paracetamol is a widely used medicine for relieving mild to moderate
                        pain and reducing fever. It is commonly taken for headaches, muscle
                        pain, back pain, toothaches, and cold or flu-related discomfort.
                        This medicine is suitable for daily use when taken according to the
                        recommended dosage and is generally gentle on the stomach. <br /><br />

                        Each tablet contains 500mg of Paracetamol and is manufactured under
                        strict pharmaceutical standards to ensure safety and effectiveness.
                        It is recommended to consult a healthcare professional before use
                        if you are pregnant, breastfeeding, or taking other medications.
                    </p>

                    <p className="mb-4">
                        <strong>Status:</strong>{" "}
                        <span className="text-success">In Stock</span>
                        <span className="ms-3 text-muted">
                            ({med.quantity} units available)
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