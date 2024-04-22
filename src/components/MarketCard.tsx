import Link from "next/link";
import Image from "next/image";
import { type MarketWithNegRisk } from "@/types";

interface MarketCardProps {
  market: MarketWithNegRisk;
}

const MarketCard = ({ market }: MarketCardProps) => {
  return (
    <Link
      href={`/market/${market.id}`}
      className="mx-auto flex h-full min-w-[100%] overflow-hidden rounded-md bg-slate-700 shadow-md"
    >
      <div className="flex flex-row max-xs:flex-col">
        <div className="min-w-48 md:shrink-0">
          <Image
            src={market.image}
            alt={market.name}
            width={160}
            height={160}
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </div>
        <div className="p-4 text-[var(--font-color)] sm:text-sm md:text-base">
          <h3 className="font-bold sm:text-base md:text-lg">{market.name}</h3>

          <p>
            <span>Market ID:</span>
            <span className="font-bold text-[var(--font-color-data)]">
              {" "}
              {market.id}
            </span>
          </p>
          <p>
            <span>Potential negative risk: </span>
            <span className="font-bold text-[var(--font-color-data)]">
              {" "}
              {`$${market.negRisk.minWin.toFixed(2)}`}
            </span>
          </p>
          <p>
            <span>Sum of nos: </span>
            <span className="font-bold text-[var(--font-color-data)]">
              {" "}
              {`$${market.negRisk.sumNos.toFixed(2)}`}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MarketCard;
