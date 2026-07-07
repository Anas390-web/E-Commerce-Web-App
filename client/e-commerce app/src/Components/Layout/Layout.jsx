import { Outlet } from 'react-router'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'

export default function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}