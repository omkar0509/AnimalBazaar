// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation(); // To highlight the active link

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                {/* Brand Logo (No Text) */}
                <Link to="/" className="navbar-brand">
                    <img 
                        src="https://img.icons8.com/?size=100&id=SKER9Ma4b6Yt&format=png&color=000000" 
                        alt="Pet App Logo" 
                        width="50" 
                        height="50" 
                        style={{ borderRadius: '50%', border: '2px solid #ff6f61' }}
                    />
                </Link>

                {/* Toggle Button for Mobile */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link 
                                to="/" 
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                            >
                                <i className="fas fa-home me-1"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/login" 
                                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                            >
                                <i className="fas fa-sign-in-alt me-1"></i> Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/register" 
                                className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                            >
                                <i className="fas fa-user-plus me-1"></i> Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/dashboard" 
                                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                            >
                                <i className="fas fa-tachometer-alt me-1"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/sell" 
                                className={`nav-link ${location.pathname === '/sell' ? 'active' : ''}`}
                            >
                                <i className="fas fa-dollar-sign me-1"></i> Sell
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/buy" 
                                className={`nav-link ${location.pathname === '/buy' ? 'active' : ''}`}
                            >
                                <i className="fas fa-shopping-cart me-1"></i> Buy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/livestocks" 
                                className={`nav-link ${location.pathname === '/livestocks' ? 'active' : ''}`}
                            >
                                <i className="fas fa-paw me-1"></i> Livestock
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to="/logout" 
                                className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`}
                            >
                                <i className="fas fa-sign-out-alt me-1"></i> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;