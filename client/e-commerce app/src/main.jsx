import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './Components/Layout/Layout.jsx'
import About from './pages/About/About.jsx'
import Home from './pages/Home/Home.jsx'
import Products from './pages/Products/Products.jsx'
import Cart from './pages/Cart/Cart.jsx'
import { Provider } from 'react-redux'
import { store } from '../store.js'
import ProductItem from './pages/ProductItem/ProductItem.jsx'
import SignUp from './pages/Register-Login/SignUp.jsx'
import AuthLayout from './Components/Auth-Layout/Auth-Layout.jsx'
import Login from './pages/Register-Login/Login.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products/:productId' element={<ProductItem />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path='/register' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
