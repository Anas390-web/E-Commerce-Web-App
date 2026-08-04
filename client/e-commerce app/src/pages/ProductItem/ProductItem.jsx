import React, { useEffect, useState } from 'react'
import './productItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { fetchProducts } from '../../features/Products-List/productListSlice';
import IncrementDecrement from './increment-decrement/IncrementDecrement';
import { addToCart } from '../../features/Cart/cartSlice';

function ProductItem() {
   // INCREMENT AND DECREMENT BUTTONS:
   const [productCount, setProductCount] = useState(1);
   function decrement() {
      if (productCount <= 0) {
         return;
      }
      setProductCount(productCount - 1)
   }
   function increment() {
      setProductCount(productCount + 1)
   }

   // IN CASE USER REFRESHES OR COMES DIRECTLY AT THE PRODUCT PAGE:
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProducts());
   }, [])

   // GETTING DATA/STATE FROM THE STORE
   const productData = useSelector((store) => store.productList);

   // TO FIND THE DATA OF THE EXACT PRODUCT USER IS LOOKING FOR FROM URL ID:
   const { productId } = useParams();
   const product = productData.products.find((product) => {
      return product._id === (productId);
   })
   // console.log(product);

   // IF FINDING TAKES TIME OR COULD NOT FIND SHOW THIS INSTEAD OF AN ERROR:
   if (!product) return <div>Loading...</div>;


   return (
      <main>
         <section className='product-item-section'>
            <article className='product-item'>
               <div className='product-item-grid'>
                  <div className='product-item-images'>
                     <div className='single-image'>
                        <img src={`http://localhost:3000${product.img}`} alt="" />
                     </div>
                  </div>
                  <div className='flex-details product-item-details'>
                     <div className='flex-details name'>
                        <p>{product.name}</p>
                     </div>
                     <div className='flex-details rating'>
                        <p>Rating: {product.rating}</p>
                     </div>
                     <div className='flex-details price'>
                        <p>${product.price}</p>
                     </div>
                     <div className='flex-details description'>
                        <p>{product.description}</p>
                     </div>
                     <div className='column-details'>
                        <div className='available'>
                           <p className='heading'>Available:</p>
                           {product.inStock && <p>In Stock</p> }
                        </div>
                        <div className='sku'>
                           <p className='heading'>Brand:</p>
                           <p>{product.company}</p>
                        </div>
                     </div>
                     <hr />
                     <div className='add-to-cart'>
                        <div className='increment-decrement'>
                           <IncrementDecrement productCount={productCount} increment={increment} decrement={decrement} />
                        </div>
                        <button
                           onClick={
                              () => dispatch(addToCart({
                                 productCount: productCount,
                                 productId: productId
                              }))}
                           className='add-to-cart-btn'>
                           ADD TO CART
                        </button>
                     </div>
                  </div>
               </div>
            </article>
         </section>
      </main>
   )
}

export default ProductItem