import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router'
import { Eye, EyeSlash } from '../../icons/Icons.jsx'
import { registerUser } from '../../features/Authentication/authSlice.js'
import { useDispatch } from 'react-redux'

function SignUp() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   
   // SIGN UP PAGE LOCAL FORM STATE
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   })
   function handleChange(e) {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }
   // DISPATCH REGISTRATION OF USER ACTION:
   function handleSubmit(e) {
      e.preventDefault();
      dispatch(registerUser(formData))
      navigate('/login');
   }
   // SHOW PASSWORD:
   const [showPassword, setShowPassword] = useState({
      passwordVisible: false,
      confirmPasswordVisible: false
   });
   function toggleShowPassword() {
      setShowPassword((prev) => {
         return {
            ...prev, passwordVisible: !prev.passwordVisible
         }
      })
   }
   function toggleShowConfirmPassword() {
      setShowPassword((prev) => {
         return {
            ...prev, confirmPasswordVisible: !prev.confirmPasswordVisible
         }
      })
   }
   return (
      <main>
         <div className='auth-flex'>
            <div className='auth-card'>
               <div className='auth-main-heading'>
                  <h1>Sign Up</h1>
               </div>
               <form
                  onSubmit={handleSubmit}
                  className='auth-form'>
                  <div className='auth-label'>
                     <label>
                        <p>Username</p>
                        <input
                           type="text"
                           name="username"
                           placeholder='enter testing username'
                           value={formData.username}
                           onChange={handleChange} />
                     </label>
                  </div>
                  <div className='auth-label'>
                     <label>
                        <p>Email address</p>
                        <input
                           type="text"
                           name="email"
                           placeholder='enter testing email address'
                           value={formData.email}
                           onChange={handleChange} />
                     </label>
                  </div>
                  <div className='auth-label'>
                     <label>
                        <p>Password</p>
                        <input
                           type={showPassword.passwordVisible ? "text" : "password"}
                           name="password"
                           placeholder='enter testing password'
                           value={formData.password}
                           onChange={handleChange} />
                        <button
                           type='button'
                           className='eye-btn'
                           onClick={toggleShowPassword} >
                           {
                              showPassword.passwordVisible ? <EyeSlash /> : <Eye />
                           }
                        </button>
                     </label>
                  </div>
                  <div className='auth-label'>
                     <label>
                        <p>Confirm Password</p>
                        {
                           (formData.password.length > 0
                              && formData.confirmPassword.length > 0
                              && formData.password !== formData.confirmPassword)
                              ? <p
                                 style={{ color: "red", fontSize: "11px" }}
                              >Password does not match</p>
                              : null
                        }
                        <input
                           type={showPassword.confirmPasswordVisible ? "text" : "password"}
                           name="confirmPassword"
                           placeholder='enter testing password again'
                           value={formData.confirmPassword}
                           onChange={handleChange} />
                        <button
                           type='button'
                           className='eye-btn'
                           onClick={toggleShowConfirmPassword} >
                           {
                              showPassword.confirmPasswordVisible ? <EyeSlash /> : <Eye />
                           }
                        </button>
                     </label>
                  </div>
                  <div className='auth-btn'>
                     <button>Sign Up</button>
                  </div>
                  <div className='haveAccount'>
                     <p>Already have an account?<Link to='/login'>Sign in</Link></p>
                  </div>
               </form>
            </div>
         </div>
      </main>
   )
}

export default SignUp