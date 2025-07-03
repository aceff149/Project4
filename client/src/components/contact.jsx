import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `
            First Name: ${formData.firstName}
            Last Name: ${formData.lastName}
            Email: ${formData.email}
            Comments: ${formData.comments}
        `;
        alert(message);
        setFormData({ firstName: '', lastName: '', email: '', comments: '' });
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
                <input
                    className="contact-input"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    className="contact-input"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <input
                    className="contact-input"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    className="contact-input"
                    name="comments"
                    placeholder="Comments"
                    value={formData.comments}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;