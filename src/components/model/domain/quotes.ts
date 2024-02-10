export interface Quote {
    category: string;
    subcategory: string;
    author: string;
    quote: string;
}

export interface Quotes {
    quotes: Quote[];
}