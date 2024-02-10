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

        const quotesList = quotes.categories[selectedCategory][selectedSubcategory];

        return (
            <div>
                {quotesList.map((quote, index) => (
                    <div key={index}>
                        <p>{quote}</p>
                        <p>- Author</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Categories</h2>
            {Object.keys(quotes.categories).map((category) => (
                <div key={category}>
                    <h3>{category}</h3>
                    {Object.keys(quotes.categories[category]).map((subcategory) => (
                        <div key={subcategory}>
                            <button onClick={() => handleCategoryClick(category)}>{subcategory}</button>
                            {selectedCategory === category && selectedSubcategory === subcategory && (
                                <div>
                                    <h4>Quotes</h4>
                                    {renderQuotes()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default HierarchyDisplay;