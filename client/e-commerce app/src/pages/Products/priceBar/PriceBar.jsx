import React, { useEffect, useState } from 'react'

function PriceBar() {
   const [price, setPrice] = useState(5000);
   return (
      <div className='bar'>
         <input type="range"
         min="0"
         max="10000"
         step="0.1"
         value={price}
         onChange={(e) => setPrice(e.target.value)} />
         <p>Up to ${price}</p>
      </div>
   )
}

export default PriceBar