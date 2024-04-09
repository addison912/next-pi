import { PropsWithChildren } from "react";
import Header from "@/components/Header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen h-full w-screen relative">
      <Header />
      <div
        className={`min-h-[calc(100vh-var(--header-height))] relative top-[--header-height] bg-gray-900`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
