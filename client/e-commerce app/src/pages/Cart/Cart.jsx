import React, { useEffect, useState } from 'react'
import './cart.css'
import { Delete } from '../../icons/Icons.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decrement, deleteItem, increment } from '../../features/Cart/cartSlice.js'
import { Link } from 'react-router'
import { getUserCart, saveUserCartItem, deleteUserCartItem, clearUserCart } from '../../features/Cart/cartSlice.js'
import { PaymentCard, PaymentSuccessful } from './Payment-Card/PaymentCard.jsx'

function Cart() {
   const dispatch = useDispatch();
   const [paymentOpen, setPaymentOpen] = useState(false);
   const [confirmPaymentOpen, setConfirmPaymentOpen] = useState(false);
   function openPaymentPopUp() {
      setPaymentOpen(true);
   }
   function cancelPaymentPopUp() {
      setPaymentOpen(false);
   }
   function yesConfirmPaymentPopUp() {
      setConfirmPaymentOpen(true);
      setPaymentOpen(false);
   }
   function closeConfirmPaymentPopUp() {
      setConfirmPaymentOpen(false);
   }
   
   // NO NEED TO USE IT NOW, WILL SHOW PRODUCT ITEM'S DETAILS FROM BACKEND:
   // CALLING STATES MERGER SELECTOR FUNCTION TO GET THE MERGED STATE DATA (which is not actually merged but explicitly merged to input our cart data)
   // const cartProducts = useSelector(selectCartItemWithProductDetails);

   // TO INCREASE/DECREASE THE CART PRODUCTS COUNT:
   function handleProductIncrementQuantity(productId, productCount) {
      dispatch(saveUserCartItem({
         productId,
         productCount: productCount + 1
      }))
   }

   function handleProductDecrementQuantity(productId, productCount) {
      // Don't allow quantity to drop below 1
      if (productCount <= 1) {
         return;
      }
      dispatch(saveUserCartItem({
         productId,
         productCount: productCount - 1
      }))
   }

   // TO DELETE THE CART ITEM:
   function handleProductDelete(productId) {
      dispatch(deleteUserCartItem({ productId }))
   }
   // ACCESSING CART STATE FROM STORE:
   const cartProducts = useSelector((store) => store.cart.cartItems);

   // FOR TOTAL AMOUNT:
   let subtotal = 0;
   const money = cartProducts.map((cartProduct) => {
      return subtotal += (cartProduct.product.price * cartProduct.quantity)
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
                        <div key={cartProduct.product._id} className='cart-item-details'>
                           <div className='item-image'>
                              <img src={`${import.meta.env.VITE_SERVER_URL}${cartProduct.product.img}`} alt={cartProduct.product.name} />
                           </div>
                           <div className='item-details'>
                              <div className='item-title'>
                                 <p>{cartProduct.product.name}</p>
                              </div>
                              <div className='stock'>
                                 <p>In Stock</p>
                              </div>
                              <div className='item-price'>
                                 ${cartProduct.product.price}
                              </div>
                              <div className='add-or-delete'>
                                 <button onClick={() => (handleProductDecrementQuantity(cartProduct.product._id, cartProduct.quantity))} className='delete-icon'><Delete /></button>
                                 <p>{cartProduct.quantity}</p>
                                 <button onClick={() => (handleProductIncrementQuantity(cartProduct.product._id, cartProduct.quantity))}>+</button>
                              </div>
                              <div className='delete-btn'>
                                 <button onClick={() => handleProductDelete(cartProduct.product._id)}>Delete</button>
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
                     <button onClick={() => dispatch(clearUserCart())}>Clear Cart</button>
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
                  <div className='pay-btn'>
                     <button onClick={openPaymentPopUp}>PAY</button>
                  </div>
                  {
                     paymentOpen &&
                     <PaymentCard cancelPaymentPopUp={cancelPaymentPopUp} yesConfirmPaymentPopUp={yesConfirmPaymentPopUp} />
                  }
                  {
                     confirmPaymentOpen &&
                     <PaymentSuccessful closeConfirmPaymentPopUp={closeConfirmPaymentPopUp} />
                  }
               </div>
            </article>
         </section>
      </main>
   )
}

export default Cart