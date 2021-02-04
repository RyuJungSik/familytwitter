import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Auth from './router/Auth';
import Home from './router/Home';
import Profile from './router/Profile';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <div>
            <Router>
                {isLoggedIn ? (
                    <>
                        <Navigation userObj={userObj} />
                        <Switch>
                            <div style={{
                                maxWidth: 890,
                                width: "100%",
                                margin: "0 auto",
                                marginTop: 80,
                                display: "flex",
                                justifyContent: "center",
                            }}
                            >
                                <Route exact path="/"><Home userObj={userObj} /></Route>
                                <Route exact path="/profile"><Profile refreshUser={refreshUser} userObj={userObj} /></Route>
                            </div>
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