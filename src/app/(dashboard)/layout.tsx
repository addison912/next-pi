import type { PropsWithChildren } from "react";
import Header from "@/app/components/Header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-full min-h-screen w-screen">
      <Header />
      <div
        className={`relative top-[--header-height] min-h-[calc(100vh-var(--header-height))] bg-gray-900`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
