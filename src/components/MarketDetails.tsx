"use client";
import { type ContractWithOpt, type NegRisk } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { calcNegRisk } from "@/utils/predictit/risk";
import { type ChangeEvent } from "react";

interface ContractsProps {
  order: {
    contracts: ContractWithOpt[];
    negRisk: NegRisk;
  };
}

const MarketDetails = ({ order }: ContractsProps) => {
  const [contracts, setContracts] = useState(order.contracts);
  const [negRisk, setNegRisk] = useState(order.negRisk);
  const [alert, setAlert] = useState(false);
  const [alertVal, setAlertVal] = useState("0");

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    contract: ContractWithOpt,
  ) => {
    const quantity = parseInt(e.target.value);
    const updatedContracts = [...contracts];
    const maxShares = quantity * (1 / contract.opt!);
    updatedContracts.forEach((c) => {
      c.optQuantity =
        c.contractId == contract.contractId
          ? quantity
          : Math.round(maxShares * c.opt!);
    });
    console.log(
      `quotient: ${maxShares}\nquantity: ${quantity}\ncontractOpt: ${1 / contract.opt!}`,
    );
    setContracts(updatedContracts);
    const updatedNegRisk = calcNegRisk(updatedContracts, maxShares);
    setNegRisk(updatedNegRisk!);
  };

  return (
    <div>
      {/* Container with risk and alert details */}
      <div className="mb-6 mt-6">
        <div className="flex items-center bg-teal-900 max-md:text-base max-sm:text-[12px]">
          <span className="w-[12.5%] text-center">Risk</span>
          <span className="w-[12.5%] text-center">No Sum</span>
          <span className="w-[16%] text-center">Alert</span>
          <span className="w-[20%] text-center">Alert Type</span>
          <span className="w-[16%] text-center">Alert Value</span>
        </div>
        <div className="flex  items-center bg-background-primary py-2 sm:text-base md:text-xl lg:text-2xl">
          <div className="w-[12.5%] text-center">
            {negRisk.minWin > 0 ? `(${negRisk.minWin})` : negRisk.minWin}
          </div>
          <div className="w-[12.5%] text-center">{negRisk.sumNos}</div>
          <div className="flex w-[16%] justify-center">
            <label className="inline-flex cursor-pointer items-center">
              <input
                value=""
                className="peer sr-only"
                type="checkbox"
                checked={alert || false}
                onChange={() => setAlert(!alert)}
              />
              <div className="peer-focus:none peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
          <div className="flex w-[20%] justify-center">
            <select className="block rounded-md border border-gray-600 bg-gray-700 p-[5.5px] text-sm text-white placeholder-gray-400 focus:outline-none">
              <option className="p-2" value="neg-risk">
                Risk
              </option>
              <option className="p-2" value="sum-no">
                No Sum
              </option>
            </select>
          </div>
          <div className="relative flex w-[16%] justify-center">
            <div className="flex">
              <div className="pointer-events-none absolute inset-y-0 flex items-center ps-1 text-sm">
                $
              </div>
              <input
                type="number"
                step="0.01"
                value={parseFloat(alertVal)}
                className="block w-[5.5rem] rounded-md  border border-gray-600 bg-gray-700 py-[2px] pl-4 text-base text-white placeholder-gray-400 focus:border-none focus:outline-none"
                onChange={(e) => {
                  setAlertVal(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Contracts */}
      <div className="mb-12">
        <ul className="flex flex-col sm:text-base md:text-xl">
          <li className="flex bg-teal-900 text-lg max-md:text-base max-sm:text-[12px]">
            <span className="mr-3 w-[72px]"></span>
            <span className="w-[50%]">Contract</span>
            <span className="w-[16.66%] overflow-hidden">Max Available</span>
            <span className="w-[16.66%]">Best No Price</span>
            <span className="w-[16.66%]">Shares</span>
          </li>
          {contracts.map((contract) => (
            <li
              key={contract.contractId}
              className="flex items-center bg-background-primary"
            >
              <Image
                src={contract.contractImageUrl}
                alt={contract.contractName}
                width={72}
                height={72}
                className="mr-3"
              />

              <span className="w-[50%]">{contract.contractName}</span>
              <span className="w-[16.66%]">
                {contract.orders?.noOrders
                  ? contract.orders.noOrders[0]?.quantity
                  : 0}
              </span>
              <span className="w-[16.66%]">
                {contract.bestNoPrice ? `${contract.bestNoPrice}` : "N/A"}
              </span>
              <span className="w-[16.66%]">
                <input
                  type="number"
                  className="md:w-18 w-24 bg-inherit outline-none"
                  defaultValue={contract.optQuantity}
                  onChange={(e) => {
                    handleQuantityChange(e, contract);
                  }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MarketDetails;
