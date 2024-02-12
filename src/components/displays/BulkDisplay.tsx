import { useState, useEffect } from "react";
import { Quotes, Quote } from "../model/domain/quotes";

interface Props {
  quotes: Quotes;
}

const BulkDisplay = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    if (selectedCategory) {
      // Filter quotes based on the selected category
      const filtered = props.quotes.quotes.filter(
        (quote) => quote.category === selectedCategory
      );
      setFilteredQuotes(filtered);
    }
  }, [selectedCategory, props.quotes.quotes]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setFilteredQuotes([]);
  };

  const renderSubcategoriesAndQuotes = () => {
    if (!selectedCategory) {
      return null;
    }
  
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
        <div key={subcategory}>
          <h3>{subcategory}</h3>
          {quotesInSubcategory.map((quote) => (
            <p key={quote.id}>
              {quote.quote} - {quote.author}
            </p>
          ))}
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
      <div>{renderSubcategoriesAndQuotes()}</div>
    </div>
  );
};

export default BulkDisplay;
