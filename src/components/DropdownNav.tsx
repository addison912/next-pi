"use client";
import { useState } from "react";
import useOutsideClick from "./useOutsideClick";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const DropdownNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };
  const ref = useOutsideClick(handleOutsideClick);

  return (
    <div className="ml-4">
      <div
        ref={ref}
        onClick={() => handleClick()}
        className={`${isOpen ? "toggle-btn" : ""} relative h-7 w-7 cursor-pointer text-3xl focus:border-none focus:outline-none`}
      >
        <div className="absolute mt-3 h-[2px] w-7 rounded bg-white transition-all duration-500 before:absolute before:h-[2px] before:w-7 before:-translate-y-3 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-[2px] after:w-7 after:translate-y-3 after:rounded after:bg-white after:transition-all after:duration-500 after:content-[''] focus:border-none focus:outline-none"></div>
        <div
          className={`absolute right-0 top-[40px] z-10 animate-open-menu ${isOpen ? "block" : " hidden"} w-44 origin-top divide-y  divide-gray-600 shadow`}
        >
          <ul
            className="rounded-t-lg bg-slate-700 py-2 text-sm text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <Link
                href="/market"
                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                Markets
              </Link>
            </li>
            <li>
              <Link
                href="/alerts"
                className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
              >
                Alerts
              </Link>
            </li>
          </ul>
          <div className="rounded-b-lg bg-slate-700 py-2">
            <div className="block px-4 py-2 text-sm hover:bg-gray-600 hover:text-white">
              <SignOutButton>Sign Out</SignOutButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownNav;
