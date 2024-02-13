import { useState, useEffect } from "react";
import { Quotes, Quote } from "../model/domain/quotes";

interface Props {
    quotes: Quotes;
}

const SearchDisplay = (props: Props) => {
    const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const newFilteredQuotes = props.quotes.quotes.filter((quote) =>
            quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuotes(newFilteredQuotes);
    }, [searchTerm, props.quotes]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const renderQuotes = () => {
        if (!searchTerm) {
            return null;
        }

        return (
            <div>
                <h2>Quotes</h2>
                {filteredQuotes.map((quote, index) => (
                    <div key={index}>
                        <h3> {quote.category}: {quote.subcategory}</h3>
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
                <h2>Search</h2>
                <input type="text" value={searchTerm} onChange={handleSearchChange} />
            </div>
            <div>{renderQuotes()}</div>
        </div>
    );
};

export default SearchDisplay;