import { NavLink, Link } from 'react-router'
import { CartIcon } from '../../icons/Icons'
import './navBar.css'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, logout } from '../../features/Authentication/authSlice';
import { useEffect } from 'react';

export default function NavBar() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   // ACCESSING USERNAME FROM AUTH SLICE FROM STORE:
   const { username } = useSelector((store) => store.auth);
   // TO DISPLAY USERNAME UPON RE-LOADING PAGE:
   useEffect(() => {
      dispatch(fetchUserDetails())
   }, [dispatch])
   // ACCESSING TOKEN:
   const token = localStorage.getItem('accessToken');
   // TO NAVIGATE BACK TO LOGIN PAGE IF USER LOGGED-OU:T
   function handleLogOutClick(e) {
      e.preventDefault();
      dispatch(logout());
      navigate('/login');
   }
   return (
      <header>
         <nav>
            <div className="nav-bar-container">
               <div className='nav-title'>
                  <h2>BuyMe</h2>
               </div>
               <div className='navLinks'>
                  <ul>
                     <li>
                        <NavLink
                           to="/"
                           style={({ isActive }) => ({ backgroundColor: isActive ? "#06B6D4" : "" })}>
                           HOME
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/about"
                           style={({ isActive }) => ({ backgroundColor: isActive ? "#06B6D4" : "" })}>
                           ABOUT
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to="/products"
                           style={({ isActive }) => ({ backgroundColor: isActive ? "#06B6D4" : "" })}>
                           PRODUCTS
                        </NavLink>
                     </li>
                  </ul>
               </div>
               <div className='links'>
                  <Link
                     to="/cart" >
                     <CartIcon />
                  </Link>
               </div>
               <div className='nav-auth-btn'>
                  {token && token.length > 0 ?
                     <>
                        <div id='username'>
                           <p>Hi, {username.toUpperCase()}</p>
                        </div>
                        <button onClick={handleLogOutClick} id='logout'>Logout</button>
                     </>
                     :
                     <>
                        <Link to='/login'>
                           <button id='login'>Login</button>
                        </Link>
                        <Link to='/register'>
                           <button id='sign-up'>Sign Up</button>
                        </Link>
                     </>

                  }
               </div>
            </div>
         </nav>
      </header>
   )
}