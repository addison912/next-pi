import Link from "next/link";
import { api } from "@/trpc/server";

interface MarketHeaderProps {
  marketID: string;
}

const MarketDetailsHeader = async ({ marketID }: MarketHeaderProps) => {
  const market = await api.market.getMarketByID({ marketID });
  const href = `https://www.predictit.org/markets/detail/${marketID}/${market.marketUrl}`;
  return (
    <Link href={href}>
      <h3 className="sm:text-xl md:text-4xl">{market.marketName}</h3>
    </Link>
  );
};

export default MarketDetailsHeader;
