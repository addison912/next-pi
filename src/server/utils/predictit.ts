import axios from "axios";
import {
  type OrderBookResponse,
  type MarketResponse,
  type ContractResponse,
  type Contract,
  type FullContractData,
} from "@/types";

const getOrderBookContracts = async () => {
  const res = await axios.get(
    `https://predictit-f497e.firebaseio.com/contractOrderBook.json`,
  );
  const data = res.data as OrderBookResponse;
  return data;
};

const getMarkets = async () => {
  const res = await axios.get("https://www.predictit.org/api/marketdata/all/");
  const data = res.data as MarketResponse;
  return data.markets;
};

const getContracts = async (id: string) => {
  const constracts = await axios
    .get(`https://www.predictit.org/api/Market/${id}/Contracts`)
    .then((res) => {
      return res.data as ContractResponse;
    });
  return constracts;
};

const getContractData = async (id: string) => {
  const contracts = await getContracts(id);
  const orderBookContracts = await getOrderBookContracts();
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

export { getContractData, getMarkets, getContracts };
