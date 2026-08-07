import React from 'react'
import './auth.css'
import { Link } from 'react-router'
import { useState } from 'react'
import { Eye, EyeSlash } from '../../icons/Icons.jsx'
import { loginUser } from '../../features/Authentication/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ACCESSING AUTH GLOBAL STATE FROM STORE:
  const { error } = useSelector((store) => store.auth);
  
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

  // TAKE USER TO THE HOME PAGE IF TOKEN EXISTS:
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // .unwrap() tells that if the token exists or not that is why we don't need to see token exists or not from localStorage:
      await dispatch(loginUser(formData)).unwrap()
      navigate('/');
    } catch (error) {
      console.log('Login failed' ,error.message);
    }
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
          <form
            onSubmit={handleSubmit}
            className='auth-form'>
            <div className='auth-label'>
              <label>
                <p>Email address</p>
                {
                  error && formData.email.length <= 0 ? <p style={{color: "red", fontSize: "11px"}}>Email is required!</p>: null
                }
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
                {
                  error ? <p style={{color: "red", fontSize: "11px"}}>Invalid Password, try again!</p>: null
                }
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