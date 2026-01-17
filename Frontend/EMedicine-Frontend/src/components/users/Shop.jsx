import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useFlashMessage } from "../FlashMessageContext";


export default function Shop() {
    const {setFlashMessage} = useFlashMessage();
    const [medicines, setMedicines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem("token");
    let userId;

    //pagination
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMedicines = medicines.slice(startIndex, endIndex);
    const totalPages = Math.ceil(medicines.length / itemsPerPage);
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(page =>
        page >= currentPage - 2 && page <= currentPage + 2
    );

    useEffect(() => {
        fetch("http://localhost:5001/Medicine/shop", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.status === 401) {
                throw new Error("Unauthorized");
            }
            return res.json();
        })
        .then(data => {
            setMedicines(data.listMedicines || []);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    if(token) {
        const decoded = jwtDecode(token);
        userId = parseInt(decoded.sub, 10);
    }

    const addToCart = (medId, quantity, id) => {
        fetch(`http://localhost:5001/cart/add-to-cart/${medId}/${quantity}/${id}`, {
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

    return (
        <section className="py-5 mt-3 page-content">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5  row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-left">
                    {currentMedicines.length > 0 ? (
                        currentMedicines.map((med) => (
                            <div className="col mb-5" key={med.id}>
                                    <div className="card h-100">
                                        <Link to={`/medicine/${med.id}`}>
                                            <img className="card-img-top" style={{ width: '100%', height: '200px', objectFit: 'fit' }} src={med.imageUrl || null} alt={med.name} />
                                            <div className="card-body p-4">
                                                <div className="text-center">
                                                    <h5 className="fw-bolder">{med.name}</h5>
                                                    {med.unitPrice}₺
                                                </div>
                                            </div>
                                        </Link>
                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div className="text-center"><button className="btn btn-outline-dark mt-auto" onClick={() => addToCart(med.id, 1, userId)}>Add to Cart</button></div>
                                            </div>
                                    </div>
                            </div>
                        ))
                    ): (
                        <p>Sorry, No Medicines Found!</p>
                    )}
                </div>
            </div>
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {visiblePages.map(pageNumber => {
                        return(
                            <li
                                key={pageNumber}
                                className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </section>
    );
}