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
    <div>
      <div>
        {loading ? (
          <p>Loading quote...</p>
        ) : (
          <>
            <p>-{quoteData.content}</p>
            <p>{quoteData.author}</p>
          </>
        )}
      </div>
      <button onClick={generateQuote}>New quote</button>
    </div>
  );
};

export default InspirationalQuote;
