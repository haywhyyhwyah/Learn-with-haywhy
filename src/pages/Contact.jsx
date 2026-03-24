import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSent(true)
        setForm({ name: '', email: '', message: '' })
        setTimeout(() => setSent(false), 3500)
    }

    return (
        <section className="contact-page">
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p className="subheader">Questions, feedback, or partnership inquiries? Send us a message!</p>

                <div className="contact-grid">
                    <div className="contact-details">
                        <h2>Reach out anytime</h2>
                        <p>Email: <a href="mailto:ayomideisrael623@gmail.com">ayomideisrael623@gmail.com</a></p>
                        <p>Phone: <a href="tel:+2349068069690">+2349068069690</a></p>
                        
                        <div className="social-links">
                            <a href="#">Twitter</a>
                            <a href="#">LinkedIn</a>
                            <a href="#">Instagram</a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input type="text" name="name" value={form.name} onChange={handleChange} required />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" value={form.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Message
                            <textarea name="message" value={form.message} onChange={handleChange} required rows="5" />
                        </label>
                        <button className="contact-submit" type="submit">Send Message</button>
                        {sent && <p className="success">Thanks! Your message has been submitted.</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
