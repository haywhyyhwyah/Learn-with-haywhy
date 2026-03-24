import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import './SignupForm.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';


const SignupForm = () => {
  const [FirstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const [modal, setModal] = useState({ show: false, title: '', content: '', onClose: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
        FirstName,
        LastName,
        email,
        password
      };

      axios.post('https://lwh-backend-nine.vercel.app/user/signup', userData)
        .then((res) => {
          setModal({
            show: true,
            title: 'Sign Up Successful',
            content: 'Sign up successful, please login',
            onClose: () => {
              setModal({ ...modal, show: false });
              navigate('/signin');
            }
          });
        })
        .catch((err) => {
          setModal({
            show: true,
            title: 'Sign Up Failed',
            content: `Signup Failed, ${err.response ? err.response.data : 'Unknown error occurred'}`,
            onClose: () => setModal({ ...modal, show: false })
          });
        })
    }

    return (
      <>
      <Modal
        show={modal.show}
        title={modal.title}
        onClose={modal.onClose}
      >
        {modal.content}
        <div style={{ marginTop: '1rem' }}>
        <button className="modal-close" onClick={modal.onClose}>Close</button>
        </div>
      </Modal>
      <StyledWrapper>
        <div className='body container-fluid'>
          <div className="auth-wrapper mx-auto">
            <div className="auth-illustration" aria-hidden>
              <div className="illustration-content">
                <h2>Learn. Practice. Ace.</h2>
                <p>Interactive quizzes and practice tests tailored to your needs.</p>
              </div>
            </div>

            <div className="auth-form">
              <div className="container mx-auto">
                <div className="heading">Create account</div>
                <form action='' className="form" onSubmit={handleSubmit}>
                  <input required className="input" type="text" name="FirstName" id="FirstName" placeholder="First name" onChange={(e) => {setFirstName(e.target.value)}} />
                  <input required className="input" type="text" name="LastName" id="Lastname" placeholder="Last name" onChange={(e) => {setLastName(e.target.value)}} />
                  <input required className="input" type="email" name="email" id="email" placeholder="Email address" onChange={(e) => {setemail(e.target.value)}}/>
                  <div className="password-field">
                    <input required className="input" type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Password" value={password} onChange={(e) => {setpassword(e.target.value)}} />
                    <button
                      type="button"
                      className="toggle-password"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <span className="forgot-password"><a href="#">Forgot Password?</a></span>
                  {/* <input className="login-button" type="submit" defaultValue="Sign Up" /> */}
                  <button className="login-button">Sign up</button>
                </form>
                <div className="social-account-container">
                  <span className="title">Already have an account? <Link to='/signin'>Login</Link></span>
                </div>
                <span className="agreement"><a href="#">View user licence agreement</a></span>
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>
      </>
    );
}

const StyledWrapper = styled.div`
  .auth-wrapper{
    max-width: 1000px;
    display: flex;
    gap: 2rem;
    align-items: stretch;
    justify-content: center;
    margin: 2rem auto;
    padding: 1rem;
  }

  .auth-illustration{
    flex: 1 1 45%;
    border-radius: 24px;
    background-image: url('/cartoon.png');
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 420px;
    position: relative;
    overflow: hidden;
  }

  .illustration-content{
    background: rgba(37,81,150,0.85);
    color: white;
    padding: 1.2rem 1.4rem;
    border-radius: 12px;
    text-align: center;
    max-width: 320px;
  }

  .illustration-content h2{
    margin: 0 0 0.5rem 0;
    font-size: 22px;
    letter-spacing: 0.3px;
  }

  .illustration-content p{ margin: 0; font-size: 14px; opacity: 0.95; }

  .auth-form{ flex: 0 1 420px; display:flex; align-items:center; justify-content:center; }

  .auth-form .container{
    max-width: 420px;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 20px;
    padding: 28px 28px;
    border: 1px solid rgba(37,82,150,0.06);
    box-shadow: rgba(37, 82, 150, 0.08) 0px 30px 30px -20px;
    margin: 10px;
  }

  .heading {
    text-align: left;
    font-weight: 800;
    font-size: 24px;
    color: rgba(37, 82, 150, 1);
    margin-bottom: 6px;
  }

  .form { margin-top: 12px; }

  .form .input {
    width: 100%;
    background: white;
    border: 1px solid transparent;
    padding: 12px 14px;
    border-radius: 12px;
    margin-top: 12px;
    box-shadow: rgba(37,81,150,0.06) 0px 6px 12px -8px;
  }

  .password-field { position: relative; }

  .password-field .toggle-password {
    position: absolute;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: #255296;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0;
  }

  .password-field .input { padding-right: 60px; }

  .form .input::placeholder { color: rgb(150, 150, 150); }

  .form .input:focus { outline: none; border-color: #12B1D1; box-shadow: 0 6px 14px rgba(18,177,209,0.06); }

  .form .forgot-password { display: block; margin-top: 8px; margin-left: 6px; }

  .form .forgot-password a { font-size: 12px; color: #255296; text-decoration: none; }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: 700;
    background-color: #90c75d;
    color: white;
    padding: 12px 14px;
    margin: 18px auto 6px;
    border-radius: 12px;
    box-shadow: rgba(37, 81, 150, 0.12) 0px 12px 18px -12px;
    border: none;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .form .login-button:hover { transform: translateY(-3px); box-shadow: rgba(37, 81, 150, 0.18) 0px 18px 20px -12px; }

  .social-account-container { margin-top: 14px; }

  .social-account-container .title { display: block; text-align: center; font-size: 12px; color: rgb(120, 120, 120); }

  .agreement { display: block; text-align: center; margin-top: 12px; }

  .agreement a { text-decoration: none; color: #0099ff; font-size: 12px; }

  @media (max-width: 900px){
    .auth-wrapper{ flex-direction: column-reverse; padding: 1rem; }
    .auth-illustration{ width: 100%; min-height: 200px; border-radius: 16px; }
    .auth-form{ width: 100%; }
    .heading{ text-align: center; }
    .illustration-content{ display: none; }
  }

  @media (max-width: 420px){
    .auth-form .container{ padding: 18px; border-radius: 14px; }
    .form .input{ padding: 10px 12px; border-radius: 10px; }
    .form .login-button{ padding: 10px 12px; border-radius: 10px; }
  }
`;

export default SignupForm;

