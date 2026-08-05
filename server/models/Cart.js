import mongoose from 'mongoose'

const CartSchema = ({
   items: [
      {
         product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
         },
         quanity: {
            type: Number,
            required: [true, 'Quantity is required'],
            default: 1,
            min: 1
         }
      }
   ],
   storedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user id'],
      unique: true
   }
}, { timeStamps: true })

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;