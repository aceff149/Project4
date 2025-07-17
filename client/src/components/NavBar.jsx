import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, username, handleLogout }) => {
    const location = useLocation();
    console.log ("Hello", username)
    const navigate = useNavigate(); // Use useNavigate for navigation
    const isLoginPage = location.pathname === '/login';

    const handleLogoutAndRedirect = () => {
        handleLogout();
        navigate('/login'); // Redirect to the login page using navigate
    };

    // Define styles as JavaScript objects
    const navbarStyle = {
        backgroundColor: '#e647d0',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        borderRadius: '8px',
    };

    const navItemStyle = {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
    };

    const linkStyle = {
        color: '#20211f',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s, transform 0.3s',
        margin: '0 10px',
    };

    // Hover states for links
    const [hoveredLink, setHoveredLink] = useState(null);

    return (
        <nav style={navbarStyle}>
            <div style={navItemStyle}>
                {isLoginPage ? (
                    <Link
                        style={{
                            ...linkStyle,
                            ...(hoveredLink === 'login' ? { color: '#20211f', transform: 'translateY(-2px)' } : {})
                        }} 
                        to="/login" 
                        onMouseEnter={() => setHoveredLink('login')} 
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        Login
                    </Link>
                ) : isAuthenticated ? (
                    <>
                        <Link
                            style={{
                                ...linkStyle,
                                ...(hoveredLink === 'home' ? { color: '#20211f', transform: 'translateY(-2px)' } : {})
                            }} 
                            to="/" 
                            onMouseEnter={() => setHoveredLink('home')} 
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Home
                        </Link>
                        <Link
                            style={{
                                ...linkStyle,
                                ...(hoveredLink === 'contact' ? { color: '#20211f', transform: 'translateY(-2px)' } : {})
                            }} 
                            to="/contact" 
                            onMouseEnter={() => setHoveredLink('contact')} 
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Contact
                        </Link>
                        <Link
                            style={{
                                ...linkStyle,
                                ...(hoveredLink === 'hats' ? { color: '#27ae60', transform: 'translateY(-2px)' } : {})
                            }} 
                            to="/qanda" 
                            onMouseEnter={() => setHoveredLink('hats')} 
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Hats
                        </Link>
                        <span style={{ color: '#ecf0f1', margin: '0 10px' }}>
                            Welcome, {username}!
                        </span>
                        <button 
                            style={{
                                padding: '10px',
                                backgroundColor: '#4ad9a0',
                                border: 'none',
                                borderRadius: '5px',
                                color: 'white',
                                cursor: 'pointer',
                                marginLeft: '10px',
                                transition: 'background-color 0.3s',
                            }} 
                            onClick={handleLogoutAndRedirect}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            style={{
                                ...linkStyle,
                                ...(hoveredLink === 'loginSignup' ? { color: '#4ad9a0', transform: 'translateY(-2px)' } : {})
                            }} 
                            to="/login" 
                            onMouseEnter={() => setHoveredLink('loginSignup')} 
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Login
                        </Link>
                        <Link
                            style={{
                                ...linkStyle,
                                ...(hoveredLink === 'createAccount' ? { color: '#4ad9a0', transform: 'translateY(-2px)' } : {})
                            }} 
                            to="/create-account" 
                            onMouseEnter={() => setHoveredLink('createAccount')} 
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            Create Account
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;