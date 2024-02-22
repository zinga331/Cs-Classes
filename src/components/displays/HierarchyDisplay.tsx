import { useState, useEffect } from "react";
import { Quotes, Quote } from "../model/domain/quotes";
import "./Display.css";

interface Props {
  quotes: Quotes;
}

const HierarchyDisplay = (props: Props) => {
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filteredDetails, setFilteredDetails] = useState<Quote[]>([]);

  useEffect(() => {
    if (selectedMajor && selectedCourse) {
      const newFilteredDetails = props.quotes.quotes.filter(
        (quote) =>
          quote.category === selectedMajor &&
          quote.subcategory === selectedCourse
      );
      setFilteredDetails(newFilteredDetails);
    }
  }, [selectedMajor, selectedCourse, props.quotes]);

  const handleCategoryClick = (category: string) => {
    setSelectedMajor(category);
    setSelectedCourse(null);
    setFilteredDetails([]);
  };

  const handleSubcategoryClick = (course: string) => {
    setSelectedCourse(course);
    console.log(course + " clicked");
  };

  const renderSubcategories = () => {
    if (!selectedMajor) {
      return null;
    }

    const subcategoriesList = props.quotes.quotes
      .filter((quote) => quote.category === selectedMajor)
      .map((quote) => quote.subcategory);

    // Create a Set to remove duplicates
    const uniqueCourse = Array.from(new Set(subcategoriesList));

    return (
      <div className="subcategories-container">
        <h2>CS Courses :</h2>
        {uniqueCourse.map((subcategory, index) => (
          <div key={index}>
            <button onClick={() => handleSubcategoryClick(subcategory)}>
              {subcategory}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderQuotes = () => {
    if (!selectedMajor) {
      return null;
    }
    // iterate through filteredQuotes and display the quote and author
    for (let i = 0; i < filteredDetails.length; i++) {
      console.log(filteredDetails[i]);
    }

    return (
      <div className="quotes-container">
        <h2>Course Details :</h2>
        {filteredDetails.map((quote, index) => (
          <div key={index}>
            <p>{quote.quote}</p>
            <p>- {quote.author}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="hierarchy-display-container">
      <div className="categories-container">
        <h2>CS Majors :</h2>
        {Array.from(props.quotes.categories).map((category, index) => (
          <div key={index}>
            <button onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          </div>
        ))}
      </div>
      <div className="vertical_break"></div>
      <div>{renderSubcategories()}</div>
      {selectedCourse !== null && (
        <>
          (<div className="vertical_break"></div>
          <div>{renderQuotes()}</div>)
        </>
      )}
    </div>
  );
};

export default HierarchyDisplay;
