import React, { useState } from 'react';
import { Quotes } from '../model/domain/quotes';


interface HierarchyDisplayProps {
    quotes: Quotes;
}

const HierarchyDisplay: React.FC<HierarchyDisplayProps> = ({ quotes }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setSelectedSubcategory(null);
    };

    const handleSubcategoryClick = (subcategory: string) => {
        setSelectedSubcategory(subcategory);
    };

    const renderQuotes = () => {
        if (!selectedCategory || !selectedSubcategory) {
            return null;
        }

        const quotesList = quotes.quotes.filter(quote => quote.category === selectedCategory && quote.subcategory === selectedSubcategory);

        return (
            <div>
                {quotesList.map((quote, index) => (
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
                    <div key={index} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </div>
                ))}
            </div>
            <div>
                <h2>Subcategories</h2>
                {Array.from(quotes.subcategories).map((subcategory, index) => (
                    <div key={index} onClick={() => handleSubcategoryClick(subcategory)}>
                        {subcategory}
                    </div>
                ))}
            </div>
            <div>
                <h2>Quotes</h2>
                {renderQuotes()}
            </div>
        </div>
    );
};

export default HierarchyDisplay;