// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password,
            });
            const token = response.data;
            console.log("hello"); // Assuming the token is returned directly
               console.log(token);
            // Decode the token to get user information
            const decodedUser = jwtDecode(token); // Use jwt-decode library
            console.log(decodedUser);
            localStorage.setItem('token', token); // Save token in localStorage
            localStorage.setItem('user', JSON.stringify(decodedUser)); // Save user data in localStorage
         console.log(JSON.stringify(decodedUser));
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (error) {
            setError('Invalid username or password');
            console.error('Login failed:', error);
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
                    Login
                </h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
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
                        Login
                    </button>
                </form>
                <p className="text-center mt-4" style={{ color: '#555' }}>
                    Don't have an account?{' '}
                    <a href="/register" style={{ color: '#6a11cb', textDecoration: 'none' }}>
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;