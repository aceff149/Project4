import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleCreateAccount = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Make an API call to register the user
        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Account created successfully! Redirecting to login...');
                navigate('/login');
            } else {
                const errorMessage = await response.text();
                alert(`Failed to create account: ${errorMessage}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Error creating account:', error);
        }
    };

    const handleLoginRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '80px auto',
            padding: '20px',
            background: '#34495e',
            borderRadius: '12px',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h2 style={{ color: 'white', marginBottom: '20px' }}>Create Account</h2>
            <form onSubmit={handleCreateAccount} style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px' }}
                />
                <button type="submit" style={{ padding: '10px', borderRadius: '5px', background: '#39ff14', border: 'none' }}>
                    Create Account
                </button>
                <p style={{ color: 'white', marginTop: '15px' }}>
                    Already have an account?
                    <button onClick={handleLoginRedirect} style={{
                        color: '#39ff14',
                        background: 'none',
                        border: 'none',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginLeft: '5px',
                    }}> Log in!</button>
                </p>
            </form>
        </div>
    );
};

export default CreateAccount;