import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DropdownNav from "./DropdownNav";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-[var(--header-height)]  w-full justify-center  bg-gradient-307 from-[#07414b] to-[#083037] px-[var(--header-padding)]">
      <nav className="flex w-full max-w-[1200px] items-center justify-between">
        <Link className="flex items-center" href="/market">
          <Image
            src="/predictit.svg"
            alt="PredictIt"
            width={89}
            height={24.266}
            className="h-full"
          />

          <span className="mb-[4px] ml-[2px] h-full align-[6px] text-[24px] font-bold tracking-[-0.1rem] text-red-500">
            Insights
          </span>
        </Link>
        <div className="flex">
          <UserButton userProfileUrl="/profile" />
          <SignedIn>
            <DropdownNav />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
