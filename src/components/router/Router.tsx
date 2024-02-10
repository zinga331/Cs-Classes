import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
// import Display1 from './Display1';
// import Display2 from './Display2';
// import Display3 from './Display3';

const Header = () => {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <ul>
                    <li>
                        <Link to="/route1">Route 1</Link>
                    </li>
                    <li>
                        <Link to="/route2">Route 2</Link>
                    </li>
                    <li>
                        <Link to="/route3">Route 3</Link>
                    </li>
                </ul>

                <hr />

                {/* <Route path="/route1" component={Display1} />
                <Route path="/route2" component={Display2} />
                <Route path="/route3" component={Display3} /> */}
            </div>
        </Router>
    );
};

export default Header;