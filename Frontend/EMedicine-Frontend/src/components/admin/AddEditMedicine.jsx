import { useState } from "react";

export default function AddEditMedicine() {
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

    const token = localStorage.getItem("token");

    const handleSave = () => {
        const dataToSend = {
            ...formData,
            ExpDate: new Date().toISOString(),
            Status: "In Stock"
        }

        fetch("http://localhost:5001/Medicine/addMedicine", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend),
        })
        .then(res => res.json())
        .catch(err => console.error(err));
    }

    return (
        <div className="container py-5 mt-5">
            <div className="row">
                <div className="col-md-6 col-lg-8 mx-auto">
                    <h4 className="mb-4">Add / Edit Medicine</h4>
                    <form className="card p-4 shadow-sm">
                        <div className="mb-3">
                            <label className="form-label">Medicine Name</label>
                            <input value={formData.Name} name="Name" type="text" className="form-control" onChange={handleChange} placeholder="Enter medicine name" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Manufacturer</label>
                            <input value={formData.Manufacturer} name="Manufacturer" type="text" className="form-control" onChange={handleChange} placeholder="Enter manufacturer" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Unit Price (₺)</label>
                            <input value={formData.UnitPrice} name="UnitPrice" type="number" step="0.01" className="form-control" onChange={handleChange} placeholder="Enter price" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Discount (%)</label>
                            <input value={formData.Discount} name="Discount" type="number" step="0.01" className="form-control" onChange={handleChange} placeholder="Enter discount" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Stock Quantity</label>
                            <input value={formData.Quantity} name="Quantity" type="number" className="form-control" onChange={handleChange} placeholder="Enter stock amount" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input value={formData.ImageUrl} name="ImageUrl" type="text" className="form-control" onChange={handleChange} placeholder="Enter image URL" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea value={formData.Description} name="Description" className="form-control" onChange={handleChange} rows="3" placeholder="Optional description"></textarea>
                        </div>

                        <button onClick={(e)=> {e.preventDefault(); handleSave();}} type="submit" className="btn btn-success">
                            Save Medicine
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
