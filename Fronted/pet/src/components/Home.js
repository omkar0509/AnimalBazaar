// src/components/Home.js
import React from 'react';

const Home = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center vh-100"
            style={{
                fontFamily: "'Poppins', sans-serif",
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1,
                }}
            >
                <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with a more vibrant video
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(255, 105, 180, 0.3), rgba(0, 191, 255, 0.3))',
                    zIndex: 2,
                }}
            ></div>

            {/* Animal Content */}
            <div
                className="text-center"
                style={{
                    zIndex: 3,
                    position: 'relative',
                    color: '#fff',
                    padding: '20px',
                    borderRadius: '15px',
                    background: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <h1
                    className="display-3 mb-4 fw-bold"
                    style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        animation: 'float 3s ease-in-out infinite',
                        color: '#ff6f61',
                    }}
                >
                    🐶🐱🐾
                </h1>
                <p
                    className="lead mb-4"
                    style={{
                        fontSize: '1.5rem',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        color: '#ffd700',
                    }}
                >
                    Discover the joy of pets! Whether you're a dog lover, a cat enthusiast, or adore all animals, we’ve got something special for you.
                </p>
                <p
                    className="lead"
                    style={{
                        fontSize: '1.5rem',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        color: '#00ff7f',
                    }}
                >
                    Explore our world of furry friends and find your perfect companion today! 🐾
                </p>
            </div>

            {/* CSS Animations */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}
            </style>
        </div>
    );
};

export default Home;