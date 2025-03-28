import Link from "next/link";
import { api } from "@/trpc/server";

interface MarketHeaderProps {
  marketID: string;
}

const MarketDetailsHeader = async ({ marketID }: MarketHeaderProps) => {
  const market = await api.market.getMarketByID({ marketID });
  const href = `https://www.predictit.org/markets/detail/${marketID}/${market.marketUrl}`;
  return (
    <h3 className="text-lg">
      <Link href={href}>{market.marketName}</Link>
    </h3>
  );
};

export default MarketDetailsHeader;
