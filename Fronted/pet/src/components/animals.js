import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Animals = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const breed = queryParams.get("breed") || "";

    const [animals, setAnimals] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (breed) {
            fetchAnimals();
        }
    }, [breed]);

    const fetchAnimals = async () => {
        try {
            const token = localStorage.getItem("token"); // Get the JWT token from localStorage
            if (!token) {
                setError("No token found. Please login again.");
                return;
            }

            const response = await axios.get("http://localhost:8080/api/animals/buy", {
                params: { breed },
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            });
            
            setAnimals(response.data);
            response.data.forEach((animal) => fetchImage(animal.id));
        } catch (error) {
            setError("Failed to fetch animals. Please try again.");
            console.error("Error fetching animals:", error);
        }
    };

    const fetchImage = async (id) => {
        try {
            const token = localStorage.getItem("token"); // Get the JWT token from localStorage
            const response = await axios.get(`http://localhost:8080/api/animals/image/${id}`, {
                responseType: "blob",
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            });
           
            const imageUrl = URL.createObjectURL(response.data);
            setImageUrls((prev) => ({ ...prev, [id]: imageUrl }));
        } catch (error) {
            console.error("Error fetching image:", error);
            setImageUrls((prev) => ({ ...prev, [id]: "/placeholder.jpg" }));
        }
    };

    return (
        <div style={{ padding: "20px", background: "#f4f4f9", minHeight: "100vh" }}>
            <h2 style={{ textAlign: "center", color: "#6a11cb", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                Available Animals 🐾
            </h2>
            {error && <p style={{ textAlign: "center", color: "red", fontSize: "1.2rem" }}>{error}</p>}

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {animals.length === 0 ? (
                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>No animals found.</p>
                ) : (
                    animals.map((animal) => (
                        <div
                            key={animal.id}
                            style={{
                                background: "#fff",
                                borderRadius: "15px",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                                width: "300px",
                                overflow: "hidden",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                cursor: "pointer",
                                marginBottom: "20px"
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <img
                                src={imageUrls[animal.id] || "/placeholder.jpg"}
                                alt={animal.name}
                                style={{ width: "100%", height: "200px", objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                                onClick={() => setSelectedImage(imageUrls[animal.id])}
                                onError={(e) => (e.target.src = "/placeholder.jpg")}
                            />
                            <div style={{ padding: "15px" }}>
                                <h3 style={{ color: "#6a11cb", marginBottom: "10px", fontSize: "1.5rem" }}>{animal.name}</h3>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Breed:</strong> {animal.breed}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Price:</strong> ${animal.price}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Gender:</strong> {animal.gender}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Age:</strong> {animal.age} years</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Mobile:</strong> {animal.mo}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Address:</strong> {animal.address}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Description:</strong> {animal.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedImage && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Full Size"
                        style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "contain", cursor: "zoom-in" }}
                    />
                    <button
                        onClick={() => setSelectedImage(null)}
                        style={{
                            position: "absolute",
                            top: 20,
                            right: 20,
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            cursor: "pointer",
                            fontSize: "16px",
                            borderRadius: "5px"
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Animals;