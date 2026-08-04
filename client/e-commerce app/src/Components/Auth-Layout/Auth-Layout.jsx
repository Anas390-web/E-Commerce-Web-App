import React from 'react'
import { Outlet } from 'react-router'
function AuthLayout() {
   return (
      <div className='auth-fullscreen'>
         <Outlet />
      </div>
   )
}

export default AuthLayout