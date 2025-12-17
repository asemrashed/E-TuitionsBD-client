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
            if(currentUser){
                const loggedUser = {email : currentUser.email}
                fetch(`${import.meta.env.VITE_API_LINK}/getToken`,{
                    method:"POST",
                    headers:{
                        'content-type':'application/json',
                        'authorization': `Bearer ${currentUser.accessToken}`
                    },
                    body: JSON.stringify(loggedUser)
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('token', data.token)
                })
                .catch(err =>{
                    console.log(err)
                })
            }else{
                localStorage.removeItem('token')
            }
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