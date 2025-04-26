import { useRef } from "react";

export function useDebounce(originalfn) {
  const timerRef = useRef();

  function fn(...args) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => originalfn(...args), 500);
  }
  return fn;
}
