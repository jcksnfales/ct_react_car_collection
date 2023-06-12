import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import {auth, Providers} from '../config/firebase'

interface Props {
    children: React.ReactNode
}

const AuthChecker = ({children}:Props) => {
    const navigate = useNavigate()
    // Checks if user is logged in; if so, returns the children (which are passed as props - it's just whatever component is either protected or not)
    // Otherwise, sends them to the login route
    useEffect(() => {
        if (!auth.currentUser) {
            navigate("../")
            signInWithPopup(auth, Providers.google)
        }
    }, []) // <--- REMEMBER TO USE THIS EMPTY ARRAY TO AVOID THIS COMPONENT RUNNING REPEATEDLY
    
    return (
        <>{children}</>
    )
}

export default AuthChecker