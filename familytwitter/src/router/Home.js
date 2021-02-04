import React, { useEffect, useRef, useState } from 'react'
import Nweet from '../components/Nweet';
import { dbService, firebaseInstance } from '../fbase';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState("");
    const fileInput=useRef();

    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),

            }));
            setNweets(nweetArray);
        });
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            uid: userObj.uid
        })
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

    const onClearAttachment=()=>{
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
                {
                    nweets.map((nweet) => (
                        <div key={nweet.id}>
                            <Nweet nweetObj={nweet} nweetId={nweet.id} userObj={userObj} />
                        </div>
                    ))
                }
        </div >
    )
    
}

export default Home;