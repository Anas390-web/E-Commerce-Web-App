import 'dotenv/config'
import express from 'express'
import connectDB from './db/connectDb.js'
import router from './routes/products.js';
import cors from 'cors'
import notFoundMiddlerware from './middlewares/notFound.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

// MIDDLEWARES:
// PARSING JSON DATA:
app.use(express.json());
app.use(cors({origin: process.env.REACT_ORIGIN}))
app.use(express.static('public'));

// routes:
app.use('/api/v1/products', router);

// error Handlers: order of code matters and 4 argument function will be triggered for server error:
app.use(notFoundMiddlerware);
app.use(errorHandlerMiddleware);

// CONNECTION TO DB:
const start = async () => {
   try {
      await connectDB(process.env.MONGODB_URI);
      console.log('CONNECTED TO DB SUCCESSFULLY');
      app.listen(port, () => {
         console.log(`Server is listening to port ${port}...`);
      })
   } catch (error) {
      console.log('DB CONNECTION FAILED', error);
   }
}

start();
