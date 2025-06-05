
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only scroll to top if the pathname actually changed
    if (previousPathname.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
