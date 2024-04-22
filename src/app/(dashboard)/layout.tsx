import type { PropsWithChildren } from "react";
import Header from "@/components/Header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main
        className={`relative min-h-screen bg-slate-800 pt-[var(--header-height)]`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
