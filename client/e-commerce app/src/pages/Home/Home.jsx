import React from 'react'
import { Link } from 'react-router';
import { useEffect, useState } from 'react'
import './home.css'
import HeadphonesImage from './../../images/headphones-black.png';
import ProductCard from './bestSellingItems';
import CommentCard from './commentCard';
import { commentsData1, commentsData2 } from '../../Data/Dummy-Data/dummyData';
import { ChevronRight, ChevronLeft } from '../../icons/Icons.jsx'

function Home() {
   const [slide, setSlide] = useState("previous");
   function prevSlide() {
      setSlide("previous");
   }
   function nextSlide() {
      setSlide("next");
   }
   const currentComments = slide === "next" ? commentsData2 : commentsData1

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
                     <Link
                        to="/products">
                        <button >EXPLORE NOW</button>
                     </Link>
                  </div>
               </div>
               <div className='hero-container-image'>
                  <img src={HeadphonesImage} alt="Headphones" />
               </div>
            </div>
         </section>
         <section className='best-selling-section'>
            <div className='best-selling-container'>
               <div className='best-selling-title'>
                  <p className='title'>Best selling</p>
                  <p>Get in on the trend with our curated selection of best-selling products.</p>
               </div>
               <div className='best-selling-items-container'>
                  <ProductCard />
               </div>
               <div className='see-all-btn'>
                  <Link
                  to="/products">
                     <button>See all →</button>
                  </Link>
               </div>
            </div>
         </section>
         <section className='feedback-corner-section'>
            <div className='feedback-corner-container'>
               <div className='feedback-corner-title'>
                  <p className='title'>Feedback Corner</p>
               </div>
               <div className='comments-container'>
                  <CommentCard comments={currentComments} />
               </div>
               <div className='sliding-buttons'>
                  <button onClick={prevSlide} disabled={slide === "previous"}>
                     <ChevronLeft />
                  </button>
                  <button onClick={nextSlide} disabled={slide === "next"}>
                     <ChevronRight />
                  </button>
               </div>
            </div>
         </section>
      </main>
   )
}

export default Home