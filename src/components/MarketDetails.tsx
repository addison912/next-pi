"use client";
import { type ContractWithOpt, type NegRisk } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { calcNegRisk } from "@/utils/risk";
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

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    contract: ContractWithOpt,
  ) => {
    const quantity = parseInt(e.target.value);
    const updatedContracts = [...contracts];
    const quotient = quantity * (1 / contract.opt!);
    updatedContracts.forEach((c) => {
      c.optQuantity =
        c.contractId == contract.contractId
          ? quantity
          : Math.round(quotient * c.opt!);
    });
    // const updatedNegRisk = calcNegRisk(updatedContracts);
    // setNegRisk(updatedNegRisk!);
    setContracts(updatedContracts);
  };

  return (
    <div className="mb-12 mt-6">
      <ul className="flex flex-col sm:text-base md:text-xl">
        <li className="flex bg-teal-900 md:text-lg">
          <span className="mr-3 w-[72px]"></span>
          <span className="w-[50%]">Contract</span>
          <span className="w-[16.66%]">Max Available</span>
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
            <span className="w-[16.66%]">{contract.bestNoQuantity}</span>
            <span className="w-[16.66%]">${contract.bestNoPrice}</span>
            <span className="w-[16.66%]">
              <input
                type="number"
                className=" w-24 bg-inherit outline-none"
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
  );
};

export default MarketDetails;
