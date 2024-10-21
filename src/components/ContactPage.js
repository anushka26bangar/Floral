import React, { useState } from 'react';

const ContactPage = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [contactInput, setContactInput] = useState('');
    const [messageInput, setMessageInput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contactData = {
            name: nameInput,
            contact: contactInput,
            email: emailInput,
            message: messageInput,
        };

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) {
                throw new Error('Failed to save contact');
            }

            const result = await response.json();
            console.log(result.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
                autoComplete="name" // Added this line
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                autoComplete="email" // Added this line
            />

            <label htmlFor="contact">Contact</label>
            <input
                type="text"
                id="contact"
                name="contact"
                placeholder="Contact"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                required
                autoComplete="tel" // Added this line
            />

            <label htmlFor="message">Message</label>
            <textarea
                id="message"
                name="message"
                placeholder="Message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                required
                autoComplete="off" // Added this line
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactPage;
