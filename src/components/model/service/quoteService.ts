// quoteService.ts
import quotes from '../quoteList.json';
import { Quotes, Quote } from '../domain/quotes';

export function getQuotes() {
    const quoteList: Quotes = quotes;
    // iterate through the quotes from quoteList.json and return them as a Quotes object
    for (let i = 0; i < quotes.quotes.length; i++) {
        console.log(quotes.quotes[i]);
    }
    return quoteList;
}