import React from 'react'
import Landinghero from '../components/Landinghero'
import Landingcard from '../components/Landingcard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Landing = () => {
    return (
        <>
            <Navbar/>
            <Landinghero/>
            <Landingcard/>
        </>
    )
}

export default Landing