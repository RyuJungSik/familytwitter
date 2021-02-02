import react, { useEffect, useState } from'react';
import { authService } from './fbase';
import AppRouter from './Router';

const App=()=>{
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [isInit, setIsInit]=useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
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
      {isInit ? <AppRouter isLoggedIn={isLoggedIn}/> : "Loading..."}
    </div>
  );
}

export default App;
