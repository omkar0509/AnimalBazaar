import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Buy = () => {
    const [breed, setBreed] = useState("");
    const navigate = useNavigate();

    // Handle search and redirect
    const handleSearch = (e) => {
        e.preventDefault();
        if (breed.trim()) {
            navigate(`/animals?breed=${breed}`);
        }
    };

    // Handle image click (Search by breed directly)
    const handleBreedClick = (breed) => {
        navigate(`/animals?breed=${breed}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#6a11cb", fontWeight: "bold" }}>
                Buy an Animal 🐾
            </h2>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-5">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter breed (e.g., Dog, Cat)"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ background: "#6a11cb", border: "none" }}
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Breed Buttons */}
            <div className="row">
                {/* Dog */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("dog")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://images.pexels.com/photos/257540/pexels-photo-257540.jpeg?cs=srgb&dl=pexels-pixabay-257540.jpg&fm=jpg"
                            alt="Dog"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Dog</p>
                    </button>
                </div>

                {/* Cat */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("cat")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://tse3.mm.bing.net/th?id=OIP.CBFZpMOFqyCjyHOJxouwVAHaE8&pid=Api&P=0&h=180"
                            alt="Cat"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Cat</p>
                    </button>
                </div>

                {/* Bull */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("bull")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://tse4.mm.bing.net/th?id=OIP.94r_1vgXnXNfD5qT9Zn2kwHaE6&pid=Api&P=0&h=180"
                            alt="Bull"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Bull</p>
                    </button>
                </div>

                {/* Buffalo */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("buffalo")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://tse2.mm.bing.net/th?id=OIP.7uU6eP-Y6zk3E3MwbwAWcAHaE8&pid=Api&P=0&h=180"
                            alt="Buffalo"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Buffalo</p>
                    </button>
                </div>

                {/* Horse */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("horse")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://tse1.mm.bing.net/th?id=OIP.wdD-7S2VsjfT6ReBFqTQvwHaEo&pid=Api&P=0&h=180"
                            alt="Horse"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Horse</p>
                    </button>
                </div>

                {/* Rabbit */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("rabbit")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://tse1.mm.bing.net/th?id=OIP.iaMSs_UaoLcOgV4fOP5y1gHaGl&pid=Api"
                            alt="Rabbit"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Rabbit</p>
                    </button>
                </div>

                {/* Monkey */}
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("monkey")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://as1.ftcdn.net/v2/jpg/05/70/17/96/1000_F_570179623_cg4dkHz2u3y3KOkkFSpm9P1YnFHgxrtO.jpg"
                            alt="Monkey"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Monkey</p>
                    </button>
                </div>
                <div className="col-md-3 mb-4">
                    <button
                        className="btn btn-light w-100 p-3"
                        onClick={() => handleBreedClick("goat")}
                        style={{ borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        <img
                            src="https://images.pexels.com/photos/1011630/pexels-photo-1011630.jpeg?cs=srgb&dl=animal-white-young-1011630.jpg&fm=jpg"
                            alt="goat"
                            className="img-fluid rounded"
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 mb-0" style={{ color: "#333", fontWeight: "bold" }}>Monkey</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Buy;