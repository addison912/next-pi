import { getProfitableMarkets } from "@/utils/risk";
import MarketCard from "@/components/MarketCard";
import { markets as dummyData } from "@/dummy-data/marketsWithNegRisk";

const MarketPage = async () => {
  const markets =
    process.env.NODE_ENV === "development"
      ? dummyData
      : await getProfitableMarkets();
  console.log(markets);
  return (
    <div className="flex flex-wrap gap-[var(--flex-gap)] p-[24px] sm:pr-[24px] md:pr-[calc(24px-var(--flex-gap))]">
      {markets.map((market) => (
        <div
          key={market.id}
          className="sm:w-[100%] md:w-[calc(50%-var(--flex-gap))] lg:w-[calc(33.3%-var(--flex-gap))]"
        >
          <MarketCard market={market} />
        </div>
      ))}
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className="invisible h-0 md:w-[calc(50%-var(--flex-gap))] lg:w-[calc(33.3%-var(--flex-gap))]"
        ></div>
      ))}
    </div>
  );
};

export default MarketPage;
