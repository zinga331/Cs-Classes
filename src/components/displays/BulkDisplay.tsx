import { useState, useEffect } from "react";
import { Quotes, Quote } from "../model/domain/quotes";
// import { Card, CardContent, Typography } from '@material-ui/core';


interface Props {
  quotes: Quotes;
}

const BulkDisplay = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [activeIndex, setActiveIndex] = useState(0); // Add activeIndex state

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      const newFilteredQuotes = props.quotes.quotes.filter(
        (quote) =>
          quote.category === selectedCategory &&
          quote.subcategory === selectedSubcategory
      );
      setFilteredQuotes(newFilteredQuotes);
    }
  }, [selectedCategory, selectedSubcategory, props.quotes]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(null);
    setFilteredQuotes([]);
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubcategory(event.target.value);
    console.log(event.target.value + " clicked");
  };


  const renderSubcategoriesAndQuotes = () => {
    if (!selectedCategory) {
      return null;
    }

    // Filter quotes based on the selected category
    const filteredQuotes = props.quotes.quotes.filter(
      (quote) => quote.category === selectedCategory
    );

    // Get unique subcategories
    const subcategories = Array.from(
      new Set(filteredQuotes.map((quote) => quote.subcategory))
    );

    return subcategories.map((subcategory) => {
      // Filter quotes based on the current subcategory
      const quotesInSubcategory = filteredQuotes.filter(
        (quote) => quote.subcategory === subcategory
      );

      return (
        <div>
          <div key={subcategory}>
            <h3>{subcategory}</h3>
            {quotesInSubcategory.map((quote) => (
              <p key={quote.id}>
                {quote.quote} - {quote.author}
              </p>
            ))}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        <h2>Categories</h2>
        <select onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {Array.from(props.quotes.categories).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        {renderSubcategoriesAndQuotes()}
      </div>
    </div>
  );
};

export default BulkDisplay;
