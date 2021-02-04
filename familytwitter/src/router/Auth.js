import React, { useState } from 'react'
import AuthForm from '../components/AuthForm';
import { authService, firebaseInstance } from '../fbase';

const Auth = () => {
  
    const onClick=async()=>{
        let provider;
        provider=new firebaseInstance.auth.GoogleAuthProvider();
       await authService.signInWithPopup(provider)
    }
    return (
        <div>
            <AuthForm/>
            <div>
                <button onClick={onClick} >LogIn with Google</button>
            </div>
        </div>
    )
}

export default Auth;