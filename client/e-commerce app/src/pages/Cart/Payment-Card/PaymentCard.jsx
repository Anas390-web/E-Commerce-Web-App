import './paymentCard.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import successIcon from '../../../icons/icon-images/success-icon.png';
import { clearUserCart } from '../../../features/Cart/cartSlice';

function PaymentCard({ cancelPaymentPopUp, yesConfirmPaymentPopUp }) {
   return (
      <div className="payment-flex">
         <div className='payment-box'>
            <div className="payment-heading">
               <p>Payment</p>
            </div>
            <div className="payment-text">
               <p>Are you sure you want to pay?</p>
            </div>
            <div className="payment-btns">
               <button
                  onClick={() => yesConfirmPaymentPopUp()} className="payment-yes">
                  YES
               </button>
               <button
                  onClick={() => cancelPaymentPopUp()} className="payment-cancel">
                  CANCEL
               </button>
            </div>
         </div>
      </div>
   )
}

function PaymentSuccessful({ closeConfirmPaymentPopUp }) {
   const dispatch = useDispatch();
   // USER PAYS, CART SHOULD BE CLEARED/EMPTY:
   function clearCartUponSuccessfullPayment() {
      closeConfirmPaymentPopUp();
      dispatch(clearUserCart());
   }
   return (
      <div className="payment-flex">
         <div className='success-msg-box'>
            <div className='success-icon'>
               <img src={successIcon} alt="success-icon-image" />
            </div>
            <div className="payment-text">
               <p>Payment was successful!</p>
            </div>
            <div className='close-success-msg-btn'>
               <button onClick={() => clearCartUponSuccessfullPayment()}>OK</button>
            </div>
         </div>
      </div>
   )
}

export { PaymentCard, PaymentSuccessful }