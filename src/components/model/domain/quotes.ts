export interface Quote {
    category: string;
    subcategory: string;
    author: string;
    quote: string;
    id: number;
}

export interface Quotes {
    quotes: Quote[];
    categories: Set<string>;
    subcategories: Set<string>;
}