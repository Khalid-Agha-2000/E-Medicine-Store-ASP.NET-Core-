import { useEffect, useState } from "react";

export default function MedicineDisplay() {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/User/shop")
        .then(res => res.json())
        .then(data => setMedicines(data.listMedicines));
    }, []);

    return (
        <section className="py-5 page-content">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-md-2 row-cols-sm-1 row-cols-xl-3 justify-content-left">
                    {medicines.length > 0? (
                        medicines.map((med, index) => (
                            <div className="col mb-5" key={med.iD || index}>
                                <div className="card h-100">
                                    <img className="card-img-top" style={{ width: '100%', height: '200px', objectFit: 'fit' }} src={med.imageUrl} alt={med.name} />
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{med.name}</h5>
                                            ${med.unitPrice}
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Add to Cart</a></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ): (
                        <p>Sorry, No Medicines Found!</p>
                    )}
                </div>
            </div>
        </section>
    );
}