import React from 'react'
import { useSearchParams } from 'react-router'

function SearchBar() {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentName = searchParams.get('name') || '';

   function handleNameChange(name) {
      setSearchParams((prev) => {
         if(name) {
            prev.set('name', name)
            return prev;
         }
      })
   }
   return (
      <div className='flex search-bar'>
         <input
            type="text"
            placeholder='Search products'
            value={currentName}
            onChange={(e) => handleNameChange(e.target.value)} />
      </div>
   )
}

export default SearchBar