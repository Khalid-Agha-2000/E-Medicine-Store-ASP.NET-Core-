import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useFlashMessage } from "../FlashMessageContext";

export default function MedicineDetails() {
    const {id} = useParams();
    const {setFlashMessage} = useFlashMessage();

    const [med, setMed] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5001/Medicine/get-medicine/${id}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            setMed(data.medicine);
        })
        .catch(err => console.error(err));
    }, [id]);

    let userId;
    let token = localStorage.getItem("token");
    if(token){
        const decoded = jwtDecode(token);
        userId = parseInt(decoded.sub, 10);
    }

    const addToCart = (id, quantity, userId) => {
        fetch(`http://localhost:5001/cart/add-to-cart/${id}/${quantity}/${userId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.statusCode === 200) {
                    setFlashMessage({message: "Product added to cart succesfully", type: "success"});
                } else {
                    setFlashMessage({message: "Failed to add to cart. Please log in!", type: "danger"});
                }
            })
            .catch(err => console.error(err));
    };
    
    const [number, setNumber] = useState(1);
    const handleChange = (e) => {
        let value = Number(e.target.value);
        if (value > 10) value = 10;
        if (value < 1) value = 1;
        setNumber(value);
    };

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

                <div className="card-body">
                    <h2 className="card-title mb-3">
                        {med.name} - {med.manufacturer}
                    </h2>

                    <h4 className="text-success mb-4">
                        {med.unitPrice}₺
                    </h4>

                    <h4> Descriptioin</h4>
                    
                    <div className="min-h-25% p-2" style={{minHeight: "200px", height: "auto", border: "1px solid black", borderRadius: "4px"}}>
                        <p className="text-muted fs-5">
                            {med.description}
                        </p>
                    </div>

                    <p className="mb-4">
                        <strong>Status:</strong>{" "}
                        {med.quantity > 0 ? (
                            <span className="text-success">In Stock</span>
                        ) : 
                        (<span className="text-danger">Out of Stock</span>)
                        }
                        
                        <span className="ms-3 text-muted">
                            ({med.quantity} units available)
                        </span>
                    </p>

                    <div className="d-flex align-items-center">
                        <input
                            type="number"
                            name="quantity"
                            className="form-control me-3"
                            style={{ width: "120px" }}
                            min="1"
                            max="10"
                            value={number}
                            onChange={handleChange}
                        />
                        <button onClick={() => addToCart(med.id, number, userId)} className="btn btn-primary btn-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}