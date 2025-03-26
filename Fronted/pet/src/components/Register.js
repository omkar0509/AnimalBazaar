// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                username,
                password,
                email,
            });
    
            console.log('User registered:', response.data);
            navigate('/login'); // Redirect to login page after registration
        } catch (error) {
            console.log(error);
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <div
                className="card p-4 shadow-lg"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '15px',
                    background: 'rgba(255, 255, 255, 0.9)',
                }}
            >
                <h2 className="text-center mb-4" style={{ color: '#333' }}>
                    Register
                </h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label" style={{ color: '#555' }}>
                            <i className="fas fa-user me-2"></i>
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ color: '#555' }}>
                            <i className="fas fa-envelope me-2"></i>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label" style={{ color: '#555' }}>
                            <i className="fas fa-lock me-2"></i>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2"
                        style={{
                            background: '#6a11cb',
                            border: 'none',
                            transition: 'background 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#2575fc'}
                        onMouseLeave={(e) => e.target.style.background = '#6a11cb'}
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4" style={{ color: '#555' }}>
                    Already have an account?{' '}
                    <a href="/login" style={{ color: '#6a11cb', textDecoration: 'none' }}>
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;