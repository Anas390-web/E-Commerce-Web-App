import React from 'react'
import { Link, NavLink } from 'react-router';
import keyboard from './../../../images/Keyboard 2.jpg';
import monitor from './../../../images/Monitor (1).jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../../features/Products-List/productListSlice';

function ProductCard({product}) {
  return (
    <div className='product-card'>
      <div className='card-image'>
         <img src={`http://localhost:3000${product.img}`} alt={product.name} />
      </div>
      <div className='card-details'>
         <p id='card-product-name'>{product.name}</p>
         <p id='card-product-price'>${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard