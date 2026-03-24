import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import Modal from '../../components/Modal';
import axios from 'axios';

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('Admin token');
        const role = localStorage.getItem('Role');

        if (!token || !role || role !== "admin") {
            localStorage.removeItem('Admin token');
            localStorage.removeItem('Role');
            navigate('/admin-signin');
            return;
        }

        axios.get('https://lwh-backend-nine.vercel.app/admin/dashboard', {
            headers: { authorization: token }
        })
            .then((res) => {
                const timer = setTimeout(() => {
                    console.log("Session has expired automatically");
                    localStorage.removeItem('Admin token')
                    localStorage.removeItem('Role')
                    navigate('/admin-signin')
                }, 86400000)

                return () => clearTimeout(timer)
            })
            .catch((err) => {
                localStorage.removeItem('Admin token');
                localStorage.removeItem('Role');
                navigate('/admin-signin');
            });
    }, [navigate]);




    const [modal, setModal] = useState({ show: false, title: '', content: '', onClose: null });

    const [recentActivity, setRecentActivity] = useState([
        { id: 1, action: 'Added new question', user: 'Admin', date: '2026-03-16' },
        { id: 2, action: 'Updated subject', user: 'Admin', date: '2026-03-15' },
        { id: 3, action: 'Reviewed results', user: 'Admin', date: '2026-03-14' },
    ]);

    const handleLogout = () => {
        setModal({
            show: true,
            title: 'Confirm Logout',
            content: 'Are you sure you want to log out?',
            onClose: () => setModal({ ...modal, show: false }),
            onConfirm: () => {
                localStorage.removeItem('user');
                localStorage.removeItem('User token');
                localStorage.removeItem('Admin token');
                localStorage.removeItem('Role');
                navigate('/admin-signin');
                // setModal({
                //     show: true,
                //     title: 'Logged Out',
                //     content: 'You have been logged out successfully.',
                //     onClose: () => {
                //     }
                // });
            }
        });
    }

    // You can add logic here to update recentActivity from other pages if needed

    return (
        <>
            <Modal
                show={modal.show}
                title={modal.title}
                onClose={modal.onClose}
            >
                {modal.content}
                {modal.title === 'Confirm Logout' ? (
                    <div style={{ marginTop: '1rem' }}>
                        <button className="modal-close" style={{ marginRight: '1rem' }} onClick={modal.onClose}>Cancel</button>
                        <button className="modal-close" style={{ background: '#dc3545' }} onClick={modal.onConfirm}>Log out</button>
                    </div>
                ) : (
                    // Only show close button for non-logout modals
                    <div style={{ marginTop: '1rem' }}>
                        <button className="modal-close" onClick={modal.onClose}>Close</button>
                    </div>
                )}
            </Modal>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow-lg">
                <div className="container-fluid nav">
                    <a className="navbar-brand" href="#"><img src="/logo2.png" alt="" style={{ width: "65px", borderRadius: "50%", border: "1px, solid, #255296" }} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav gap-5 mx-auto">
                            <Link className="nav-link active" aria-current="page" to="/admin/manage-questions" style={{ color: '#255296' }}>Set Quiz</Link>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>Subjects</a>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>How it works</a>
                        </div>

                        <div className='d-flex gap-3'>
                            <Btn
                                title="Log out"
                                backgroundColor="btn text-light"
                                style="#FF0000"
                                border="none"
                                work={handleLogout}
                            />
                        </div>
                    </div>

                </div>
            </nav>
            <div className="admin-dashboard-bg">
                <div className="admin-dashboard-wrapper">
                    <div className="admin-dashboard-title">Welcome, Admin 👋</div>
                    <div className="admin-dashboard-cards">
                        <Link to="/admin/manage-questions" style={{ textDecoration: 'none' }}>
                            <div className="admin-dashboard-card" style={{ cursor: 'pointer' }}>
                                <div className="admin-dashboard-card-icon">📚</div>
                                <div className="admin-dashboard-card-title">Manage Questions</div>
                                <div className="admin-dashboard-card-desc">Add, edit, or delete questions for all subjects.</div>
                            </div>
                        </Link>
                        <div className="admin-dashboard-card">
                            <div className="admin-dashboard-card-icon">🗂️</div>
                            <div className="admin-dashboard-card-title">Subjects & Exams</div>
                            <div className="admin-dashboard-card-desc">Organize subjects, set exam parameters, and schedules.</div>
                        </div>
                        <div className="admin-dashboard-card">
                            <div className="admin-dashboard-card-icon">👥</div>
                            <div className="admin-dashboard-card-title">User Management</div>
                            <div className="admin-dashboard-card-desc">View, approve, or remove users and admins.</div>
                        </div>
                        <div className="admin-dashboard-card">
                            <div className="admin-dashboard-card-icon">📊</div>
                            <div className="admin-dashboard-card-title">Results & Analytics</div>
                            <div className="admin-dashboard-card-desc">Review performance, download reports, and insights.</div>
                        </div>
                    </div>

                    <h2 style={{ color: '#255296', margin: '2rem 0 1rem 0', fontSize: '1.5rem' }}>Recent Activity</h2>
                    <table className="admin-dashboard-table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>User</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivity.map(item => (
                                <tr key={item.id}>
                                    <td>{item.action}</td>
                                    <td>{item.user}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;