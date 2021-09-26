import { useRef, useCallback } from "react";

export default function useDebounce(callback: any, delay: number) {
  const timer = useRef();

  const debouncedCallback = useCallback((...args) => {
    if(timer.current) {
      clearTimeout(timer.current)
    }
    // @ts-ignore
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])

  return debouncedCallback;
}