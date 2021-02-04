import react, { useEffect, useState } from'react';
import { authService } from './fbase';
import AppRouter from './Router';

const App=()=>{
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [isInit, setIsInit]=useState(false);
  const[userObj, setUserObj]=useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile:(args)=>user.updateProfile(args),
        });
      }
      else{
        setIsLoggedIn(false);
      }
      setIsInit(true);
    }
    )
  },[])

  const refreshUser=async()=>{
    const user=await authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile:(args)=>user.updateProfile(args),
    });
  };

  return (
    <div>
      {isInit ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}  refreshUser={ refreshUser}/> : "Loading..."}
    </div>
  );
}

export default App;
