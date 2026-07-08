import React, { useEffect, useState } from 'react'
import { data } from '../../Data/Dummy-Data/dummyData.js';

function ProductCard() {
   const [items, setItems] = useState([]);
   useEffect(() => {
      setItems(data)
   }, [])

   const products = items.map((item) => {
      return (
         <div key={item.id} className='card'>
            <div className='item-card-image'>
               <img height="40px" src={item.image} alt={item.name} />
            </div>
            <div className='item-card-details'>
               <p>{item.name}</p>
               <div className='item-card-pricing'>
                  <p>${item.price}</p>
                  |
                  <p>{item.rating}⭐</p>
               </div>
            </div>
         </div>
      )
   })
   return (
      <>
         {products}
      </>
   )
}

export default ProductCard