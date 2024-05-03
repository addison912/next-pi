import MarketDetailsHeader from "@/components/MarketDetailsHeader";
import { api } from "@/trpc/server";
import MarketDetails from "@/components/MarketDetails";
interface MarketDetailPageProps {
  params: {
    id: string;
  };
}

const MarketDetailPage = async ({ params }: MarketDetailPageProps) => {
  const order = await api.market.getOptOrder({ marketID: params.id });
  const alert = false;
  return (
    <div className="mt-6 flex flex-col items-center sm:mx-1 md:mx-4">
      <div className="max-w-[1200px] sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px]">
        <MarketDetailsHeader marketID={params.id} />
        <MarketDetails order={order} />
      </div>
    </div>
  );
};

export default MarketDetailPage;
