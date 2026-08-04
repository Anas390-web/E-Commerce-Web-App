import React from 'react'
import './auth.css'
import { Link } from 'react-router'

function Login() {
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
                <input type="text" placeholder='enter email address' />
              </label>
            </div>
            <div className='auth-label'>
              <label>
                <p>Password</p>
                <input type="text" placeholder='enter password' />
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