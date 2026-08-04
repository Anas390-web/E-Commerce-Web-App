import React, { useEffect, useState } from 'react'
import './products.css'
import { Link, useParams, useSearchParams } from 'react-router';
import Carousal from './carousal/carousal.jsx'
import { carousalImageData } from '../../Data/carousalData/carousalData.js';
import { ChevronLeft, ChevronRight } from '../../icons/Icons.jsx';
import DropDown from './sideDropDown/dropDown.jsx';
import PriceBar from './priceBar/PriceBar.jsx';
import FreeShippingCheckbox from './Free-Shipping/FreeShippingCheckbox.jsx';
import CategoryBtns from './Category-buttons/CategoryBtns.jsx';
import ProductCard from './Product-card/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/Products-List/productListSlice.js';
import SearchBar from './Search-Bar/SearchBar.jsx';
import ClearAllFilters from './Clear-Filters/ClearFilters.jsx';
import Color from './Colors/Color.jsx';

function Products() {
   const [searchParams, setSearchParams] = useSearchParams();
   // MOUNTING PRODUCTS UPON DISPATCHING AND WHEN A URL IS CHANGED:
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProducts(searchParams.toString()))
   }, [searchParams, dispatch])
   // GETTING STATE FROM STORE:
   const productsList = useSelector((store) => store.productList);
   // CAROUSAL
   const [currentIndex, setCurrentIndex] = useState(0);
   const length = carousalImageData.length - 1;
   function prevSlide() {
      setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : length)
   }
   function nextSlide() {
      setCurrentIndex((prevSlide) => prevSlide < length ? prevSlide + 1 : 0)
   }

   return (
      <main>
         <section className='products-carousal-section'>
            <div className='products-carousal-container'>
               <div className='products-hero-image'>
                  <button className='btn btn-left' onClick={prevSlide}>
                     <ChevronLeft />
                  </button>
                  <Carousal images={carousalImageData} currentIndex={currentIndex} />
                  <button className='btn btn-right' onClick={nextSlide}>
                     <ChevronRight />
                  </button>
               </div>
            </div>
         </section>
         <section className='products-list-section'>
            <article className='products-grid-container'>
               <div className='sidebar'>
                  <SearchBar />
                  <div className='flex category'>
                     <div className='category-heading'>
                        <p>Category</p>
                     </div>
                     <div className='category-btns'>
                        <CategoryBtns />
                     </div>
                  </div>
                  <div className='flex company'>
                     <div className='company-heading'>
                        <p>Company</p>
                     </div>
                     <div className='company-dropdown'>
                        <DropDown />
                     </div>
                  </div>
                  <div className='flex colors'>
                     <div className='colors-heading'>
                        <p>Colors</p>
                     </div>
                     <Color />
                  </div>

                  <div className='flex price'>
                     <div className='price-heading'>
                        <p>Price</p>
                     </div>
                     <div className="price-bar">
                        <PriceBar />
                     </div>
                  </div>
                  <div className='flex free-shipping'>
                     <div className="free-shipping-checkbox">
                        <FreeShippingCheckbox />
                     </div>
                  </div>
                  <div className='clear-all-filters'>
                     <ClearAllFilters />
                  </div>

               </div>
               <div className='products-list'>
                  {
                     productsList.products.map((product) => {
                        return (
                           <Link key={product._id} to={`/products/${product._id}`}>
                              <ProductCard product={product} />
                           </Link>
                        )
                     })
                  }
               </div>
            </article>
         </section>
      </main>
   )
}

export default Products