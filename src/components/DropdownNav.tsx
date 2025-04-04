"use client";
import { useRef, useState } from "react";
import useOutsideClick from "./useOutsideClick";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

const DropdownNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  {
    /* Wait 0.2 seconds then close the menu */
  }
  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 180);
  };

  const handleClick = () => {
    isOpen ? closeMenu() : setIsOpen(true);
  };

  const handleOutsideClick = () => {
    closeMenu();
  };

  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(handleOutsideClick);

  return (
    <div className="ml-4">
      <div
        ref={ref}
        onClick={() => handleClick()}
        className={`${isOpen ? "toggle-btn" : ""} relative h-7 w-7 cursor-pointer text-3xl focus:border-none focus:outline-hidden`}
      >
        <div className="absolute mt-3 h-[2px] w-7 rounded-sm bg-white transition-all duration-400 before:absolute before:h-[2px] before:w-7 before:-translate-y-3 before:rounded-sm before:bg-white before:transition-all before:duration-400 before:content-[''] after:absolute after:h-[2px] after:w-7 after:translate-y-3 after:rounded-sm after:bg-white after:transition-all after:duration-400 after:content-[''] focus:border-none focus:outline-hidden"></div>
        <div
          className={`absolute top-[40px] right-0 z-10 ${isClosing ? "animate-close-menu" : "animate-open-menu"} ${isOpen ? "block" : "hidden"} w-44 origin-top divide-y divide-gray-600 shadow-sm`}
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
