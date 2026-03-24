import React from 'react'
import Btn from './Btn'
import './Signin.css'
import { Link } from 'react-router-dom'

const SigninNav = () => {
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
                            <Link to="/" className="nav-link active" aria-current="page" style={{ color: '#255296' }}> Home</Link>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>Subjects</a>
                            <a className="nav-link active" href="#" style={{ color: '#255296' }}>How it works</a>
                        </div>

                        <div className='d-flex gap-3'>
                            <Link to='/signup'><Btn title="Sign up" backgroundColor='btn text-light' style="#255296" border="none" /></Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SigninNav