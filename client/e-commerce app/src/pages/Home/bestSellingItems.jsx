import React, { useEffect, useState } from 'react'
import { data } from '../../Data/Dummy-Data/dummyData.js';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/Products-List/productListSlice.js';
import { Link } from 'react-router'

function ProductCard() {
   const dispatch = useDispatch();
   // const [items, setItems] = useState([]);
   useEffect(() => {
      dispatch(fetchProducts())
   }, [])

   const products = useSelector((store) => store.productList.products)

   // FILTERING BASED UPON ISBESTSELLING OUR SCHEMA MODEL PROPERTY:
   const productsList = products
      .filter((item) => (item.isBestSelling === true))
      .map((item) => {
         return (
            <Link to={`/products/${item._id}`}>
               <div key={item._id} className='card'>
                  <div className='item-card-image'>
                     <img height="40px" src={`http://localhost:3000${item.img}`} alt={item.name} />
                  </div>
                  <div className='item-card-details'>
                     <p>{item.name}</p>
                     <div className='item-card-pricing'>
                        <p>${item.price}</p>
                        <p>|</p>
                        <p>{item.rating}⭐</p>
                     </div>
                  </div>
               </div>
            </Link>
         )
      })

   return (
      <>
         {productsList}
      </>
   )
}

export default ProductCard