import React, { useState } from 'react'
import { useSearchParams } from 'react-router';

function FreeShippingCheckbox() {
   const [searchParams, setSearchParams] = useSearchParams();
   // checked attribute takes the boolean values:
   // isShippingFree comes as 'true' and 'true' === 'true' is a boolean value true.
   const isChecked = searchParams.get('isShippingFree') === 'true';
   function handleFreeShippingChange(e){
      const checked = e.target.checked;
      setSearchParams((prev) => {
         if(checked) {
            prev.set('isShippingFree', true)
         } else {
            prev.set('isShippingFree', false)
         }
         return prev;
      })
   }
   return (
      <div className='input-checkbox'>
         <label>Free Shipping</label>
         <input
            type="checkbox"
            checked={isChecked}
            onChange={handleFreeShippingChange} />

      </div>
   )
}

export default FreeShippingCheckbox