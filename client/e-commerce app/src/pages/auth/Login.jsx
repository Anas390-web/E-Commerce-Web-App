import React from 'react'
import './auth.css'
import { Link } from 'react-router'
import { useState } from 'react'
import { Eye, EyeSlash } from '../../icons/Icons.jsx'

function Login() {
  // LOGIC PAGE LOCAL FORM STATE
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // SHOW PASSWORD:
  const [showPassword, setShowPassword] = useState(false);
  function toggleShowPassword() {
    setShowPassword((prev) => !prev)
  }
  return (
    <main>
      <div className='auth-flex'>
        <div className='auth-card'>
          <div className='auth-main-heading'>
            <h1>Login</h1>
          </div>
          <form className='auth-form'>

            <div className='auth-label'>
              <label>
                <p>Email address</p>
                <input
                  type="text"
                  name="email"
                  placeholder='enter email address'
                  value={formData.email}
                  onChange={handleChange} />
              </label>
            </div>
            <div className='auth-label'>
              <label>
                <p>Password</p>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder='enter password'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  className='eye-btn'
                  onClick={toggleShowPassword} >
                  {
                    showPassword ? <EyeSlash /> : <Eye />
                  }
                </button>
              </label>
            </div>
            <div className='auth-btn'>
              <button>Login</button>
            </div>
            <div className='haveAccount'>
              <p>Don't have an account?<Link to='/register'>Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login