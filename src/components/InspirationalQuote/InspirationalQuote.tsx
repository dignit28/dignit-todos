import React from "react";
// Styles
import "./InspirationalQuote.css";
// Functions
import { fetchQuote } from "../../quoteAPI";
// Types
import { QuoteStateInterface } from "../../utility/interfaces";

const InspirationalQuote: React.FunctionComponent = () => {
  const [loading, setLoading] = React.useState<Boolean>(false);

  const [quoteData, setQuoteData] = React.useState<QuoteStateInterface>({
    author: "Aleksei Treshchalin",
    content: "I have no idea why this doesn't work.",
  });

  React.useEffect(() => {
    generateQuote();
  }, []);

  const generateQuote = async () => {
    setLoading(true);
    const newQuote: QuoteStateInterface = await fetchQuote();
    setQuoteData(newQuote);
    setLoading(false);
  };

  return (
    <div className="quote-container">
      <div>
        {loading ? (
          <p>Loading quote...</p>
        ) : (
          <div className="quote-container__quote">
            <p className="quote-container__quote-content">-{quoteData.content}</p>
            <p className="quote-container__quote-author">{quoteData.author}</p>
          </div>
        )}
      </div>
      <button className="quote-container__new-button" onClick={generateQuote}>New quote</button>
    </div>
  );
};

export default InspirationalQuote;
