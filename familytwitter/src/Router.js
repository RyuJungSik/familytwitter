import React from 'react';
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navigation from './components/Navigation';
import Auth from './router/Auth';
import Home from './router/Home';
import Profile from './router/Profile';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <div>
            <Router>
                {isLoggedIn ? (
                    <>
                        <Navigation/>
                        <Switch>
                            <Route exact path="/"><Home /></Route>
                            <Route exact path="/profile"><Profile /></Route>
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