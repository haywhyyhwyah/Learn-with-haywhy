import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Btn from '../components/Btn';
import '../components/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Footer from '../components/Footer';


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState((null))
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState([]);
    const [modal, setModal] = useState({ show: false, title: '', content: '', onClose: null });
    // Timer state: 5 minutes in seconds
    // const [secondsLeft, setSecondsLeft] = useState(300);

    // useEffect(() => {
    //     if (secondsLeft <= 0) return;
    //     const timer = setInterval(() => {
    //         setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    //     }, 1000);
    //     return () => clearInterval(timer);
    // }, [secondsLeft]);

    // // Format timer as mm:ss
    // const formatTime = (secs) => {
    //     const m = Math.floor(secs / 60);
    //     const s = secs % 60;
    //     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    // };


    useEffect(() => {

        const token = localStorage.getItem("User token")
        if (!token) {
            navigate('/signin');
        }

        axios.get('http://localhost:3000/user/dashboard', {
            headers: { 'authorization': token }
        })

            .then(res => {
                const storedUser = localStorage.getItem("user");
                setUser(JSON.parse(storedUser));
                Promise.all([
                    fetch('http://localhost:3000/user/questions', {
                        headers: { authorization: token }
                    }).then((r) => r.json()),
                    fetch('http://localhost:3000/user/results', {
                        headers: { authorization: token }
                    }).then((r) => r.json())
                ]).then(([questionsData, resultsData]) => {
                    if (Array.isArray(questionsData.questions)) {
                        setTests(questionsData.questions);
                    }
                    if (Array.isArray(resultsData.results)) {
                        setResults(resultsData.results);
                    }
                }).catch((err) => console.error('Could not load dashboard data', err));

                const timer = setTimeout(() => {
                    console.log("Session has expired automatically");
                    localStorage.removeItem('user')
                    localStorage.removeItem('User token')
                    navigate('/signin')
                }, 86400000)

                return () => clearTimeout(timer)
                
            }).catch(err => {
                console.log("Session expired");
                localStorage.removeItem('user')
                localStorage.removeItem('User token')
                navigate('/signin')
            })
    }, [navigate]);


    const handleLogout = () => {
        setModal({
            show: true,
            title: 'Confirm Logout',
            content: 'Are you sure you want to log out?',
            onClose: () => setModal({ ...modal, show: false }),
            onConfirm: () => {
                // setModal({ ...modal, show: false });
                localStorage.removeItem('user');
                localStorage.removeItem('User token');
                navigate('/signin');
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
            <div style={{ backgroundColor: '#f8f9fc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                {/* Custom Styles for Modern Look */}
                <style>{`
            .custom-card { border: none; border-radius: 12px; transition: transform 0.2s; }
            .stat-card { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .subject-card { border: 2px solid transparent; height: 100%; }
            .math-border { border-color: #82c91e !important; }
            .physics-border { border-color: #339af0 !important; }
            .nav-link.active { border-bottom: 3px solid #82c91e; color: #000 !important; font-weight: 600; }
            .btn-start { background-color: #82c91e; border: none; color: white; border-radius: 8px; }
            .btn-review { border: 2px solid #2b3a67; color: #2b3a67; border-radius: 8px; font-weight: 600; }
          `}</style>

                <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow-lg">
                    <div className="container-fluid nav">
                        <a className="navbar-brand" href="#"><img src="/logo2.png" alt="" style={{ width: "65px", borderRadius: "50%", border: "1px, solid, #255296" }} /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav gap-5 mx-auto">
                                <Link className="nav-link active" aria-current="page" to='/quiz' style={{ color: '#255296' }}>Quiz</Link>
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

                <main className="container py-5">
                    {/* Welcome Section */}
                    <div className="mb-5">
                        <h1 className="fw-bold" style={{ color: '#2b3a67' }}>Welcome, {user} ✌️</h1>
                        <p className="text-muted">Interactive Quizzes Suggested</p>
                    </div>

                    {/* Timer Countdown */}
                    {/* <div className="mb-4 d-flex align-items-center" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2b3a67' }}>
                        <span role="img" aria-label="timer" style={{ marginRight: '8px' }}>⏳</span>
                        Time left: {formatTime(secondsLeft)}
                    </div> */}

                    {/* Stats Section */}
                    <div className="row g-4 mb-5">
                        {(() => {
                            const quizzesDone = results.length;
                            const avgScore = results.length > 0 ? Math.round((results.reduce((sum, r) => sum + ((r.score / (r.total || 1)) * 100), 0) / results.length)) : 0;
                            const timeSpentMinutes = results.length > 0 ? results.reduce((sum, r) => sum + (r.durationMinutes || 10), 0) : 0;
                            const hours = Math.floor(timeSpentMinutes / 60);
                            const minutes = timeSpentMinutes % 60;
                            const formattedTime = `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;

                            const statCards = [
                                { label: 'Quizzes Done', value: quizzesDone.toString(), icon: '📖', color: '#f1f3f5' },
                                { label: 'Avg. Score', value: `${avgScore}%`, icon: '🏆', color: '#f1f3f5' },
                                { label: 'Time Spent', value: formattedTime, icon: '🕒', color: '#f1f3f5' }
                            ];

                            return statCards.map((stat, idx) => (
                                <div className="col-md-4" key={idx}>
                                    <div className="card custom-card stat-card p-4 d-flex flex-row align-items-center">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{ width: '60px', height: '60px', backgroundColor: stat.color, fontSize: '1.5rem' }}>
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-muted small fw-bold">{stat.label}</div>
                                            <h3 className="mb-0 fw-bold">{stat.value}</h3>
                                        </div>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>

                    {/* Recommendations Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold" style={{ color: '#2b3a67' }}>Recommended for You</h4>
                        <a href="#" className="text-success text-decoration-none fw-bold">View All Subjects</a>
                    </div>

                    {/* Course Cards */}
                    <div className="row g-4">
                        {tests.length > 0 ? (
                            [...new Map(tests.map((q) => [q.subject, q])).values()].slice(0, 2).map((q, i) => (
                                <div className="col-md-6" key={q.subject}>
                                    <div className={`card custom-card subject-card ${i === 0 ? 'math-border' : 'physics-border'} p-4`}>
                                        <span className={`badge ${i === 0 ? 'bg-success' : 'bg-primary'} mb-3 p-2 px-3`} style={{ width: 'fit-content' }}>{q.subject.toUpperCase()}</span>
                                        <h3 className="fw-bold mb-3">{q.subject} Practice</h3>
                                        <p className="text-muted flex-grow-1">Review and test your understanding of {q.subject} topics with this quiz.</p>
                                        <button className="btn btn-start py-2 w-50 mt-3" onClick={() => navigate('/quiz')}>Start Quiz →</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-md-12">
                                <div className="card custom-card subject-card math-border p-4">
                                    <span className="badge bg-success mb-3 p-2 px-3" style={{ width: 'fit-content' }}>No Tests Yet</span>
                                    <h3 className="fw-bold mb-3">Create your first quiz</h3>
                                    <p className="text-muted flex-grow-1">Ask the admin to add questions first. Your quizzes will appear here.</p>
                                </div>
                            </div>
                        )}
                    </div>

                </main>
            </div>
        </>




















    );
};

export default Dashboard;