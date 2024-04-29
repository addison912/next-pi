export type PredictitAuth = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  userName: string;
  "as:device_id"?: string;
  ".issued"?: string;
  ".expires"?: string;
};

export type MarketContract = {
  id: number;
  dateEnd: string;
  image: string;
  name: string;
  shortName: string;
  status: string;
  lastTradePrice: number;
  bestBuyYesCost: number;
  bestBuyNoCost: number | null;
  bestSellYesCost: number | null;
  bestSellNoCost: number;
  lastClosePrice: number;
  displayOrder: number;
};

export type Market = {
  id: number;
  name: string;
  shortName: string;
  image: string;
  url: string;
  contracts: MarketContract[];
  timeStamp: string;
  status: string;
};

export type MarketDetails = {
  marketId: number;
  marketName: string;
  imageName: string;
  marketType: number;
  dateEndString: string;
  isActive: boolean;
  rule: string;
  userHasOwnership: boolean;
  userHasTradeHistory: boolean;
  userInvestment: number;
  userMaxPayout: number;
  info?: null;
  dateOpened: string;
  isMarketWatched: boolean;
  seoTitle?: string;
  seoDescription?: string;
  marketUrl: string;
  status: string;
  isOpen: boolean;
  isOpenStatusMessage: string;
  isTradingSuspended: boolean;
  isTradingSuspendedMessage?: boolean | null;
  isEngineBusy: boolean;
  isEngineBusyMessage?: boolean | null;
  disqus_Identifier?: string;
  disqus_Title?: string;
  disqus_UserAuth?: boolean | null;
  disqus_Url?: string;
  disqus_PrevThreadID?: number;
  disqus_NextThreadID?: number | null;
  disqus_ArchivedCommentsTotal?: number;
  econIndicatorTradeStatus: number;
};

export type MarketResponse = {
  markets: Market[];
};

export type Contract = {
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
};

export type ContractResponse = Contract[];

export type OrderBookContractEntity = {
  contractId: number;
  costPerShareNo: number;
  costPerShareYes: number;
  pricePerShare: number;
  quantity: number;
  tradeType: number;
};

export type OrderBookContract = {
  noOrders: OrderBookContractEntity[] | 0;
  timestamp?: string;
  yesOrders: OrderBookContractEntity[];
};

/**
 * This is the response from the endpoint https://predictit-f497e.firebaseio.com/contractOrderBook.json
 */
export type OrderBookResponse = Record<string, OrderBookContract>;

/* -------------------------------------------------------------------------- */
/*                              // Modified types                             */
/* -------------------------------------------------------------------------- */

/**
 * This is the contract data that includes the order book data
 */
export type FullContractData = Contract & { orders: OrderBookContract };

export type ContractOrderRec = {
  shares: number;
  ifYes: number;
  ifNo: number;
  noPrice: number;
  ifYesPayout?: number;
};

export type NegRisk = { minWin: number; sumNos: number };

export type MarketWithNegRisk = Market & { negRisk: NegRisk };

export type ContractWithOpt = FullContractData & {
  opt?: number;
  optQuantity?: number;
};
