import React, { useState } from 'react'

function Carousal({images, currentIndex}) {
return (
   <div className='carousal-img'>
      <img src={images[currentIndex].image} alt={images[currentIndex].name} />
   </div>
)
}

export default Carousal