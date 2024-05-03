"use client";
import { useRef, useEffect, MutableRefObject } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref: MutableRefObject<any> = useRef();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return ref as MutableRefObject<any>;
};

export default useOutsideClick;
