import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
import HierarchyDisplay from "../displays/HierarchyDisplay.tsx";
import BulkDisplay from "../displays/BulkDisplay.tsx";
import SearchDisplay from "../displays/SearchDisplay.tsx";
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
                        <Link to="/BulkDisplay">Bulk</Link>
                    </li>
                    <li>
                        <Link to="/SearchDisplay">Searchable</Link>
                    </li>
                </ul>

                <hr />

                <Routes>
                    <Route path="/hierchy" element={<HierarchyDisplay quotes={getQuotes()} />} /> 
                    <Route path="/BulkDisplay" element={<BulkDisplay quotes={getQuotes()} />} />   
                    <Route path="/SearchDisplay" element={<SearchDisplay quotes={getQuotes()} />} />             
                </Routes>
            </div>
        </Router>
    );
};

export default Header;