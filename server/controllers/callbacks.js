import { Product } from '../models/products.js'

export const getAllProducts = async (req, res, next) => {
   try {
      const products = await Product.find({})
      res.status(200).json({ products })
   } catch (error) {
      console.log(error);
      next(error)
   }
}

export const getFilteredOrAllProducts = async (req, res) => {
   try {
      const { name, category, company, numericFilters, color, isShippingFree } = req.query;
      // console.log(req.query);

      let queryObject = {}

      // SEARCH CATEGORY:
      if (name) {
         const regEx = { $regex: name, $options: 'i' }
         queryObject.name = regEx;
      }
      // CATEGORY FILTER:
      if (category) {
         queryObject.category = category;
      }
      // COMPANY FILTER:
      if (company) {
         queryObject.company = company;
      }
      // FREE SHIPPING FILTER:
      if (isShippingFree) {
         queryObject.isShippingFree = isShippingFree === 'true' ? true : false;
      }
      // COLORS FILTER:
      if(color) {
         queryObject.color = color;
      }
      // PRICE FILTER:
      let operators = {
         ">": "$gt",
         ">=": "$gte",
         "=": "$eq",
         "<": "$lt",
         "<=": "$lte"
      }

      let regEx = /\b(<|>|>=|=|<|<=)\b/g;

      
      const options = ["price", "rating"]
      
      if (numericFilters) {
         let filters = numericFilters.replace(regEx, (match) => `-${operators[match]}-`);

         filters.split(",").forEach((filter) => {
            let [field, operator, value] = filter.split("-");
            if (options.includes(field)) {
               queryObject[field] = { [operator]: Number(value) }
            }
         })
      }
      let result = Product.find(queryObject);
      const products = await result;
      // GET ALL PRODUCTS IF QUERY OBJECT IS EMPTY SO A DEFAULT BEHAVIOUR
      res.status(200).json({ nbHits: products.length, products })

   } catch (error) {
      console.log(error);
   }
}