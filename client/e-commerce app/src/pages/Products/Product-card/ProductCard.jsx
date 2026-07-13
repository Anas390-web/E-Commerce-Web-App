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
         <img src={product.image} alt="" />
      </div>
      <div className='card-details'>
         <p>{product.title}</p>
         <p>${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard