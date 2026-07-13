import React, { useEffect, useState } from 'react'
import './products.css'
import { Link, useParams } from 'react-router';
import Carousal from './carousal/carousal.jsx'
import { carousalImageData } from '../../Data/carousalData/carousalData.js';
import { ChevronLeft, ChevronRight } from '../../icons/Icons.jsx';
import DropDown from './sideDropDown/dropDown.jsx';
import PriceBar from './priceBar/PriceBar.jsx';
import FreeShippingCheckbox from './free Shipping/FreeShippingCheckbox.jsx';
import CategoryBtns from './Category buttons/CategoryBtns.jsx';
import ProductCard from './Product card/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/Products List/productListSlice.js';

function Products() {
   // MOUNTING PRODUCTS UPON PAGE LOADING:
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProducts())
   }, [])
   const productsList = useSelector((store) => store.productList);
   console.log(productsList.products);
   
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
                  <div className='flex search-bar'>
                     <input type="text" placeholder='Search products' />
                  </div>
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
                     <div className='colors-btns'>
                        <button>All</button>
                        <button className='red'></button>
                        <button className='green'></button>
                        <button className='blue'></button>
                        <button className='yellow'></button>
                     </div>
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
                     <div className='clear-btn'>
                        <button>Clear all Filters</button>
                     </div>
                  </div>

               </div>
               <div className='products-list'>
                  {
                     productsList.products.map((product) => {
                        return (
                           <Link key={product.id} to={`/products/${product.id}`}>
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