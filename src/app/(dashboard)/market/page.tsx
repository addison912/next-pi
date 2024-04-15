import { getProfitableMarkets } from "@/server/utils/risk";
import MarketCard from "@/app/components/MarketCard";
import Link from "next/link";
import { markets } from "@/dummy-data/marketsWithNegRisk";

const MarketPage = async () => {
  // const markets = await getProfitableMarkets();
  console.log(markets);
  return (
    <div className="flex flex-wrap gap-[var(--flex-gap)] p-6">
      {markets.map((market) => (
        <Link
          key={market.id}
          href={`/market/${market.id}`}
          className="mx-auto flex w-[calc(50%-var(--flex-gap))] overflow-hidden rounded-md bg-slate-800 shadow-md"
        >
          <MarketCard market={market} />
        </Link>
      ))}
      <div className="invisible mx-auto flex w-[calc(50%-var(--flex-gap))]"></div>
    </div>
  );
};

export default MarketPage;
