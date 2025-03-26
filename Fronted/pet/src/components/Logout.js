// src/components/Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="text-center mt-4">
            <button
                onClick={handleLogout}
                className="btn btn-danger btn-lg px-4 py-2 rounded-pill shadow-sm"
                style={{
                    background: "linear-gradient(135deg, #ff6b6b, #f94c66)",
                    border: "none",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    transition: "transform 0.2s ease-in-out",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
                🚪 Logout
            </button>
        </div>
    );
};

export default Logout;
