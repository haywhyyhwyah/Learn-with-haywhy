import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="foot-left">
                    <img src="/logo2.png" alt="Learn with Haywhy logo" className="footer-logo"/>
                    <p className="footer-desc">Interactive quizzes and practice tests to boost learning anytime, anywhere.</p>
                </div>

                <div className="foot-center">
                    <nav className="footer-nav" aria-label="Footer navigation">
                        <Link to='/dashboard'>Subjects</Link>
                        <Link to='/how-it-works'>How it works</Link>
                        <Link to='/contact'>Contact</Link>
                    </nav>
                </div>

                <div className="foot-right">
                    <div className="socials" aria-label="Social links">
                        <a href="#" aria-label="Facebook"><img src="/facebook.png" alt="Facebook"/></a>
                        <a href="https://wa.link/r0fz7c" aria-label="WhatsApp"><img src="/whatsapp.png" alt="WhatsApp"/></a>
                        <a href="https://x.com/haywhyyhwyah" aria-label="Twitter"><img src="/twitter.png" alt="Twitter"/></a>
                        <a href="https://www.linkedin.com/in/ayomide-akindojutimi-358533316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="LinkedIn"><img src="/linkedin.png" alt="LinkedIn"/></a>
                    </div>
                    <div className="copyright">© 2026 Learn with Haywhy. All rights reserved.</div>
                </div>
            </div>
        </footer>
    )
}

export default Footer