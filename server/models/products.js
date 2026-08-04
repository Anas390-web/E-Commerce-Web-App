import mongoose from "mongoose";

const productSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Product name must be provided']
   },
   rating: {
      type: Number,
      required: [true, 'Product rating must be provided']
   },
   price: {
      type: Number,
      required: [true, 'Product price must be provided']
   },
   color: {
      type: String,
      enum: {
         values: ['red', 'blue', 'green', 'yellow', 'white', 'black', 'purple', 'orange', 'pink'],
         message: '{VALUE} is not supported'
      }
   },
   category: {
      type: String,
      enum: {
         values: ['All', 'CPU', 'Mouse', 'Keyboard', 'Monitor', 'Headphone', 'Microphone'],
         message: '{VALUE} is not supported'
      },
      default: 'All'
   },
   company: {
      type: String,
      enum: {
         values: ['All companies', 'Corsair', 'Redragon', 'Bloody', 'Logitech', 'Intel', 'AMD', 'Dell', 'Samsung', 'LG', 'ASUS', 'BenQ', 'HyperX'],
         message: '{VALUE} is not supported'
      }
   },
   description: {
      type: String,
      required: [true, 'Product description must be provided.']
   },
   inStock: {
      type: Boolean,
      default: true
   },
   isShippingFree: {
      type: Boolean,
      default: false
   },
   isBestSelling: {
      type: Boolean,
      default: true
   },
   img: {
      type: String,
      required: [true, 'Product image path must be provided']
   }
})

export const Product = mongoose.model('products', productSchema);