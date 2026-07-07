import { NavLink } from 'react-router'

export default function NavBar() {
   return (
      <nav>
         <div className="nav-bar">
            <ul>
               <li>
                  <NavLink
                     to="/"
                     className={({ isActive }) => { isActive ? "#224F34" : "green" }}
                  >
                     HOME
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/about"
                     className={({ isActive }) => { isActive ? "#224F34" : "green" }}>
                     ABOUT
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/products"
                     className={({ isActive }) => { isActive ? "#224F34" : "green" }}>
                     PRODUCTS
                  </NavLink>
               </li>
            </ul>
         </div>
      </nav>
   )
}