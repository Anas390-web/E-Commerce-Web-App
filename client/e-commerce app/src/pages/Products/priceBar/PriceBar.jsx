import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { fetchProducts } from '../../../features/Products-List/productListSlice';

function PriceBar() {
   const [searchParams, setSearchParams] = useSearchParams();
   const filters = searchParams.get('numericFilters');
   const currentPrice = filters ? filters.replace(/[^0-9.]/g, '') : 0;
   const dispatch = useDispatch();

   function handlePriceChange(price) {
      setSearchParams((prev) => {
         prev.set('numericFilters', `price>${price}`);
         return prev;
      })
   }

   return (
      <div className='bar'>
         <input type="range"
         min="0"
         max="1000"
         step="0.1"
         value={currentPrice}
         onChange={(e) => handlePriceChange(e.target.value)} />
         <p>Up to ${currentPrice}</p>
      </div>
   )
}

export default PriceBar