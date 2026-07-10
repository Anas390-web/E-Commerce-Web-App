import React, { useState } from 'react'

function FreeShippingCheckbox() {
   const [selected, setSelected] = useState(false);
   return (
      <div className='input-checkbox'>
         <label>Free Shipping</label>
         <input
            type="checkbox"
            value={selected}
            onChange={(e) => setSelected(e.target.value)} />

      </div>
   )
}

export default FreeShippingCheckbox