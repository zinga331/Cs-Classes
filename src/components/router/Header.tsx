import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HierarchyDisplay from "../displays/HierarchyDisplay.tsx";
import SearchDisplay from "../displays/SearchDisplay.tsx";
// import { getQuotes } from "../model/service/quoteService.ts";
import { courses } from "../model/service/courseService.ts";
import "./Header.css";

const Header = () => {
  return (
    <Router>
      <div className="header">
        <ul className="header_ul">
          <li className="header_li">
            <h2 className="byu_title">BYU</h2>
          </li>
          <li className="header_li">
            <h2 className="vertical_break_header"></h2>
          </li>
          <li className="header_li">
            <h2 className="catalog_title">Computer Science Course Catalog</h2>
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
