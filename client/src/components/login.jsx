import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setUsername }) => {
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        // Clear previous errors
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            console.log (response)

            // Check if the response is okay
            if (!response.ok) {
                console.log ("error")
                const errorMessage = await response.text();
                setError(errorMessage); 
                return;
            }

            const data = await response.json();

            // Check if the auth flag is present
            if (data.auth) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setUsername(username);
                navigate('/dashboard'); 
            } else {
                setError('Invalid username or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please try again later.'); 
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '80px auto',
            padding: '20px',
            background: '#f59ff5',
            borderRadius: '12px',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1 style={{ color: 'white' }}>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    required
                    style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px' }}
                />
                <button
                    type="submit"
                    style={{ padding: '10px', borderRadius: '5px', background: '#39ff14', border: 'none' }}
                >
                    Log In
                </button>
            </form>
            <p style={{ color: 'white' }}>
                Don't have an account? 
                <Link to="/create-account" style={{
                    color: '#f59ff5', 
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    marginLeft: '5px',
                }}>
                    Create Account!
                </Link>
            </p>
        </div>
    );
};

export default Login;