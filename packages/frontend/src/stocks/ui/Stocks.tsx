import React, { useEffect, useState } from "react";
import { getStockQuote } from "../api/alphavantage";

export default function Stocks() {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    getStockQuote("MSFT").then((quote) => setQuote(JSON.stringify(quote)));
  });
  return <div>{quote}</div>;
}
