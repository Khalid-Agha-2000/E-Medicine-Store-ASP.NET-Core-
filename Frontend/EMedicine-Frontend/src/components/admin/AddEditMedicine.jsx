import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFlashMessage } from "../FlashMessageContext";
import { useNavigate } from "react-router-dom";

export default function AddEditMedicine() {
    const [validated, setValidated] = useState(false);
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        Name: "",
        Manufacturer: "",
        UnitPrice: 0,
        Discount: 0,
        Quantity: 0,
        ImageUrl: "",
        Description: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const location = useLocation();
    const medicine = location.state?.medicine;
    useEffect(() => {
        if(medicine) {
            setFormData({
                ...medicine,
                ID: medicine.ID,
            });
        }
    }, [medicine])

    const token = localStorage.getItem("token");

    const handleSave = () => {
        const dataToSend = {
            ...formData,
            ExpDate: new Date().toISOString(),
            Status: "In Stock"
        }

        const url = formData.ID?
        `http://localhost:5001/Medicine/edit-medicine/${formData.ID}`
        :"http://localhost:5001/Medicine/add-medicine";

        fetch(url, {
            method: formData.ID? "PUT": "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend),
        })
        .then(res => res.json())
        .then(data => {
            if(data.statusCode === 200){
                setFlashMessage({message: "Medicine data saved successfully", type: "success"});
                navigate("/manage-medicines");
            } else {
                setFlashMessage({message: "Medicine data was not saved, try again!", type: "danger"});
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="container py-5 mt-5">
            <div className="row">
                <div className="col-md-6 col-lg-8 mx-auto">
                    <h4 className="mb-4">Add / Edit Medicine</h4>
                    <form className={`card p-4 shadow-sm ${validated ? "was-validated" : ""}`} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Medicine Name</label>
                            <input
                            value={formData.Name}
                            name="Name"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter medicine name"
                            required
                            />
                            <div className="invalid-feedback">Please enter medicine name (at least 6 characters)</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Manufacturer</label>
                            <input
                            value={formData.Manufacturer}
                            name="Manufacturer" type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter manufacturer"
                            required
                            />
                            <div className="invalid-feedback">Please enter manufacturer (at least 6 characters)</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Unit Price (₺)</label>
                            <input
                            value={formData.UnitPrice}
                            name="UnitPrice"
                            type="number"
                            step="0.01"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                            min={0.01}
                            max={9999.99}
                            />
                            <div className="invalid-feedback">Price must be between 0.01₺ and 9999.99₺</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Discount (%)</label>
                            <input
                            value={formData.Discount}
                            name="Discount"
                            type="number"
                            step="0.01"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter discount"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stock Quantity</label>
                            <input
                            value={formData.Quantity}
                            name="Quantity"
                            type="number"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter stock amount"
                            required
                            min={1}
                            />
                            <div className="invalid-feedback">Stock must be at least 1</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                            value={formData.ImageUrl}
                            name="ImageUrl"
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                            value={formData.Description}
                            name="Description"
                            className="form-control"
                            onChange={handleChange}
                            rows="3"
                            placeholder="Optional description"
                            required
                            minLength={20}
                            ></textarea>
                            <div className="invalid-feedback">Please enter a description</div>
                        </div>

                        <button onClick={(e)=> {e.preventDefault(); handleSave(); setValidated(true);}} type="submit" className="btn btn-success">
                            Save Medicine
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
