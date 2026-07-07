import React from 'react'
import './home.css'
import HeadphonesImage from './../../images/headphones-black.png';

function Home() {
  return (
    <main>
      <section className='hero-section'>
        <div className='hero-container'>
          <div className='hero-container-text'>
            <div className='hero-container-text-heading'>
              <p>Upgrade Your Setup, Elevate Your Performance!</p>
            </div>
            <div className='hero-container-text-paragraph'>
              <p>Explore our curated collection of premium computer accessories and cutting-edge gear tailored to power your daily grind and ultimate gaming sessions.</p>
            </div>
            <div className='hero-container-btn'>
              <button>EXPLORE NOW</button>
            </div>
          </div>
          <div className='hero-container-image'>
            <img src={HeadphonesImage} alt="Headphones" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home