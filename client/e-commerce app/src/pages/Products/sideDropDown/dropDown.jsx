import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { fetchProducts } from '../../../features/Products-List/productListSlice';

function DropDown() {
   const dispatch = useDispatch();
   // FOR COMPANY WISE PRODUCT FILTERATION:
   const [searchParams, setSearchParams] = useSearchParams();
   const currentCompany = searchParams.get("company") || 'All companies'

   // MERGING URLS FROM DIFFERENT FILTERS (e.g, category, price etc.)
   function handleCompanyChange(company) {
    setSearchParams((prev) => {
      if(company === 'All companies'){
        prev.delete('company')
      } else {
        prev.set('company', company)
      }
      return prev;
    })
   }

  return (
    <>
      <select value={currentCompany} onChange={(e) => handleCompanyChange(e.target.value)}>
         <option value="All companies">All companies</option>
         <option value="Corsair">Corsair</option>
         <option value="Redragon">Redragon</option>
         <option value="Bloody">Bloody</option>
         <option value="Logitech">Logitech</option>
         <option value="Intel">Intel</option>
         <option value="AMD">AMD</option>
         <option value="Dell">Dell</option>
         <option value="Samsung">Samsung</option>
         <option value="LG">LG</option>
         <option value="ASUS">ASUS</option>
         <option value="BenQ">BenQ</option>
         <option value="HyperX">HyperX</option>
      </select>
    </>
  )
}

export default DropDown