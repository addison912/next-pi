import Link from "next/link";
import Image from "next/image";
import { type MarketWithNegRisk } from "@/types";

interface MarketCardProps {
  market: MarketWithNegRisk;
}

const MarketCard = ({ market }: MarketCardProps) => {
  return (
    <div>
      <div className="md:flex">
        <div className="md:shrink-0">
          <Image
            src={market.image}
            alt={market.name}
            width={160}
            height={160}
            className="h-48 w-full object-cover md:h-full md:w-48"
          />
        </div>
        <div className="p-4 text-sm text-[var(--font-color)]">
          <h3>
            {/* <a href={props.market.url}>{props.market.name}</a> */}
            {market.name}
          </h3>

          <p>
            <span className="market-data-key">Market ID:</span> {market.id}
          </p>
          <p>
            <span className="market-data-key">Potential negative risk: </span>{" "}
            {`$${market.negRisk.minWin.toFixed(2)}`}
          </p>
          <p>
            <span className="market-data-key">Sum of nos: </span>{" "}
            {`$${market.negRisk.sumNos.toFixed(2)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;

{
  /* <div className="xs:flex-col sm:flex-col flex md:flex-row">
      <div className="md:max-h-[160px] md:min-w-[160px]">
        <Image
          src={market.image}
          alt={market.name}
          width={160}
          height={160}
          className="h-full w-[100%] max-w-none sm:rounded-t-md sm:rounded-bl-none md:rounded-l-md md:rounded-tr-none "
        />
      </div>
      <div className="flex-shrink p-4 text-sm text-[var(--font-color)]">
        <h3>
          {/* <a href={props.market.url}>{props.market.name}</a> */
}
{
  /* {market.name}
        </h3>

        <p>
          <span className="market-data-key">Market ID:</span> {market.id}
        </p>
        <p>
          <span className="market-data-key">Potential negative risk: </span>{" "}
          {`$${market.negRisk.minWin.toFixed(2)}`}
        </p>
        <p>
          <span className="market-data-key">Sum of nos: </span>{" "}
          {`$${market.negRisk.sumNos.toFixed(2)}`}
        </p>
      </div>
// </div> */
}
