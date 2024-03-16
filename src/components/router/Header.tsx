import { HashRouter as Router, Route, Link, Routes } from "react-router-dom";
import HierarchyDisplay from "../displays/HierarchyDisplay.tsx";
import SearchDisplay from "../displays/SearchDisplay.tsx";
// import { getQuotes } from "../model/service/quoteService.ts";
import { courses } from "../model/service/courseService.ts";
import "./Header.css";

const Header = () => {
  const handleSearch = () => {
    //TODO: Navigate to search here
  };

  return (
    <Router>
      <div className="header">
        <ul>
          <li>
            <img className="cs_logo" src="/cs_logo.png" alt="cs_logo" />
          </li>
          <li>
            <Link className="header_courses" to="/hierchy">
              CS Course Catalog
            </Link>
          </li>
          <li className="header_search">
            <input
              className="search_type"
              type="text"
              placeholder="Search Catalog..."
            />
            <button type="submit" onClick={handleSearch}>
              Submit
            </button>
          </li>
        </ul>

        <Routes>
          <Route
            path="/hierchy"
            element={<HierarchyDisplay courses={courses} />}
          />
          <Route
            path="/SearchDisplay"
            element={<SearchDisplay courses={courses} />}
          />
          {/* Set the default route to be hierarchy. */}
          <Route path="/" element={<HierarchyDisplay courses={courses} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Header;
