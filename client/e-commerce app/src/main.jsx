import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './Components/Layout/Layout.jsx'
import About from './pages/About/About.jsx'
import Home from './pages/Home/Home.jsx'
import Products from './pages/Products/Products.jsx'
import Cart from './pages/Cart/Cart.jsx'
import ContactUs from './pages/Contact/ContactUs.jsx'
import { Provider } from 'react-redux'
import { store } from '../store.js'
import ProductItem from './pages/ProductItem/ProductItem.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/cart' element={<Cart />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/products/:productId' element={<ProductItem />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
