import { NavLink, Link } from 'react-router'
import { CartIcon } from '../../icons/Icons'
import './navBar.css'

export default function NavBar() {
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
               <div className='nav-login-btn'>
                  <button>LOGIN</button>
               </div>
            </div>
         </nav>
      </header>
   )
}