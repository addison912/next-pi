import {
  type MarketContract,
  type ContractOrderRec,
  type NegRisk,
  type MarketWithNegRisk,
} from "@/types";
import { getMarkets } from "./predictit";

function calcOpt(bestNoPrice: number) {
  return 1 / (1 - (1 - bestNoPrice) * 0.1);
}

const sumNos = (contracts: MarketContract[]) => {
  let sumNos = 0;
  contracts.forEach((contract) => {
    const noPrice = contract.bestBuyNoCost;
    if (noPrice) {
      sumNos += 1 - noPrice;
    }
  });
  return sumNos;
};

export const calcNegRisk = (contracts: MarketContract[]) => {
  let sumNos = 0;
  let ifNoSum = 0;
  const order: ContractOrderRec[] = [];
  try {
    contracts.forEach((contract: MarketContract) => {
      const noPrice = contract.bestBuyNoCost;
      if (noPrice) {
        sumNos += 1 - noPrice;
        const shares = Math.round(858 * calcOpt(noPrice));
        const ifYes = shares * -noPrice;
        const ifNo = Math.round((shares + ifYes) * 90) / 100;
        ifNoSum += ifNo;
        order.push({
          shares,
          ifYes,
          ifNo,
          noPrice,
        });
      }
    });
    sumNos = Math.round(sumNos * 100) / 100;
    let minWin = 0;
    order.forEach((item) => {
      item.ifYesPayout =
        Math.round((item.ifYes + ifNoSum - item.ifNo) * 100) / 100;
      if (!minWin || item.ifYesPayout < minWin) {
        minWin = parseFloat(item.ifYesPayout.toFixed(2));
      }
    });
    return { minWin, sumNos } as NegRisk;
  } catch (err) {
    console.log(err);
  }
};

const getProfitableMarkets = async () => {
  const markets = await getMarkets();
  const profitableMarkets: MarketWithNegRisk[] = [];
  markets.forEach((market) => {
    if (market.contracts.length > 1) {
      // console.log(market.contracts);
      const negRisk = calcNegRisk(market.contracts)!;
      if (negRisk.minWin > 0) {
        const marketWithNegRisk = { ...market, negRisk };
        profitableMarkets.push(marketWithNegRisk);
      }
    }
  });
  return profitableMarkets;
};

// getPotentialMarkets skips calculates max possible negative risk without getting order book
// does not reflect actual contract availability
const getPotentialMarkets = async () => {
  const markets = await getMarkets();
  const potentialMarkets: MarketWithNegRisk[] = [];
  markets.forEach((market) => {
    const contracts = market.contracts;
    const noSum = sumNos(contracts);
    if (contracts.length > 1 && noSum > 1) {
      const negRiskCalc = calcNegRisk(contracts)!;
      if (negRiskCalc.minWin > 0) {
        potentialMarkets.push({ ...market, negRisk: negRiskCalc });
      }
    }
  });
  return potentialMarkets;
};

export { getProfitableMarkets };
