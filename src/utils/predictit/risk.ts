import {
  type MarketContract,
  type FullContractData,
  type ContractOrderRec,
  type NegRisk,
  type OrderBookContractEntity,
  type ContractWithOpt,
} from "@/types";

function calcOpt(bestNoPrice: number) {
  return 1 / (1 - (1 - bestNoPrice) * 0.1);
}

/**
 * 
 Calculate the negative risk for set of contracts given the max share quantity.
 */
const calcNegRisk = (
  contracts: MarketContract[] | FullContractData[],
  maxShares?: number,
) => {
  let sumNos = 0;
  let ifNoSum = 0;
  const order: ContractOrderRec[] = [];
  try {
    contracts.forEach((contract: MarketContract | FullContractData) => {
      let noPrice: number | null;
      if ("bestBuyNoCost" in contract) {
        noPrice = contract.bestBuyNoCost;
      } else {
        noPrice = contract.bestNoPrice;
      }
      if (noPrice) {
        sumNos += 1 - noPrice;
        const shares = Math.round((maxShares ?? 858) * calcOpt(noPrice));
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

const getMaxShares = (contractData: FullContractData[]) => {
  let max: number | undefined = undefined;
  let quotient = 0;
  try {
    contractData.forEach((contract) => {
      if (contract.orders.noOrders !== 0 && contract.orders.noOrders[0]) {
        const bestNo: OrderBookContractEntity = contract.orders.noOrders[0];
        const opt = calcOpt(bestNo.costPerShareNo);
        const shares =
          Math.floor(850 / bestNo.costPerShareNo) < bestNo.quantity
            ? Math.floor(850 / bestNo.costPerShareNo)
            : bestNo.quantity;
        if (!max || max > shares / opt) {
          max = shares / opt;
          quotient = shares * (1 / opt);
        }
      }
    });
    console.log(quotient);
    return quotient;
  } catch (err) {
    console.log(err);
  }
};

function calcOptOrder(
  contractData: FullContractData[],
  userMaxShares?: number,
) {
  const maxShares = userMaxShares ? userMaxShares : getMaxShares(contractData)!;
  const contracts: ContractWithOpt[] = [];
  contractData.forEach((contract) => {
    const newContract: ContractWithOpt = contract;
    newContract.opt = calcOpt(newContract.bestNoPrice);
    newContract.optQuantity = Math.round(newContract.opt * maxShares);
    contracts.push(newContract);
  });
  const negRisk: NegRisk = calcNegRisk(contractData, maxShares)!;
  return { contracts, negRisk };
}

export { calcOptOrder, calcOpt, calcNegRisk, getMaxShares };
