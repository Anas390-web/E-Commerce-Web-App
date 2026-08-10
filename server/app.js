import 'dotenv/config'
import express from 'express'
import connectDB from './db/connectDb.js'
import router from './routes/products.js';
import authRouter from './routes/users.js';
import cartRouter from './routes/cartItems.js';
import authentication from './middlewares/auth.js';
import cors from 'cors'
import { xss } from 'express-xss-sanitizer';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet'
import notFoundMiddlerware from './middlewares/notFound.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
   origin: process.env.REACT_ORIGIN || 'http://localhost:5173',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}
// MUST BE SET BEFORE RATE LIMITING:
app.set('trust proxy', 1);

// SECURITY:
app.use(helmet());
// ALLOW CROSS-ORIGIN ACCESS ONLY FOR PUBLIC STATIC IMAGES:
app.use(
  '/images',
  helmet.crossOriginResourcePolicy({ policy: "cross-origin" }),
  express.static('public/images')
);

app.use(cors(corsOptions));

// FOR HANDLING TOO MANY REQUESTS:
const limiter = rateLimiter({
   windowMs: 15 * 60 * 1000,
   limit: 100,
   standardHeaders: 'draft-8',
   legacyHeaders: false,
   ipv6Subnet: 56
})
app.use(limiter);

// MIDDLEWARES:
// PARSING JSON DATA:
app.use(express.json());
app.use(xss());

// ROUTES:
app.use('/api/v1/products', router);
app.use('/api/v1/users', authRouter);
app.use('/api/v1/cartProducts', authentication, cartRouter);

// ERROR HANDLERS: order of code matters and 4 argument function will be triggered for server error:
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
