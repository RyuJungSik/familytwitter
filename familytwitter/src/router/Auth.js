import React, { useState } from 'react'
import { authService, firebaseInstance } from '../fbase';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setAccount] = useState(true);

    const onChange = (event) => {
        const { target: { value, name } } = event;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if (newAccount) {
            await authService.signInWithEmailAndPassword(email, password);
        }
        else {
            await  authService.createUserWithEmailAndPassword(email, password);
            setAccount(true);
        }
    }

    const onClick=async()=>{
        let provider;
        provider=new firebaseInstance.auth.GoogleAuthProvider();
       await authService.signInWithPopup(provider)


        
    }

    const toggleNewAccount = () => setAccount((prev) => !prev);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={onChange} />
                <input type="password" name="password" placeholder="password" value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "로그인" : "등록"} />
            </form>
            <span onClick={toggleNewAccount}>{newAccount ? "회원가입" : "로그인"}</span>
            <div>
                <button onClick={onClick} >LogIn with Google</button>
            </div>
        </div>
    )
}

export default Auth;