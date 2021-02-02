import React from 'react'
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Router>
            <div>
                <nav>

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>

                </nav>
            </div>
        </Router>
    )
}

export default Navigation;