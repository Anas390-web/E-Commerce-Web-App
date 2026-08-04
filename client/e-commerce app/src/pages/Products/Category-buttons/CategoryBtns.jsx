import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../../../features/Products-List/productListSlice';

function CategoryBtns() {
   // BUTTON CATEGORIES
   const categories = ["All", "CPU", "Mouse", "Keyboard", "Monitor", "Headphone", "Microphone"];
   // FOR CATEGORY WISE PRODUCT FILTERATION:
   const [searchParams, setSearchParams] = useSearchParams();
   const currentCategory = searchParams.get('category') || 'All';

   // GETTING CATEGORY UPON USER CLICK
   function handleCategoryClick(category) {
      setSearchParams((prev) => {
         if(category === 'All'){
            prev.delete('category')
         } else {
            prev.set('category', category)
         }
         return prev;
      })
   }
   return (
      <>
         {
            categories.map((category) => {
               return (
                  <button key={category}
                     onClick={() => handleCategoryClick(category)}
                     style={{
                        backgroundColor: currentCategory === category ? "#6BC785" : "#f1efe8",
                        color: currentCategory === category ? "#fff" : "#000"
                     }} >
                     {category}
                  </button>
               )
            })
         }
      </>
   )
}

export default CategoryBtns