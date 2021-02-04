import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authService } from '../fbase'

const Profile=({userObj,  refreshUser})=>{
    const history=useHistory();
    const [isEditing, setIsEditing]=useState(false);
    const [newProfile, setNewProfile]=useState(userObj.displayName);

    const onClick=async()=>{
        await authService.signOut();
        history.push("/");
    }

    const onChange=(event)=>{
        const{target:{value}}=event;
        setNewProfile(value);
    }

    const onSubmit=async(event)=>{
        event.preventDefault();
        await userObj.updateProfile({
            displayName:newProfile,
        });
        setIsEditing(false);
        refreshUser();
    }

    const toggleEditing=()=>setIsEditing((prev)=>!prev);

    return (
        <div>
            {
               isEditing &&( 
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="edit your profiel" value={newProfile} onChange={onChange}/>
                <input type="submit" value="Edit"/>
            </form>
            )}
            <button onClick={onClick}>LogOut</button>
            <button onClick={toggleEditing}>{isEditing ? "Cancel" : "Edit Profile"}</button>
       
        </div>
    )
}

export default Profile;