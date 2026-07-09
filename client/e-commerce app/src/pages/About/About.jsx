import React from 'react'
import './about.css'
import pcDesk from './../../images/Pc Desk (6).jpg';
import mouse from './../../images/Mouse (1).jpg';
import keyboard from './../../images/Keyboard 2.jpg';
import pcDesk2 from './../../images/Pc Desk (2).jpg';

function About() {
   return (
      <main>
         <section className='about-page'>
            <div className='about-page-container'>
               <div className='about-page-hero-section'>
                  <div className='hero-main-heading'>
                     <p className='big'>ENGINEERING THE PERFECT</p>
                     <p className='slightlySmall'>DESKTOP EXPERIENCE</p>
                  </div>
                  <div className='hero-text'>
                     <p>Discover premium computer accessories crafted carefully for creators, developers, and individuals.</p>
                  </div>
                  <div className='hero-images'>
                     <img className='img1' src={mouse} alt="" />
                     <img className='img2' src={pcDesk} alt="" />
                     <img className='img3' src={keyboard} alt="" />
                  </div>
               </div>
               <div className='about-us-flex'>
                  <div className='about-us-text-section'>
                     <div className='about-us-story'>
                        <div className='about-us-title'>
                           <p>About us</p>
                        </div>
                        <div className='about-us-heading-text'>
                           <p>Our Journey Started with a Single Desk</p>
                        </div>
                        <div className='about-us-paragraph'>
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo maxime natus iste obcaecati eaque neque deleniti, suscipit labore placeat consectetur veritatis ratione, alias earum totam fuga molestiae nobis iure voluptate, quos cumque corrupti mollitia itaque? Doloremque possimus quia labore deserunt, numquam ut. Praesentium assumenda libero repellat, delectus nesciunt nisi quidem repellendus.</p>
                        </div>
                     </div>
                     <div className='about-us-image'>
                        <img src={pcDesk2} alt="Computer accessories" />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </main>
   )
}

export default About