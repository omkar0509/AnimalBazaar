import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sell = () => {
    const [image, setImage] = useState(null);
    const [animal, setAnimal] = useState({ name: "", price: "", gender: "", breed: "", age: "", description: "", mo: "", address: "" });
    const [sellerId, setSellerId] = useState(""); // State for seller ID
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if (!user) {
            setMessage("Please login first.");
            navigate("/login");
        } else {
            setSellerId(user.id); // Automatically set the seller ID from the logged-in user
        }
    }, [navigate]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!image) {
            setMessage("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post("http://127.0.0.1:5001/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setAnimal((prevAnimal) => ({
                ...prevAnimal,
                name: response.data.animal_name,
            }));
            setMessage(`Predicted Animal: ${response.data.animal_name}`);
        } catch (error) {
            console.error("Prediction error:", error);
            setMessage("Error predicting animal. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // Get the JWT token from localStorage
        if (!token) {
            setMessage("No token found. Please login again.");
            return;
        }

        const formData = new FormData();
        formData.append("name", animal.name);
        formData.append("price", animal.price);
        formData.append("gender", animal.gender);
        formData.append("breed", animal.breed);
        formData.append("age", animal.age);
        formData.append("description", animal.description);
        formData.append("mo", animal.mo);
        formData.append("address", animal.address);
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:8080/api/animals/sell", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });

            setMessage("Animal listed successfully!");
            console.log("Listed Animal Response:", response.data);
        } catch (error) {
            console.error("Error listing animal:", error.response?.data || error.message);
            setMessage("Failed to list animal. Please try again.");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                fontFamily: "'Poppins', sans-serif",
                padding: "20px",
            }}
        >
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "15px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    padding: "30px",
                    width: "100%",
                    maxWidth: "500px",
                    textAlign: "center",
                }}
            >
                <h2 style={{ color: "#333", marginBottom: "20px", fontSize: "2rem" }}>
                    Sell an Animal 🐾
                </h2>
                {message && (
                    <p style={{ color: message.includes("successfully") ? "green" : "red", marginBottom: "20px" }}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                    {/* Name */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Name:</label>
                        <input
                            type="text"
                            value={animal.name}
                            onChange={(e) => setAnimal({ ...animal, name: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Price:</label>
                        <input
                            type="number"
                            value={animal.price}
                            onChange={(e) => setAnimal({ ...animal, price: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Gender:</label>
                        <input
                            type="text"
                            value={animal.gender}
                            onChange={(e) => setAnimal({ ...animal, gender: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </div>

                    {/* Breed */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Breed:</label>
                        <input
                            type="text"
                            value={animal.breed}
                            onChange={(e) => setAnimal({ ...animal, breed: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </div>

                    {/* Age */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Age:</label>
                        <input
                            type="number"
                            value={animal.age}
                            onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                            }}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Description:</label>
                        <textarea
                            value={animal.description}
                            onChange={(e) => setAnimal({ ...animal, description: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                                resize: "vertical",
                            }}
                            required
                        />
                    </div>

                    {/* Seller ID */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Seller ID:</label>
                        <input
                            type="text"
                            value={sellerId}
                            readOnly
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                                backgroundColor: "#f9f9f9",
                            }}
                        />
                    </div>

                    {/* Mobile Number */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Mobile Number:</label>
                        <textarea
                            value={animal.mo}
                            onChange={(e) => setAnimal({ ...animal, mo: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                                resize: "vertical",
                            }}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div style={{ marginBottom: "15px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Address:</label>
                        <textarea
                            value={animal.address}
                            onChange={(e) => setAnimal({ ...animal, address: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                marginTop: "5px",
                                resize: "vertical",
                            }}
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ color: "#555", fontWeight: "bold" }}>Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ marginTop: "5px" }}
                            required
                        />
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            style={{
                                background: "#6a11cb",
                                color: "#fff",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginTop: "10px",
                                width: "100%",
                                transition: "background 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.background = "#2575fc")}
                            onMouseLeave={(e) => (e.target.style.background = "#6a11cb")}
                        >
                            Predict Animal
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            background: "#6a11cb",
                            color: "#fff",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.background = "#2575fc")}
                        onMouseLeave={(e) => (e.target.style.background = "#6a11cb")}
                    >
                        List Animal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Sell;