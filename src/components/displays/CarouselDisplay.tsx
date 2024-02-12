import { useState, useEffect } from "react";
import { Quotes, Quote } from "../model/domain/quotes";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";

interface Props {
  quotes: Quotes;
}

const CarouselDisplay = (props: Props) => {
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

  const renderSubcategories = () => {
    if (!selectedCategory) {
      return null;
    }

    const subcategoriesList = props.quotes.quotes
      .filter((quote) => quote.category === selectedCategory)
      .map((quote) => quote.subcategory);

    // Create a Set to remove duplicates
    const uniqueSubcategories = Array.from(new Set(subcategoriesList));

 

    return (
      <div>
        <select onChange={handleSubcategoryChange}>
          <option value="">Select Subcategory</option>
          {uniqueSubcategories.map((subcategory, index) => (
            <option key={index} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const handleSlideChange = (nextIndex: number) => {
    setActiveIndex(nextIndex);
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
        <h2>Subcategories</h2>
        {renderSubcategories()}
      </div>
      <div>
        <h2>Quotes</h2>
        <Carousel activeIndex={activeIndex} onSelect={handleSlideChange}> {/* Add activeIndex and handleSlideChange */}
          {filteredQuotes.map((quote) => (
            <CarouselItem key={quote.id}> 
              <Carousel.Caption>
                <h3>{quote.author}</h3>
                <p>{quote.quote}</p>
              </Carousel.Caption>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselDisplay;
