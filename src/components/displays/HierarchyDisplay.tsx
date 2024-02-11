import React, { useState, useEffect } from "react";
import { Quotes, Quote } from "../model/domain/quotes";
import { render } from "react-dom";

interface HierarchyDisplayProps {
  quotes: Quotes;
}

const HierarchyDisplay: React.FC<HierarchyDisplayProps> = ({ quotes }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
        const newFilteredQuotes = quotes.quotes.filter(
            (quote) =>
                quote.category === selectedCategory &&
                quote.subcategory === selectedSubcategory
        );
        setFilteredQuotes(newFilteredQuotes);
    }
}, [selectedCategory, selectedSubcategory, quotes]);


  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setFilteredQuotes([]);
  };

  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    console.log(subcategory + " clicked");
  };

const renderSubcategories = () => {
    if (!selectedCategory) {
        return null;
    }


    const subcategoriesList = quotes.quotes
        .filter((quote) => quote.category === selectedCategory)
        .map((quote) => quote.subcategory);

    // Create a Set to remove duplicates
    const uniqueSubcategories = Array.from(new Set(subcategoriesList));

    return (
        <div>
            {uniqueSubcategories.map((subcategory, index) => (
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
    if (!selectedCategory) {
      return null;
    }
    // iterate through filteredQuotes and display the quote and author
    for (let i = 0; i < filteredQuotes.length; i++) {
      console.log(filteredQuotes[i]);
    }


    return (
      <div>
        {filteredQuotes.map((quote, index) => (
          <div key={index}>
            <p>{quote.quote}</p>
            <p>- {quote.author}</p>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <div>
        <h2>Categories</h2>
        {Array.from(quotes.categories).map((category, index) => (
          <div key={index}>
            <button onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Subcategories</h2>
        {renderSubcategories()}
      </div>
      <div>
        <h2>Quotes</h2>
        {renderQuotes()}
      </div>
    </div>
  );
};

export default HierarchyDisplay;
