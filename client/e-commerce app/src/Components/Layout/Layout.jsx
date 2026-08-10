import { Outlet } from 'react-router'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { useEffect } from 'react';
import { getUserCart } from '../../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { fetchUserDetails } from '../../features/Authentication/authSlice';

export default function Layout() {
    const dispatch = useDispatch();
    // TO DISPLAY USERNAME =  CART ITEMS UPON RE-LOADING PAGE:
    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        if(token) {
            dispatch(fetchUserDetails());
            dispatch(getUserCart());
        }
    }, [])
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}