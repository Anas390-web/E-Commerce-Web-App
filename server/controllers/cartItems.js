import Cart from "../models/Cart.js";
import { StatusCodes } from 'http-status-codes';
import { Product } from '../models/products.js'

const getUserCart = async (req, res) => {
   const { userId, username } = req.user;
   const cart = await Cart.findOne({ storedBy: userId });
   if (!cart) {
      return res.status(StatusCodes.NOT_FOUND).json({
         cart: { items: [] }
      })
   }
   await cart.populate({
      path: 'items.product',
      select: 'name inStock price img'
   })
   res.status(StatusCodes.OK).json({
      cart: cart
   })
}

const createAndUpdateProduct = async (req, res) => {
   try {
      // ACCESSING THE USERID FROM AUTH & PRODUCTID, QUANTITY FROM REQ.BODY
      const {
         user: { userId },
         body: { product, quantity }
      } = req;
      // FINDING THE USER CART WITH USERID:
      let cart = await Cart.findOne({ storedBy: userId });
      // IF USER CART EXISTS, FIND THE SPECIFIC PRODUCT INDEX WHICH YOU WANT TO UPDATE AS THERE CAN BE MANY PRODUCTS:
      if (cart) {
         const itemIndex = cart.items.findIndex((item) => {
            return item.product.toString() === product;
         })
         // IF PRODUCT EXISTS, INCREASE/DECREASE THE QUANITY:
         if (itemIndex > -1) {
            if (Number(quantity) <= 0) {
               return res.status(400).json({ message: "Quantity cannot be less than 1" });
            }
            cart.items[itemIndex].quantity = Number(quantity);
            // IF PRODUCT DOES NOT EXIST, PUSH THE PRODUCT AS AN OBJECT INTO THE ITEMS ARRAY:
         } else {
            cart.items.push({ product, quantity })
         }
         // TRACKS CHANGES IN THE SERVER AND SAVES IN MONGODB COLLECTION DOCUMENT:
         await cart.save();
         // IF USER CART DOES NOT EXIST, CREATE THE NEW CART WITH THE USERID AND THE PRODUCT(s)
      } else {
         cart = await Cart.create(
            {
               items: [{ product, quantity }],
               storedBy: userId
            })
      }
      // ADD THE ADDITIONAL PROPERTIES FROM THE PRODUCT(SCHEMA) TO THE USER CART:
      await cart.populate({
         path: 'items.product',
         select: 'name inStock price img'
      })
      // RESPOND WITH THE CART
      return res.status(StatusCodes.OK).json({ cart })
   } catch (error) {
      // SEND BACK ERROR IF ANYTHING FAILS
      console.log(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
         msg: 'Failed to update cart',
         error: error.message
      })
   }
}

const deleteProduct = async (req, res) => {
   try {
      const {
         user: { userId },
         params: { productId }
      } = req;
      let cart = await Cart.findOne({ storedBy: userId });
      // IF CART DOES NOT EXIST, SEND BACK ERROR:
      if (!cart) {
         return res.status(StatusCodes.NOT_FOUND).json({ message: 'Cart not found' });
      }
      // REMOVE THE PRODUCT BY FILTERING THE PRODUCTS WHICH DOES NOT MATCH THE PRODUCT ID:
      const items = await cart.items.filter((item) => {
         return item.product.toString() !== productId
      })
      cart.items = items;
      // SAVE THE CART TO DB:
      await cart.save();
      // POPULATE THE DETAILS FOR CART PRODUCT TO SHOW ON FRONTEND:
      await cart.populate({
         path: 'items.product',
         select: 'name price img'
      });
      // SEND BACK THE CART:
      res.status(StatusCodes.OK).json({
         cart: cart,
      })
   } catch (error) {
      console.log(error.message)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
   }
}

const clearUserCart = async (req, res) => {
   // EXTRACT USER ID FROM JWT FROM AUTHENTICATION:
   const {
      user: { userId }
   } = req;
   // FIND USER CART BY USER ID:
   const userCart = await Cart.findOne({ storedBy: userId });
   // IF USER CART ITEMS DO NOT EXIST, RETURN UNAUTHORIZED STATUS:
   if (userCart.items.length === 0) {
      return res.status(StatusCodes.OK).json({
         msg: 'Unauthorized to this route'
      })
   }
   // IF USER CART ITEMS EXIST: EMPTY THE CART
   userCart.items = [];
   // SAVE THE USERCART IN THE DB"
   await userCart.save();
   // SEND BACK THE EMPTY CART TO USER:
   res.status(StatusCodes.OK).json({
      msg: 'The cart is empty',
      // OPTIONAL CHAINING AND NULLISH COALESCING TO AVOID NULL AND UNDEFINED ERRORS
      cartItems: userCart?.items ?? [],
      total: userCart?.items?.length ?? 0
   })
}

export { getUserCart, createAndUpdateProduct, deleteProduct, clearUserCart }