import React from 'react'
import Card from './Card'
import './Landingcard.css'

const Landingcard = () => {
    return (
        <>
        <h1 className='text-center mt-5'>Features</h1>
        <div className='landing-cards d-flex gap-3 text-center'>
            <div className='card-wrapper shadow-lg'>
                <Card title="Realistic Exam Interface"  mainTxt="Mimics the exact layout, color scheme, and navigation keys (e.g., JAMB keys) of the actual examination." image="MockExam.png"/>
            </div>
            <div className='card-wrapper shadow-lg'>
                <Card title="Massive Past Question Bank" mainTxt="Thousands of questions organized by year and subject, covering the relevant curriculum/syllabus" image="pqBank.png"/>
            </div>
            <div className='card-wrapper shadow-lg'>
                <Card title="Instant Detailed Results" mainTxt="Provides the score immediately upon submission, broken down by subject and topic." image="instantRes.png"/>
            </div>
            <div className='card-wrapper shadow-lg'>
                <Card title="Detailed Explanations"   mainTxt="Provides step-by-step solutions or explanations for every question, especially the incorrect ones." image="detailedEx.png"/>
            </div>
        </div>
        </>     
    )
}

export default Landingcard