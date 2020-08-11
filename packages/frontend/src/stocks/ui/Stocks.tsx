import React, { useEffect } from "react";
import { getStockQuote } from "../api/alphavantage";

export default function Stocks() {
  useEffect(async () => {
    console.log(await getStockQuote("AAPL"));
  });
  return <div>HelloWorld</div>;
}
