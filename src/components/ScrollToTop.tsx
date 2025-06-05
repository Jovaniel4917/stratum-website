
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top when the route changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // Only depend on pathname, not language

  return null;
};

export default ScrollToTop;
