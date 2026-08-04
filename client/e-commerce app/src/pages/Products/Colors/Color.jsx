import React from 'react'
import { useSearchParams } from 'react-router'

function Color() {
   const colors = ['All', 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'black']
   const [searchParams, setSearchParams] = useSearchParams();
   const currentColor = searchParams.get('color') || 'All';

   function handleColorParams(color) {
      setSearchParams((prev) => {
         if (color === 'All') {
            prev.delete('color')
         } else {
            prev.set('color', color)
         }
         return prev;
      })
   }
   return (
      <div className='colors-btns'>
         {
            colors.map((color) => {
               return (
                  <button
                     style={{
                        border: currentColor === color ? '2px solid #185FA5' : ""
                     }}
                     key={color}
                     className={color}
                     onClick={() => handleColorParams(color)}>
                  </button>
               )
            })
         }
      </div>
   )
}

export default Color