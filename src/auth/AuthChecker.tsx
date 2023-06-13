import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, Providers } from '../config/firebase';

interface Props {
    children: React.ReactNode;
}

const AuthChecker =({ children }: Props) => {
    const navigate = useNavigate();

    const signInOnClick = async () => {
        await signInWithPopup(auth, Providers.google)
        .then(() => {navigate('/dashboard')})
    }
    
    useEffect(() => {
        const auth_state = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/');
                signInOnClick()
            }
        });
        return () => auth_state();
    }, [auth, navigate]);

    return (<>{children}</>)
}

export default AuthChecker