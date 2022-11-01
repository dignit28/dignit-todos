// Types
import { QuoteStateInterface } from "./utility/interfaces";

export const fetchQuote = async (): Promise<QuoteStateInterface> => {
  const endpoint = "https://api.quotable.io/random?tags=inspirational";
  const quoteData = await (await fetch(endpoint)).json();
  return { author: quoteData.author, content: quoteData.content };
};
