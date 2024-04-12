type MarketContract = {
  id: number;
  dateEnd: string;
  image: string;
  name: string;
  shortName: string;
  status: string;
  lastTradePrice: number;
  bestBuyYesCost: number;
  bestBuyNoCost: number;
  bestSellYesCost: number;
  bestSellNoCost: number;
  lastClosePrice: number;
  displayOrder: number;
};

export interface Market {
  id: number;
  name: string;
  shortName: string;
  image: string;
  url: string;
  contracts: MarketContract[];
  timestamp: string;
  status: string;
}

export interface MarketResponse {
  markets: Market[];
}

export interface ContractResponse {
  contractId: number;
  contractName: string;
  marketId: number;
  marketName: string;
  contractImageUrl: string;
  contractImageSmallUrl: string;
  isActive: boolean;
  isOpen: boolean;
  lastTradePrice: number;
  lastClosePrice: number;
  bestYesPrice: number;
  bestYesQuantity: number;
  bestNoPrice: number;
  bestNoQuantity: number;
  userPrediction: number;
  userQuantity: number;
  userOpenOrdersBuyQuantity: number;
  userOpenOrdersSellQuantity: number;
  userAveragePricePerShare: number;
  isTradingSuspended: boolean;
  dateOpened: string;
  hiddenByDefault: boolean;
  displayOrder: number;
}

type ContractOrderEntity = {
  contractId: number;
  costPerShareNo: number;
  costPerShareYes: number;
  pricePerShare: number;
  quantity: number;
  tradeType: number;
};

export interface ContractOrderBook {
  noOrders: ContractOrderEntity[] | 0;
  timestamp?: string;
  yesOrders: ContractOrderEntity[];
}

export type OrderBookResponse = Record<string, ContractOrderBook>;
