import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Livestock = () => {
    const [message, setMessage] = useState("");
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            setMessage("Please login first.");
            navigate("/login");
        } else {
            const user = JSON.parse(storedUser);
            if (user && user.id) {
                fetchUserAnimals(user.id); // Fetch animals using user ID
            } else {
                setMessage("Invalid user data. Please login again.");
                navigate("/login");
            }
        }
    }, [navigate]);

    const fetchUserAnimals = async (userId) => {
        try {
            const token = localStorage.getItem("token"); // Get the JWT token from localStorage
            if (!token) {
                setMessage("No token found. Please login again.");
                navigate("/login");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/animals/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });
            

            if (response.ok) {
                const data = await response.json();
                
                setAnimals(data);
            } else {
                setMessage("No animals found.");
            }
        } catch (error) {
            setMessage("Error fetching animals.");
            console.error("Error:", error);
        }
    };

    const deleteAnimal = async (animal) => {
        try {
            const token = localStorage.getItem("token"); // Get the JWT token from localStorage
            if (!token) {
                setMessage("No token found. Please login again.");
                navigate("/login");
                return;
            }

            const response = await fetch(`http://localhost:8080/api/animals/${animal.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            if (response.ok) {
                setMessage("Animal deleted successfully!");
                // Remove the deleted animal from the state
                setAnimals(animals.filter((a) => a.id !== animal.id));
            } else {
                setMessage("Failed to delete animal.");
            }
        } catch (error) {
            setMessage("Error deleting animal.");
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: "20px", background: "#f4f4f9", minHeight: "100vh" }}>
            <h2 style={{ textAlign: "center", color: "#6a11cb", fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                My Livestock 🐾
            </h2>
            {message && <p style={{ textAlign: "center", color: message.includes("successfully") ? "green" : "red", fontSize: "1.2rem" }}>{message}</p>}

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
                            {animal.imageBase64 && (
                                <img
                                    src={`data:image/jpeg;base64,${animal.imageBase64}`}
                                    alt={animal.name}
                                    style={{ width: "100%", height: "200px", objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
                                />
                            )}
                            <div style={{ padding: "15px" }}>
                                <h3 style={{ color: "#6a11cb", marginBottom: "10px", fontSize: "1.5rem" }}>{animal.name}</h3>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Breed:</strong> {animal.breed}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Price:</strong> ${animal.price}</p>
                                <p style={{ color: "#555", marginBottom: "5px" }}><strong>Age:</strong> {animal.age} years</p>
                                <button
                                    onClick={() => deleteAnimal(animal)}
                                    style={{
                                        background: "#ff6b6b",
                                        color: "#fff",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        width: "100%",
                                        transition: "background 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.background = "#ff4c4c")}
                                    onMouseLeave={(e) => (e.target.style.background = "#ff6b6b")}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Livestock;