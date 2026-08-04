import React from 'react'
import './auth.css'
import { Link } from 'react-router'

function SignUp() {
   return (
      <main>
         <div className='auth-flex'>
            <div className='auth-card'>
               <div className='auth-main-heading'>
                  <h1>Sign Up</h1>
               </div>
               <form className='auth-form'>
                  <div className='auth-label'>
                     <label>
                        <p>Username</p>
                        <input type="text" placeholder='enter username' />
                     </label>
                  </div>
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
                  <div className='auth-label'>
                     <label>
                        <p>Confirm Password</p>
                        <input type="text" placeholder='enter password again' />
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