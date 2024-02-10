import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
import HierarchyDisplay from "../displays/HierarchyDisplay.tsx";
import { getQuotes } from "../model/service/quoteService.ts";

const Header = () => {
    return (
        <Router>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <ul>
                    <li>
                        <Link to="/hierchy">Hierarchical</Link>
                    </li>
                    <li>
                        <Link to="/route2">Route 2</Link>
                    </li>
                    <li>
                        <Link to="/route3">Route 3</Link>
                    </li>
                </ul>

                <hr />

                <Routes>
                    <Route path="/hierchy" element={<HierarchyDisplay quotes={getQuotes()} />} />                
                    {/* <Route path="/route2" Component={Display2} />
                    <Route path="/route3" Component={Display3} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default Header;