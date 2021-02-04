import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Auth from './router/Auth';
import Home from './router/Home';
import Profile from './router/Profile';

const AppRouter = ({ isLoggedIn, userObj,  refreshUser }) => {
    return (
        <div>
            <Router>
                {isLoggedIn ? (
                    <>
                        <Navigation userObj={userObj}/>
                        <Switch>
                            <Route exact path="/"><Home userObj={userObj}/></Route>
                            <Route exact path="/profile"><Profile refreshUser={ refreshUser}  userObj={userObj} /></Route>
                        </Switch>

                    </>
                ) : (
                        <>
                            <Switch>
                                <Route exact path="/"><Auth /></Route>
                            </Switch>

                        </>
                    )}
            </Router>
        </div>
    )
}

export default AppRouter;