import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFlashMessage } from "../FlashMessageContext";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
import.meta.env.VITE_CLOUDINARY_PRESET


export default function AddEditMedicine() {
    const [validated, setValidated] = useState(false);
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    const[formData, setFormData] = useState({
        Name: "",
        Manufacturer: "",
        UnitPrice: 0,
        Discount: 0,
        Quantity: 0,
        ImageUrl: "",
        Description: ""
    });

    const handleChange = async  (e) => {
        
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

    const handleSave = async () => {
        try {
            let imageUrl = formData.ImageUrl;

            if (imageFile) {
                const fd = new FormData();
                fd.append("file", imageFile);
                fd.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

                const cloudRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: fd
                    }
                );

                const cloudData = await cloudRes.json();
                imageUrl = cloudData.secure_url;
            }

            const dataToSend = {
                ...formData,
                ImageUrl: imageUrl,
                Discount: formData.Discount === "" ? null : Number(formData.Discount),
                ExpDate: new Date().toISOString(),
                Status: "In Stock"
            };

            const url = formData.ID
                ? `${import.meta.env.VITE_API_BASE_URL}/Medicine/edit-medicine/${formData.ID}`
                : `${import.meta.env.VITE_API_BASE_URL}/Medicine/add-medicine`;

            const res = await fetch(url, {
                method: formData.ID ? "PUT" : "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await res.json();

            if (data.statusCode === 200) {
                setFlashMessage({ message: "Medicine data saved successfully", type: "success" });
                navigate("/manage-medicines");
            } else {
                setFlashMessage({ message: "Medicine data was not saved, try again!", type: "danger" });
            }
        } catch (err) {
            console.error(err);
            setFlashMessage({ message: "Something went wrong!", type: "danger" });
        }

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
                            minLength={6}
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
                            minLength={6}
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
                            min={0}
                            max={99}
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
                            max={1000}
                            />
                            <div className="invalid-feedback">Stock must be at least 1</div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Image </label>
                            <input
                            placeholder="Select your image"
                            name="ImageUrl"
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            required={!formData.ID}
                            />
                            <div className="invalid-feedback">Select your medicine image</div>
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
