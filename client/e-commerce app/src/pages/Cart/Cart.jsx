import React from 'react'
import './cart.css'
import { Delete } from '../../icons/Icons.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decrement, deleteItem, increment, selectCartItemWithProductDetails } from '../../features/Cart/cartSlice.js'
import { Link } from 'react-router'

function Cart() {
   const dispatch = useDispatch();
   // CALLING STATES MERGER SELECTOR FUNCTION TO GET THE MERGED STATE DATA (which is not actually merged but explicitly merged to input our cart data)
   const cartProducts = useSelector(selectCartItemWithProductDetails)
   console.log(cartProducts);

   // FOR TOTAL AMOUNT:
   let subtotal = 0;
   const money = cartProducts.map((product) => {
      return subtotal += (product.price * product.productCount)
   })
   const shippingFee = 6.99;
   const totalAmount = subtotal > 0 ? subtotal + shippingFee : 0;

   return (
      <main>
         <section className='cart-items-section'>
            <article className='cart-items-flex'>
               <div className='cart-main-heading'>
                  <h2>Shopping Cart</h2>
                  <hr />
               </div>
               { 
                  cartProducts.map((cartProduct) => {
                     return (
                        <div key={cartProduct.id} className='cart-item-details'>
                           <div className='item-image'>
                              <img src={cartProduct.image} alt={cartProduct.title} />
                           </div>
                           <div className='item-details'>
                              <div className='item-title'>
                                 <p>{cartProduct.title}</p>
                              </div>
                              <div className='stock'>
                                 <p>In Stock</p>
                              </div>
                              <div className='item-price'>
                                 ${cartProduct.price}
                              </div>
                              <div className='add-or-delete'>
                                 <button onClick={() => dispatch(decrement(cartProduct.id))} className='delete-icon'><Delete /></button>
                                 <p>{cartProduct.productCount}</p>
                                 <button onClick={() => dispatch(increment(cartProduct.id))}>+</button>
                              </div>
                              <div className='delete-btn'>
                                 <button onClick={() => dispatch(deleteItem(cartProduct.id))}>Delete</button>
                              </div>
                           </div>
                        </div>
                     )
                  })
               }
               <hr />
               <div className='clear-cart-continue-shopping'>
                  <Link to="/products">
                     <div className='continue-shopping'>
                        <button>Continue Shopping</button>
                     </div>
                  </Link>
                  <div className='clear-cart'>
                     <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
                  </div>
               </div>
               <div className='total-payment-box'>
                  <div className='total-payment'>
                     <div className='subtotal'>
                        <p className='sub'>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p className='fee'>Shipping fee: ${shippingFee}</p>
                     </div>
                     <hr />
                     <div className='total-amount'>
                        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                     </div>
                  </div>
                  <div className='login-btn'>
                     <button>LOGIN</button>
                  </div>
               </div>
            </article>
         </section>
      </main>
   )
}

export default Cart