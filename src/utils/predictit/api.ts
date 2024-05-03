import axios from "axios";
import {
  type OrderBookResponse,
  type MarketResponse,
  type ContractResponse,
  type Contract,
  type FullContractData,
  type PredictitAuth,
  type MarketDetails,
  type MarketWithNegRisk,
} from "@/types";
import { logger } from "@/utils/logger";
import { calcNegRisk } from "@/utils/predictit/risk";

const baseUrl = "https://www.predictit.org";

const login = async (email: string, password: string) => {
  const body = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
    password,
  )}&grant_type=password&rememberMe=false`;

  console.log(body);
  const data = await axios
    .post(`${baseUrl}/api/Account/token`, body, {
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data as PredictitAuth;
    });
  return data;
};

const getOrderBookContracts = async () => {
  const res = await axios.get(
    `https://predictit-f497e.firebaseio.com/contractOrderBook.json`,
  );
  const data = res.data as OrderBookResponse;
  return data;
};

const getMarkets = async () => {
  const res = await axios.get(`${baseUrl}/api/marketdata/all/`).catch((err) => {
    logger.error(err);
  });
  if (!res) {
    return [];
  }
  const data = res.data as MarketResponse;
  return data.markets;
};

const getMarketDetails = async (id: string) => {
  const res = await axios.get(`${baseUrl}/api/Market/${id}`);
  return res.data as MarketDetails;
};

const getContracts = async (id: string) => {
  const constracts = await axios
    .get(`${baseUrl}/api/Market/${id}/Contracts`)
    .then((res) => {
      return res.data as ContractResponse;
    })
    .catch((err) => {
      logger.error(err);
      return [];
    });
  return constracts;
};

const getContractData = async (id: string) => {
  const contracts = await getContracts(id);
  const orderBookContracts = await getOrderBookContracts();
  if (
    !contracts ||
    !orderBookContracts ||
    contracts.length === 0 ||
    Object.keys(orderBookContracts).length === 0
  ) {
    return [];
  }
  const marketContracts: FullContractData[] = [];
  contracts.forEach((contract: Contract) => {
    const contractData = orderBookContracts[contract.contractId];
    const fullContractData = {
      ...contract,
      orders: { ...contractData },
    } as FullContractData;
    marketContracts.push(fullContractData);
  });
  return marketContracts;
};

const getProfitableMarkets = async () => {
  const markets = await getMarkets();
  const profitableMarkets: MarketWithNegRisk[] = [];
  markets.forEach((market) => {
    if (market.contracts.length > 1) {
      const negRisk = calcNegRisk(market.contracts)!;
      if (negRisk.minWin > 0) {
        const marketWithNegRisk = { ...market, negRisk };
        profitableMarkets.push(marketWithNegRisk);
      }
    }
  });
  return profitableMarkets;
};

export {
  getContractData,
  getMarkets,
  getMarketDetails,
  getContracts,
  login,
  getProfitableMarkets,
};
