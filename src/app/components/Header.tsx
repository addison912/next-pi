import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-[var(--header-height)] w-full items-center justify-between bg-gradient-307 from-[#07414b] to-[#083037] px-16">
      <Link className="flex items-center" href="/">
        <Image
          src="/predictit.svg"
          alt="PredictIt"
          width={89}
          height={72}
          className="h-full"
        />

        <span className="mb-[4px] ml-[2px] h-full align-[6px] text-[24px] font-bold tracking-[-0.1rem] text-red-500">
          Insights
        </span>
      </Link>
      <UserButton userProfileUrl="/profile" />
    </header>
  );
};

export default Header;
