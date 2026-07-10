import React, { useState } from 'react'

function DropDown() {
   const [selected, setSelected] = useState("");
  return (
    <>
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
         <option value="All companies">All companies</option>
         <option value="Corsair">Corsair</option>
         <option value="Bloody">Bloody</option>
         <option value="Red dragon">Red dragon</option>
         <option value="Dell">Dell</option>
         <option value="NVidia">NVidia</option>
      </select>
    </>
  )
}

export default DropDown