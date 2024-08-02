import { useEffect, useState } from "react";

export const useDebouncer = (initvalue, delay) => {
  const [value, setValue] = useState(initvalue);
  useEffect(() => {
    let timer;
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      setValue(initvalue);
    }, delay);
    return clearTimeout(timer);
  }, [initvalue]);
  return value;
};
