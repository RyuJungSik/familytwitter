import React, { useState } from 'react'
import { dbService, storageService } from '../fbase';

const Nweet = ({ nweetObj, nweetId, userObj }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newNweet, setNewNweet]=useState(nweetObj.text);

    const onDeleteClick = async() => {
        let ok = window.confirm("Delete?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
           
            if(nweetObj.attachmentUrl!==""){
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
            }
        }
    }


    const onChange=(event)=>{
        const{target:{value}}=event;
        setNewNweet(value);
    }

    const onSubmit=async(event)=>{
        event.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet,
        });
        setIsEditing(false);
       
    }
    


    const toggleEditing = () => setIsEditing((prev) => !prev);
    return (
        <div>

           {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
            <h4>{nweetObj.text}</h4>


            {   isEditing && (
                <form onSubmit={onSubmit}>
                    <input type="text" value={newNweet} onChange={onChange} required />
                    <input type="submit" value="Edit" />
                </form>
            )}


            {userObj.uid === nweetObj.uid &&
                (
                    <>
                        <button onClick={onDeleteClick}>Delete</button>
                        <button onClick={toggleEditing}>{isEditing ? "Cancel" : "Edit"}</button>
                    </>
                )
            }
        </div>
    )
}

export default Nweet;