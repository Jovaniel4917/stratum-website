import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext"; // import language

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);
  const { language } = useLanguage(); // observe language but don't trigger scroll on it

  useEffect(() => {
    // Only scroll if actual pathname changed, not on language toggle
    if (previousPathname.current !== pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      previousPathname.current = pathname;
    }
  }, [pathname]); // not reacting to language anymore

  return null;
};

export default ScrollToTop;
