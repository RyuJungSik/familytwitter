import React, { useEffect, useRef, useState } from 'react'
import Nweet from '../components/Nweet';
import { dbService, firebaseInstance, storageService } from '../fbase';

import NweetFactory from '../components/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([])

    useEffect(() => {
        dbService.collection("nweets").orderBy("createAt", 'desc').onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),

            }));
            setNweets(nweetArray);
        });
    }, [])

    return (
        <div>
            <NweetFactory userObj={userObj} />
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