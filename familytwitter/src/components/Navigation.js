import React from 'react'
import { HashRouter as Router, Link } from "react-router-dom";

const Navigation = ({userObj}) => {
    return (
        <Router>
            <div>
                <nav>

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/profile">{userObj.displayName}의 Profile</Link></li>
                    </ul>

                </nav>
            </div>
        </Router>
    )
}

export default Navigation;