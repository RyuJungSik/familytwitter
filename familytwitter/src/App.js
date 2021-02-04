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
        setUserObj(user);
      }
      else{
        setIsLoggedIn(false);
      }
      setIsInit(true);
    }
    )
  },[])

  return (
    <div>
      {isInit ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Loading..."}
    </div>
  );
}

export default App;
