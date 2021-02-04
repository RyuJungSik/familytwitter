import React, { useState } from 'react'
import { authService} from '../fbase';


const AuthForm=()=>{
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

    const toggleNewAccount = () => setAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input type="email" name="email" placeholder="email" value={email} onChange={onChange}  className="authInput"/>
                <input type="password" name="password" placeholder="password" value={password} onChange={onChange} className="authInput"/>
                <input type="submit" value={newAccount ? "로그인" : "등록"} className="authInput authSubmit"/>
            </form>
            <span onClick={toggleNewAccount} className="authSwitch">{newAccount ? "회원가입" : "로그인"}</span>
        </>
    )
}

export default AuthForm
