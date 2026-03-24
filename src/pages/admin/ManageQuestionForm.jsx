import React, { useState, useEffect } from 'react';
import './ManageQuestionForm.css';
import { Link, useNavigate } from 'react-router-dom';


const ManageQuestionForm = ({ onClose, onSubmit }) => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('Admin token');
        const role = localStorage.getItem('Role');

        if (!token || !role || role !== 'admin') {
            localStorage.removeItem('Admin token');
            localStorage.removeItem('Role');
            navigate('/admin-signin');
        }
    }, [navigate]);
    const [question, setQuestion] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');
    const [correct, setCorrect] = useState('');
    const [explanation, setExplanation] = useState('');
    const [questions, setQuestions] = useState([]);
    const [submittedSets, setSubmittedSets] = useState([]); // array of { subject, questions }
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [availableTests, setAvailableTests] = useState([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const loadTests = async () => {
        try {
            const res = await fetch('http://localhost:3000/admin/questions');
            if (!res.ok) throw new Error('Could not load tests');
            const data = await res.json();
            setAvailableTests(data.questions || []);
        } catch (err) {
            console.error('Load tests failed', err);
            setMessage('Could not load saved tests.');
        }
    };

    useEffect(() => {
        loadTests();
    }, []);

    const resetQuestionFields = () => {
        setQuestion('');
        setOptionA('');
        setOptionB('');
        setOptionC('');
        setOptionD('');
        setCorrect('');
        setExplanation('');
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        if (!question || !optionA || !optionB || !optionC || !optionD || !correct) return;
        setQuestions([
            ...questions,
            { question, optionA, optionB, optionC, optionD, correct, explanation }
        ]);
        resetQuestionFields();
    };

    const handleSubmitAll = async (e) => {
        e.preventDefault();
        if (!subject.trim()) {
            setMessage('Please enter a subject name for this test.');
            return;
        }
        if (questions.length === 0) {
            setMessage('Add at least one question before submitting.');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/admin/questions/batch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, questions })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Could not save test');
            }

            setMessage('Test saved successfully.');
            setSubmittedSets([...submittedSets, { subject, questions }]);
            setSubject('');
            setQuestions([]);
            resetQuestionFields();
            await loadTests();
        } catch (err) {
            console.error(err);
            setMessage('Error when saving test: ' + (err.message || 'unknown'));
        } finally {
            setSaving(false);
        }
    };

    const handleRemoveQuestion = (idx) => {
        setQuestions(questions.filter((_, i) => i !== idx));
    };

    // Edit and Delete for the submitted cards
    const handleEditSet = (idx) => {
        const set = submittedSets[idx];
        setSubject(set.subject);
        setQuestions(set.questions);
        setEditMode(true);
        setEditIndex(idx);
    };

    const handleDeleteSet = (idx) => {
        setSubmittedSets(submittedSets.filter((_, i) => i !== idx));
        // If deleting the set being edited, reset edit mode
        if (editMode && editIndex === idx) {
            setEditMode(false);
            setEditIndex(null);
            setSubject('');
            setQuestions([]);
        }
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
                            <Link className="nav-link active" aria-current="page" to="/admin-dashboard" style={{ color: '#255296' }}>Home</Link>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>Subjects</a>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>How it works</a>
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


            <div className="manage-question-form-bg">
                <form className="manage-question-form mt-5" onSubmit={handleSubmitAll}>
                    <h2 style={{ color: '#255296', marginBottom: '1rem' }}>Create New Test</h2>
                    <label>Subject</label>
                    <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Enter subject" />

                    <hr style={{ margin: '1.2rem 0' }} />
                    <h3 style={{ color: '#255296', fontSize: '1.1rem' }}>Add Question</h3>
                    <label>Question</label>
                    <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Enter question" />
                    <label>Option A</label>
                    <input type="text" value={optionA} onChange={e => setOptionA(e.target.value)} placeholder="Option A" />
                    <label>Option B</label>
                    <input type="text" value={optionB} onChange={e => setOptionB(e.target.value)} placeholder="Option B" />
                    <label>Option C</label>
                    <input type="text" value={optionC} onChange={e => setOptionC(e.target.value)} placeholder="Option C" />
                    <label>Option D</label>
                    <input type="text" value={optionD} onChange={e => setOptionD(e.target.value)} placeholder="Option D" />
                    <label>Correct Answer</label>
                    <select value={correct} onChange={e => setCorrect(e.target.value)}>
                        <option value="">Select correct option</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    <label>Explanation (optional)</label>
                    <textarea value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="Explanation (optional)" />
                    <button type="button" onClick={handleAddQuestion} style={{ background: '#90c75d', color: '#fff', marginTop: '0.5rem' }}>Add Question</button>

                    {questions.length > 0 && (
                        <div style={{ marginTop: '1.5rem', width: '100%' }}>
                            <h4 style={{ color: '#255296', fontSize: '1.1rem' }}>Questions Added</h4>
                            <ul style={{ listStyle: 'decimal', paddingLeft: '1.2rem' }}>
                                {questions.map((q, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.7rem' }}>
                                        <strong>Q{idx + 1}:</strong> {q.question.substring(0, 60)}{q.question.length > 60 ? '...' : ''}
                                        <button type="button" style={{ marginLeft: '1rem', color: '#fff', background: '#e74c3c', border: 'none', borderRadius: '5px', padding: '0.2rem 0.7rem', cursor: 'pointer' }} onClick={() => handleRemoveQuestion(idx)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit" disabled={saving || questions.length === 0} style={{ background: '#255296', color: '#fff', marginTop: '1.2rem' }}>{saving ? 'Saving...' : editMode ? 'Update Set' : 'Submit All Questions'}</button>
                    {onClose && <button type="button" style={{ background: '#e6e9ef', color: '#255296', marginTop: '0.5rem' }} onClick={onClose}>Close</button>}
                    {message && <p style={{ marginTop: '0.7rem', color: message.includes('Error') ? '#dc3545' : '#1f7c41', fontWeight: 600 }}>{message}</p>}
                </form>

                {/* Show all submitted cards side by side */}
                {submittedSets.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '2rem',
                        marginTop: '2.5rem',
                        justifyContent: 'flex-start',
                    }}>
                        {submittedSets.map((set, idx) => (
                            <div key={idx} style={{
                                background: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(37,81,150,0.08)',
                                padding: '2rem 1.5rem',
                                maxWidth: '350px',
                                minWidth: '300px',
                                flex: '0 0 350px',
                                textAlign: 'left',
                                position: 'relative',
                            }}>
                                <h2 style={{ color: '#255296', marginBottom: '1rem', fontSize: '1.2rem' }}>Test for: {set.subject || '(No Subject)'}</h2>
                                <ol>
                                    {set.questions.map((q, qidx) => (
                                        <li key={qidx} style={{ marginBottom: '1.2rem' }}>
                                            <div><strong>Q{qidx + 1}:</strong> {q.question}</div>
                                            <ul style={{ margin: '0.5rem 0 0 1.2rem' }}>
                                                <li>A: {q.optionA}</li>
                                                <li>B: {q.optionB}</li>
                                                <li>C: {q.optionC}</li>
                                                <li>D: {q.optionD}</li>
                                            </ul>
                                            <div style={{ marginTop: '0.3rem' }}><strong>Correct:</strong> {q.correct}</div>
                                            {q.explanation && <div style={{ marginTop: '0.3rem', color: '#42526e' }}><strong>Explanation:</strong> {q.explanation}</div>}
                                        </li>
                                    ))}
                                </ol>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                    <button onClick={() => handleEditSet(idx)} style={{ background: '#255296', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                                    <button onClick={() => handleDeleteSet(idx)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {availableTests.length > 0 && (
                    <div style={{ marginTop: '2rem', width: '100%' }}>
                        <h3 style={{ color: '#255296', marginBottom: '0.7rem' }}>Saved Questions in Database</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.7rem' }}>
                            {availableTests.map((q) => (
                                <div key={q._id} style={{ background: '#fff', borderRadius: '10px', border: '1px solid #d8dde6', padding: '0.8rem' }}>
                                    <div style={{ fontWeight: 700, color: '#255296', marginBottom: '0.2rem' }}>{q.subject}</div>
                                    <div style={{ marginBottom: '0.4rem' }}>{q.question.slice(0, 75)}{q.question.length > 75 ? '...' : ''}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#4a4f5c' }}><strong>Correct:</strong> {q.correct}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageQuestionForm;
