import axios from "axios";
import { type MarketResponse } from "@/types";

export const getMarketData = async () => {
  const response = await axios.get(
    "https://www.predictit.org/api/marketdata/all/",
  );
  const data = response.data as MarketResponse;
  return data.markets;
};
