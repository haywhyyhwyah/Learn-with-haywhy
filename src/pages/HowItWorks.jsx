import React from 'react'
import './HowItWorks.css'

const HowItWorks = () => {
    return (
        <section className="howitworks-page">
            <div className="howitworks-container">
                <h1>How It Works</h1>
                <p className="subheader">Learn how your CBT exam prep platform supports learning step by step.</p>

                <div className="steps-grid">
                    <article className="step-card">
                        <h2>1. Sign up or Log in</h2>
                        <p>Create your free account to unlock personalized quizzes, progress tracking, and saved performance insights.</p>
                    </article>

                    <article className="step-card">
                        <h2>2. Choose a Subject</h2>
                        <p>Select your topic, then start a practice test from a range of categories curated for your exam level.</p>
                    </article>

                    <article className="step-card">
                        <h2>3. Take the Quiz</h2>
                        <p>Answer well-designed questions under timed conditions, then get instant feedback with explanations.</p>
                    </article>

                    <article className="step-card">
                        <h2>4. Review Performance</h2>
                        <p>See your scores, identify weak areas, and repeat targeted quizzes for continuous improvement.</p>
                    </article>
                </div>

                <div className="howitworks-info">
                    <h2>Smart Learning Tools</h2>
                    <p>Our platform uses data-backed learning techniques and clear progress metrics so you can improve faster with measurable growth.</p>
                    <ul>
                        <li>Practice questions with instant correctness checks</li>
                        <li>Session analytics for time spent and accuracy</li>
                        <li>Personalized recommendations per topic</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
