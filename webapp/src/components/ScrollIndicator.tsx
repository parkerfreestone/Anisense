import { useEffect, useState } from "react";

export const ScrollIndicator = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed w-full h-1 z-50 top-0 left-0">
      <div
        className="h-full bg-gradient-to-r from-emerald-900 to-emerald-500"
        style={{ width: `${scrollTop}%` }}
      />
    </div>
  );
};
