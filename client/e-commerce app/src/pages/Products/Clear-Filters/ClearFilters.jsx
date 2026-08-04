import React from 'react'
import { useSearchParams } from 'react-router'

function ClearAllFilters() {
   const [searchParams, setSearchParams] = useSearchParams();
   function clearFilters(){
      // EMPTYING THE SEARCH URL OBJECT
      setSearchParams({})
   }
   return (
      <div className='clear-btn'>
         <button onClick={clearFilters}>Clear all Filters</button>
      </div>
   )
}

export default ClearAllFilters