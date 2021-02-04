import React, { useRef, useState } from 'react'
import { dbService, storageService } from '../fbase';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");

    const [attachment, setAttachment] = useState("");
    const fileInput = useRef();


    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }


    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment) {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            uid: userObj.uid,
            attachmentUrl: attachmentUrl,
        });

        setNweet("")
        setAttachment("");
        fileInput.current.value = "";
    }

    const onImgChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {

            const { target: { result } } = finishedEvent;
            setAttachment(result);
        }

    }

    const onClearAttachment = () => {
        setAttachment("")
        fileInput.current.value = "";
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" maxLength="140" placeholder="Text your mind" required onChange={onChange} value={nweet} />
                <input type="file" accept="image/*" ref={fileInput} onChange={onImgChange} />
                <input type="submit" value="post " />
            </form>

            {attachment &&
                (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear Photo</button>
                    </div>
                )
            }
        </div>
    )
}
export default NweetFactory;