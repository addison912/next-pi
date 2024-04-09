import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 flex justify-between items-center h-[var(--header-height)] w-full px-16 bg-gradient-307 from-[#07414b] to-[#083037] z-50">
      <Link className="flex items-center" href="/">
        <Image
          src="/predictit.svg"
          alt="PredictIt"
          width={89}
          height={72}
          className="h-full"
        />

        <span className="h-full text-red-500 font-bold text-[24px] ml-[2px] mb-[4px] tracking-[-0.1rem] align-[6px]">
          Insights
        </span>
      </Link>
      <UserButton userProfileUrl="/profile" />
    </header>
  );
};

export default Header;
