import React, { useState } from 'react'
import { dbService, storageService } from '../fbase';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";


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
        <div className="nweet">

           {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            <div className="nweet_box">
            <h4>{nweetObj.text}</h4>
            <span>작성자 : {nweetObj.userName}</span>
            </div>
            {   isEditing && (
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input type="text" value={newNweet} onChange={onChange} required  autoFocus className="formInput" maxLength="11"/>
                    <input type="submit" value="Edit" className="formBtn" />
                </form>
            )}


            {userObj.uid === nweetObj.uid &&
                (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} size="1x"/></span>
                        <span  onClick={toggleEditing}>{isEditing ? "Cancel" : (<FontAwesomeIcon icon={faPencilAlt} size="1x"/>)}</span>
                    </div>
                )
            }
        </div>
    )
}

export default Nweet;