import React from 'react'
import { useHistory } from 'react-router-dom'
import { authService } from '../fbase'

const Profile=()=>{
    const history=useHistory();
    const onClick=async()=>{
        await authService.signOut();
        history.push("/");
    }

    return (
        <div>
            <button onClick={onClick}>LogOut</button>
        </div>
    )
}

export default Profile;