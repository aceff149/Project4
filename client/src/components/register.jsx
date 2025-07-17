import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/register', formData);
      setMessage(res.data.message || 'Registered successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={formData.email} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required /><br />
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default Register;
