"use client";
import { useRef, useEffect, type MutableRefObject } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref;
};

export default useOutsideClick;
