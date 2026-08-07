import mongoose from 'mongoose'

// USER CART ITEMS:
const CartSchema = new mongoose.Schema({
   items: [
      {
         product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
         },
         quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            default: 1,
            min: [1, 'Quantity cannot be less than 1']
         }
      }
   ],
   storedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
      unique: true
   }
}, { timestamps: true })

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;