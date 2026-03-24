import React from 'react'
import './LandingHero.css'
import Btn from './Btn'
import { Link } from 'react-router-dom'

const Landinghero = () => {
    return (
        <>
            <div className='hero-mother px-5'>
                <div className='Hero'>
                    <h1>Master your knowledge.Anytime, Anywhere</h1>
                    <p>Interactive Quizzes & Practice Tests for Every Subject</p>
                    <div className='d-flex gap-3'>
                        <Link to='/signup'> <Btn title="Start a Quiz" backgroundColor='btn text-light' style= "#255296" border= "none"/></Link>
                        
                        <Link to="/signup"><Btn title="Explore Subjects" backgroundColor='btn text-light' style="#90c75d" border="none"/></Link>
                    </div>
                </div>


                <div className='hero2'>
                    
                </div>
            </div>
        </>
    )
}

export default Landinghero