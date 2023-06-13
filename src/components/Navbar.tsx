import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, Providers } from '../config/firebase'

function Navbar() {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate();

    const toggleNavVis = ():void => {
        setIsVisible(!isVisible)
    }
    const collapseNav = () => {
        setIsVisible(false)
    }

    const signOutOnClick = () => {
        signOut(auth)
        .then(() => {navigate('/')})
    }
    const signInOnClick = async () => {
        await signInWithPopup(auth, Providers.google)
        .then(() => {location.reload()})
        .catch(() => {console.log(`User closed popup`)})
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-slate-800 p-6">
            <div className="flex items-center flex-shrink-0 text-slate-200">
                <Link to="/" className="font-semibold text-xl">Car Collection</Link>
            </div>
            <div className="block">
                <button onClick={toggleNavVis} className="flex items-center px-3 py-2 text-slate-200 border rounded border-slate-400 hover:text-slate-100 hover:border-slate-200">
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>
            {
                isVisible ? (
                    <div className="w-full block flex-grow items-center mt-4 justify-items-end">
                        <div className="w-fit ms-auto me-1">
                            <Link onClick={collapseNav} to="/" className="text-slate-300 hover:text-slate-100 ms-6">Home</Link>
                            <Link onClick={collapseNav} to="/dashboard" className="text-slate-300 hover:text-slate-100 ms-6">Dashboard</Link>
                            {
                                !auth.currentUser ? (
                                    <Link onClick={() => {signInOnClick()}} to="/" className="text-slate-300 hover:text-slate-100 ms-6">Sign In</Link>
                                ) : (
                                    <Link onClick={() => {signOutOnClick()}} to="/" className="text-slate-300 hover:text-slate-100 ms-6">Sign Out</Link>
                                )
                            }
                        </div>
                    </div>
                ) : (<></>)
            }
        </nav>
    )
}

export default Navbar;