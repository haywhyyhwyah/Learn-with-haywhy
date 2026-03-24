import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/Modal.css';
import './AdminSignIn.css';
import Btn from '../../components/Btn';

const AdminSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [modal, setModal] = useState({ show: false, title: '', content: '', onClose: null });
    const navigate = useNavigate && useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let adminData = {
            email,
            password
        }

        axios.post('https://lwh-backend-nine.vercel.app/admin/signin', adminData)
            .then(res => {

                if (res.data.token) {
                    localStorage.setItem("Admin token", res.data.token)
                } else {
                    console.warn("No token found, Response:", res.data)
                }

                if (res.data.admin && !res.data.error) {
                    localStorage.setItem("Role", res.data.admin.role)
                }

                setModal({
                    show: true,
                    title: 'Sign In Successful',
                    content: 'Welcome back, Admin!',
                    onClose: () => {
                        setModal({ ...modal, show: false });
                        navigate && navigate('/admin-dashboard');
                    }
                });
            })
            .catch(err => {
                setModal({
                    show: true,
                    title: 'Sign In Failed',
                    content: err.response?.data?.message || 'Sign in failed. Please try again.',
                    onClose: () => setModal({ ...modal, show: false })
                });
            });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow-lg">
                <div className="container-fluid nav">
                    <a className="navbar-brand" href="#"><img src="/logo2.png" alt="" style={{ width: "65px", borderRadius: "50%", border: "1px, solid, #255296" }} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav gap-5 mx-auto">
                            <Link to="/" className="nav-link active" aria-current="page" href="#" style={{ color: '#255296' }}>Home</Link>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>Subjects</a>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>How it works</a>
                        </div>

                        <div className='d-flex gap-3'>
                            <Link to="/admin-signup"><Btn title="Sign up" backgroundColor='btn text-light' style="#255296" border="none" /></Link>
                        </div>
                    </div>

                </div>
            </nav>

            <div className="admin-signin-bg">
                <div className="admin-signin-wrapper">
                    <h2 className="admin-signin-title">Admin Sign In</h2>
                    <form className="admin-signin-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <div className="password-field">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button className="admin-signin-btn" type="submit">Sign In as Admin</button>
                    </form>
                    <Link className="admin-signin-link" to="/admin/signup">Don't have an account? Sign Up</Link>
                    {modal.show && (
                        <div className="modal-overlay">
                            <div className="modal-box">
                                <div className="modal-title">{modal.title}</div>
                                <div className="modal-content">{modal.content}</div>
                                <button className="modal-close" onClick={modal.onClose}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminSignIn;