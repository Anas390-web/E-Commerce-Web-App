import React, { useState } from 'react'

function CategoryBtns() {
   const categories = ["All", "CPU", "Mouse", "Keyboard", "Monitor", "Laptop", "Headphone"];
   const [selected, setSelected] = useState("All");
   return (
      <>
         {
            categories.map((category) => {
               return (
                  <button
                     key={category}
                     onClick={() => setSelected(category)}
                     style={{ backgroundColor: selected === category ? "#6BC785" : "#f1efe8",
                        color: selected === category ? "#fff" : "#000"
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