import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authService } from '../fbase'

const Profile = ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [isEditing, setIsEditing] = useState(false);
    const [newProfile, setNewProfile] = useState(userObj.displayName);

    const onClick = async () => {
        await authService.signOut();
        history.push("/");
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setNewProfile(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await userObj.updateProfile({
            displayName: newProfile,
        });
        setIsEditing(false);
        refreshUser();
    }

    const toggleEditing = () => setIsEditing((prev) => !prev);

    return (
        <div className="container">
            {
                isEditing && (
                    <form onSubmit={onSubmit} className="profileForm">
                        <input type="text" placeholder="edit your profiel" value={newProfile} onChange={onChange} autoFocus className="fromInput"/>
                        <input type="submit" value="Edit" className="formBtn" style={{marginTop :10,}}/>
                    </form>
                )}
            <div className="profile__spans">
            <span onClick={onClick} className="formBtn cancelBtn logOut">LogOut</span>
            <span onClick={toggleEditing }  className="formBtn cancelBtn logOut">{isEditing ? "Cancel" : "Edit Name"}</span>
            </div>
        </div>
    )
}

export default Profile;