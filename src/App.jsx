import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import AdminSignIn from './pages/admin/AdminSignIn'
import AdminSignUp from './pages/admin/AdminSignUp'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageQuestionForm from './pages/admin/ManageQuestionForm';
import Quiz from './pages/Quiz';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/admin-signin' element={<AdminSignIn/>}/>
      <Route path='/admin-signup' element={<AdminSignUp/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/admin/manage-questions' element={<ManageQuestionForm/>}/>
      <Route path='/quiz' element={<Quiz/>}/>
      <Route path='/how-it-works' element={<HowItWorks/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
