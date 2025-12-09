import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const userSignUp = ({ email, password }) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserInfo = ({ userInfo }) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
            .finally(() => setLoading(false));
    }

    const userSignIn = ({ email, password }) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userSignInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unmount = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=> {
            unmount()
        }
    }, [])

    const userSignOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const authInfo = {
        user,
        loading,
        setLoading,
        userSignUp,
        updateUserInfo,
        userSignIn,
        userSignInWithGoogle,
        userSignOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;