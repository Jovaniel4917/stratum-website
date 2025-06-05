import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const stripLocale = (path: string) => {
  const parts = path.split("/");
  if (parts[1] === "es" || parts[1] === "en") {
    return "/" + parts.slice(2).join("/");
  }
  return path;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const currentPath = stripLocale(pathname);
    const previousPath = stripLocale(previousPathname.current);

    if (currentPath !== previousPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    previousPathname.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
