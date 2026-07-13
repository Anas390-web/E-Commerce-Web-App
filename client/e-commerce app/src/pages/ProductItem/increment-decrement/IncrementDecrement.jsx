import React from 'react'
import { useState } from 'react';

function IncrementDecrement({productCount, decrement, increment}) {
   return (
      <>
         <button onClick={() => decrement()}>-</button>
         <p>{productCount}</p>
         <button onClick={() => increment()}>+</button>
      </>
   )
}
export default IncrementDecrement