"use client";
import { type ContractWithOpt, type NegRisk } from "@/types";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { calcNegRisk } from "@/utils/predictit/risk";
import { type ChangeEvent } from "react";
import useOutsideClick from "./useOutsideClick";
import { frequencyUnits } from "@/utils/constants";

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
  const [alertType, setAlertType] = useState("neg-risk");
  const [alertFreq, setAlertFreq] = useState("1");
  const [alertFreqUnit, setAlertFreqUnit] = useState("mintues");
  const [alertFreqMenu, setAlertFreqMenu] = useState(false);
  const [alertFreqUnitMenu, setAlertFreqUnitMenu] = useState(false);

  const handleOutsideClick = () => {
    setAlertFreqMenu(false);
    setAlertFreqUnitMenu(false);
  };

  const handleFreqMenuClick = (value: number) => {
    setAlertFreq(value.toString());
    setAlertFreqMenu(false);
  };

  const handleFreqUnitMenuClick = (value: string) => {
    setAlertFreqUnit(value);
    setAlertFreqUnitMenu(false);
  };

  const handleUnitButtonClick = () => {
    setAlertFreqMenu(false);
    setAlertFreqUnitMenu(!alertFreqUnitMenu);
  };

  const ref = useOutsideClick(handleOutsideClick);

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    contract: ContractWithOpt,
  ) => {
    const quantity = parseInt(e.target.value);
    const updatedContracts = [...contracts];
    const maxShares = quantity * (1 / contract.opt!);
    updatedContracts.forEach((c) => {
      console.log("c.opt", c.opt);
      c.optQuantity =
        c.contractId == contract.contractId
          ? quantity
          : Math.round(maxShares * c.opt!);
    });
    console.log(
      `quotient: ${maxShares}\nquantity: ${quantity}\ncontractOpt: ${1 / contract.opt!}`,
    );
    setContracts(updatedContracts);
    console.log("updatedContracts", updatedContracts);
    const updatedNegRisk = calcNegRisk(updatedContracts, maxShares);
    setNegRisk(updatedNegRisk!);
  };

  return (
    <div>
      {/* Container with risk and alert details */}
      <ul className="mt-6 mb-6">
        <li className="flex items-center bg-teal-900 py-1 text-[12px]">
          <span className="w-[12.5%] text-center">Risk</span>
          <span className="w-[12.5%] text-center">No Sum</span>
          <span className="w-[12.5%] text-center">Alert</span>
          <span className="w-[18.5%] text-center">Alert Type</span>
          <span className="w-[16%] text-center">Alert Value</span>
          <span className="w-[28%] text-center">Max Frequency</span>
        </li>
        <li className="bg-background-primary flex items-center py-2 sm:text-base md:text-xl lg:text-2xl">
          <div className="w-[12.5%] text-center">
            {negRisk.minWin > 0
              ? `$(${negRisk.minWin.toFixed(2)})`
              : `$${negRisk.minWin.toFixed(2)}`}
          </div>
          <div className="w-[12.5%] text-center">
            {negRisk.sumNos.toFixed(2)}
          </div>
          <div className="flex w-[12.5%] justify-center">
            <label className="inline-flex cursor-pointer items-center">
              <input
                value=""
                className="peer sr-only"
                type="checkbox"
                checked={alert || false}
                onChange={() => setAlert(!alert)}
              />
              <div className="peer-focus:none peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-600 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:rtl:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
            </label>
          </div>
          <div className="flex w-[18.5%] justify-center">
            <select className="block rounded-md border border-gray-600 bg-gray-700 p-1 text-sm text-white placeholder-gray-400 focus:outline-hidden">
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
                className="block w-[5.5rem] rounded-md border border-gray-600 bg-gray-700 py-[2px] pl-4 text-base text-white placeholder-gray-400 focus:border-none focus:outline-hidden"
                onChange={(e) => {
                  setAlertVal(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="relative flex w-[28%] justify-center" ref={ref}>
            <div className="flex">
              <input
                type="number"
                className={` ${alertFreqMenu ? "rounded-tl-lg" : "rounded-s-lg"} inline-flex w-16 shrink-0 items-center border border-gray-600 bg-gray-700 p-1 text-center text-sm font-medium`}
                value={alertFreq}
                onFocus={() => setAlertFreqMenu(!alertFreqMenu)}
                onChange={(e) => setAlertFreq(e.target.value)}
              />
              {/* Frequncy Value Dropdown */}
              <div
                className={`z-10 ${alertFreqMenu ? "absolute" : "hidden"} mt-[29px] w-16 divide-y divide-gray-100 rounded-b-lg border border-gray-600 bg-white shadow-sm dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-currency-button"
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <button
                        className="w-full px-4 py-2 text-left"
                        onClick={() => handleFreqMenuClick(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full">
                <button
                  type="button"
                  className={` ${alertFreqUnitMenu ? "rounded-tr-lg" : "rounded-e-lg"} inline-flex w-16 shrink-0 items-center border border-gray-600 bg-gray-700 p-1 text-center text-sm font-medium`}
                  value={alertFreq}
                  onClick={() => handleUnitButtonClick()}
                >
                  {alertFreqUnit}
                </button>
                {/* Frequncy Unit Dropdown */}
                <div
                  className={`z-10 ${alertFreqUnitMenu ? "absolute" : "hidden"} w-16 divide-y divide-gray-100 rounded-b-lg border border-gray-600 bg-white shadow-sm dark:bg-gray-700`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-currency-button"
                  >
                    {frequencyUnits.map((unit) => (
                      <li
                        key={unit.value}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <button
                          className="w-full px-1 py-2 text-left"
                          onClick={() => handleFreqUnitMenuClick(unit.value)}
                        >
                          {unit.value}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      {/* Contracts */}
      <div className="mb-12">
        <ul className="flex flex-col sm:text-base md:text-xl">
          <li className="flex bg-teal-900 text-[12px]">
            <span className="mr-3 w-[72px]"></span>
            <span className="w-[50%]">Contract</span>
            <span className="w-[16.66%] overflow-hidden">Max Available</span>
            <span className="w-[16.66%]">Best No Price</span>
            <span className="w-[16.66%]">Shares</span>
          </li>
          {contracts.map((contract) => (
            <li
              key={contract.contractId}
              className="bg-background-primary flex items-center"
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
                {contract.bestNoPrice
                  ? `$${contract.bestNoPrice.toFixed(2)}`
                  : "N/A"}
              </span>
              <span className="w-[16.66%]">
                <input
                  type="number"
                  className="rounded-lg bg-inherit bg-slate-700 pl-2 outline-hidden sm:w-16 md:w-24"
                  value={contract.optQuantity}
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
