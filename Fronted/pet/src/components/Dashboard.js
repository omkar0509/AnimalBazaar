import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode the token
                setUser(decoded); // Set the decoded user information
                console.log('Decoded user:', decoded);
            } catch (error) {
                setError('Invalid token');
                console.error('Token decoding failed:', error);
            }
        } else {
            setError('No token found');
        }
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                fontFamily: "'Poppins', sans-serif",
                padding: '20px',
            }}
        >
            <div
                style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    padding: '30px',
                    width: '100%',
                    maxWidth: '500px',
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        color: '#333',
                        marginBottom: '20px',
                        fontSize: '2rem',
                    }}
                >
                    Welcome to Your Dashboard 🎉
                </h2>
                {error && (
                    <div
                        style={{
                            color: '#ff6b6b',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                        }}
                    >
                        {error}
                    </div>
                )}
                {user && (
                    <div>
                        <p
                            style={{
                                fontSize: '1.5rem',
                                color: '#555',
                                marginBottom: '10px',
                            }}
                        >
                            Hello, <span style={{ color: '#6a11cb', fontWeight: 'bold' }}>{user.username}</span>! 👋
                        </p>
                        <p
                            style={{
                                fontSize: '1.2rem',
                                color: '#555',
                            }}
                        >
                            Your role: <span style={{ color: '#2575fc', fontWeight: 'bold' }}>{user.roles[0].authority}</span> 🚀
                        </p>
                    </div>
                )}
                <div
                    style={{
                        marginTop: '30px',
                        fontSize: '1rem',
                        color: '#555',
                    }}
                >
                    <p>Have a great day! 😊</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;