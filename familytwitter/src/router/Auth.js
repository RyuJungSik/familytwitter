import React, { useState } from 'react'
import AuthForm from '../components/AuthForm';
import { authService, firebaseInstance } from '../fbase';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faTwitter} from "@fortawesome/free-brands-svg-icons";
import { faGrinStars, faLaugh } from '@fortawesome/free-solid-svg-icons';


const Auth = () => {
  
    const onClick=async()=>{
        let provider;
        provider=new firebaseInstance.auth.GoogleAuthProvider();
       await authService.signInWithPopup(provider)
    }


    return (
        <div className="authContainer">
            
            <FontAwesomeIcon icon={faLaugh} color={"#04AAFF"} size="3x" style={{marginBottom:30}}/>
            <AuthForm/>
            <div className="authBtns">
                <button onClick={onClick} className="authBtn" >LogIn with Google  <FontAwesomeIcon icon={faGoogle} size="1x"  color={"tomato"}/></button>
            </div>
        </div>
    )
}

export default Auth;