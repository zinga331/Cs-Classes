// quoteService.ts
import quotes from '../quoteList.json';
import { Quotes, Quote } from '../domain/quotes';

export function getQuotes() {
    // iterate through the quotes from quoteList.json and create a new Quotes object
    const quotesList: Quotes = {
        quotes: quotes.quotes.map((quote: any) => {
            return {
                author: quote.author,
                quote: quote.quote,
                category: quote.category,
                subcategory: quote.subcategory,
            } as Quote;
        }),
        categories: new Set(quotes.quotes.map((quote: any) => quote.category)),
        subcategories: new Set(quotes.quotes.map((quote: any) => quote.subcategory)),
    };
    console.log(quotesList);
    return quotesList;
}