import React, { useState } from 'react'
import css from './SignupPage.module.css'
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  

 const handleChange = (e) => {
   setFormData({
    ...formData,
    [e.target.name]: e.target.value
   });
 }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(formData.password !== formData.confirmPassword){
      alert('passwords do not match')
      return
    }
    localStorage.setItem('user', JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }))
    alert('Signup successful! Please login.')
    navigate('/login')
  }
  return (
    <div className={css.signupWrapper}>
      <div className={css.authContainer}>
        <h2>Sign Up</h2>
        <form className={css.authForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input 
            type="password" 
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
          />
          <input 
            type="password" 
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password" 
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage