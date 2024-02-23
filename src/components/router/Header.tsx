import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
import HierarchyDisplay from "../displays/HierarchyDisplay.tsx";
import SearchDisplay from "../displays/SearchDisplay.tsx";
import { getQuotes } from "../model/service/quoteService.ts";
import { courses } from "../model/service/quoteService.ts";
import "./Header.css";

const Header = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/hierchy">BYU CS Majors</Link>
          </li>
          <li>
            <Link to="/SearchDisplay">Search</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/hierchy"
            element={<HierarchyDisplay courses={courses} />}
          />
          <Route
            path="/SearchDisplay"
            element={<SearchDisplay quotes={getQuotes()} />}
          />
        </Routes>
      </div>

    </Router>
  );
};

export default Header;
