// ADDING DATA TO OUR DATABASE:
import 'dotenv/config'
import connectDB from './db/connectDb.js'
import { Product } from './models/products.js'
import jsonProducts from './products.json' with {type: 'json'}

const start = async () => {
   try {
      await connectDB(process.env.MONGODB_URI);
      console.log('Connected to DB');
      await Product.deleteMany();
      await Product.create(jsonProducts);
      console.log('Success!!!');
      process.exit();
   } catch (error) {
      console.log(error);
   }
}

start();