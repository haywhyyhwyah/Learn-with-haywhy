import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);
    const [subject, setSubject] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState('');
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('User token');
        if (!token) {
            navigate('/signin');
            return;
        }

        fetch('http://localhost:3000/user/questions', {
            headers: { authorization: token }
        })
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data.questions)) setTests(data.questions);
            })
            .catch((err) => console.error('Could not load questions', err));
    }, [navigate]);

    const startSubject = (subjectName) => {
        const selectedQuestions = tests.filter((q) => q.subject === subjectName);
        setSubject(subjectName);
        setQuizQuestions(selectedQuestions);
        setCurrent(0);
        setSelected('');
        setScore(0);
        setAnswers([]);
        setFinished(false);
        setSaved(null);
        setError('');
    };

    const handleSubmitAnswer = () => {
        if (!selected) {
            setError('Select an answer before submitting.');
            return;
        }

        const currentQ = quizQuestions[current];
        const isCorrect = selected === currentQ.correct;
        if (isCorrect) setScore(prev => prev + 1);

        setAnswers(prev => [...prev, { question: currentQ.question, selected, correct: currentQ.correct }]);
        setSelected('');
        setError('');

        if (current + 1 >= quizQuestions.length) {
            setFinished(true);
            return;
        }

        setCurrent(prev => prev + 1);
    };

    const saveResult = async () => {
        const token = localStorage.getItem('User token');
        if (!token) {
            navigate('/signin');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user/results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', authorization: token },
                body: JSON.stringify({ subject, score, total: quizQuestions.length, answers }),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Could not save result');
            }
            const data = await response.json();
            setSaved(data.result);
        } catch (err) {
            setError(err.message || 'Could not save result');
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow-lg">
                                <div className="container-fluid nav">
                                    <Link className="navbar-brand" to="/"><img src="/logo2.png" alt="" style={{ width: "65px", borderRadius: "50%", border: "1px, solid, #255296" }} /></Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                        <div className="navbar-nav gap-5 mx-auto">
                                            <Link className="nav-link active" style={{ color: '#255296' }} to='/dashboard'>Home</Link>
                                            <Link className="nav-link active" to="#" style={{ color: '#255296' }}>Subjects</Link>
                                            <Link className="nav-link active" to="#" style={{ color: '#255296' }}>How it works</Link>
                                        </div>
            
                                        {/* <div className='d-flex gap-3'>
                                            <Btn
                                                title="Log out"
                                                backgroundColor="btn text-light"
                                                style="#FF0000"
                                                border="none"
                                                work={handleLogout}
                                            />
                                        </div> */}
                                    </div>
            
                                </div>
                            </nav>
            

            <div style={{ minHeight: '100vh', background: '#f6f8fc', padding: '1rem' }}>
                <div style={{ maxWidth: 980, margin: '0 auto', background: '#fff', borderRadius: 12, padding: '1rem 1.2rem' }}>
                    <h2 style={{ color: '#255296', marginBottom: '0.8rem' }}>Take Quiz</h2>
                    <p style={{ color: '#495057', marginBottom: '1rem' }}>Select a test subject and answer questions.</p>

                    {tests.length === 0 ? (
                        <div style={{ padding: '1rem', border: '1px dashed #c4c8d3', borderRadius: 8 }}>No tests available yet.</div>
                    ) : (
                        <div>
                            <div style={{ marginBottom: '1rem' }}>
                                <strong>Available subjects:</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.6rem' }}>
                                    {[...new Set(tests.map(q => q.subject))].map((sub) => (
                                        <button key={sub} onClick={() => startSubject(sub)} style={{ border: '1px solid #255296', background: subject === sub ? '#255296' : '#fff', color: subject === sub ? '#fff' : '#255296', borderRadius: 6, padding: '0.4rem 0.7rem', cursor: 'pointer' }}>{sub}</button>
                                    ))}
                                </div>
                            </div>

                            {subject && quizQuestions.length > 0 && !finished && (
                                <>
                                    <div style={{ marginBottom: '0.8rem', color: '#222' }}><strong>{subject} Quiz — Question {current + 1}/{quizQuestions.length}</strong></div>
                                    <div style={{ marginBottom: '0.8rem', padding: '0.8rem', border: '1px solid #d9e1ef', borderRadius: 8, background: '#f5f7ff' }}>
                                        {quizQuestions[current].question}
                                    </div>
                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        {['A', 'B', 'C', 'D'].map((key) => (
                                            <button key={key} onClick={() => setSelected(key)} style={{ textAlign: 'left', borderRadius: 8, padding: '0.6rem 0.7rem', border: selected === key ? '2px solid #255296' : '1px solid #c3c8d9', background: selected === key ? '#eaf0ff' : '#fff', cursor: 'pointer' }}>
                                                <strong>{key}.</strong> {quizQuestions[current][`option${key}`]}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={handleSubmitAnswer} style={{ marginTop: '0.8rem', borderRadius: 8, background: '#255296', color: '#fff', border: 'none', padding: '0.6rem 1rem', cursor: 'pointer' }}>Submit Answer</button>
                                    {error && <div style={{ color: '#c92a2a', marginTop: '0.5rem' }}>{error}</div>}
                                </>
                            )}

                            {finished && (
                                <div style={{ marginTop: '1rem', border: '1px solid #d8dfec', borderRadius: 10, padding: '1rem', background: '#f8fbff' }}>
                                    <h3 style={{ color: '#255296' }}>Quiz Complete!</h3>
                                    <p>Your score: <strong>{score}/{quizQuestions.length}</strong></p>
                                    <button onClick={saveResult} style={{ borderRadius: 8, background: '#2d8e50', color: '#fff', border: 'none', padding: '0.6rem 1rem', cursor: 'pointer' }}>Save Result</button>
                                    {saved && <p style={{ color: '#136f13', marginTop: '0.5rem' }}>Result saved successfully.</p>}
                                    <button onClick={() => startSubject(subject)} style={{ marginLeft: '0.6rem', borderRadius: 8, background: '#255296', color: '#fff', border: 'none', padding: '0.6rem 1rem', cursor: 'pointer' }}>Retake</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Quiz;
