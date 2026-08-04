import React from 'react'
import './footer.css'
import { Link, NavLink } from 'react-router'
import twitterIcon from '../../images/twitter (1).png'
import instaIcon from '../../images/instagram.png'
import facebookIcon from '../../images/facebook.png'

function Footer() {
   return (
      <footer>
         <div className='footer-container'>
            <div className='footer-grid'>
               <div className='app-title'>
                  <p>BuyMe</p>
                  <div className='social-media-icons'>
                     <img height={20} src={instaIcon} alt="twitter Icon" />
                     <img height={20} src={facebookIcon} alt="twitter Icon" />
                     <img height={20} src={twitterIcon} alt="twitter Icon" />
                  </div>
               </div>
               <div className='company'>
                  <p>COMPANY</p>
                  <div className='company-details'>
                     <Link
                        to="/about">
                        About Us
                     </Link>
                     <Link
                        to="/products">
                        Products
                     </Link>
                  </div>
               </div>
               <div className='subscribe-bar'>
                  <p>STAY UP TO DATE</p>
                  <div className='subscribe-input'>
                     <input type="text" placeholder='Enter your email' />
                     <button>SUBSCRIBE</button>
                  </div>
               </div>
            </div>
         </div>
         <div className='copyright'>
            <span>© 2026 BuyMe All rights reserved</span>
            <div className='disclaimer'>
                  <p>Disclaimer: This project is created strictly for educational and portfolio demonstration purposes. All product images, prices, ratings, and associated brand trademarks are used solely as placeholder content for a non-commercial student project and remain the property of their respective owners.</p>
               </div>
         </div>
      </footer>
   )
}

export default Footer