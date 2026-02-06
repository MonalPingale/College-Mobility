import { useEffect } from "react";

const SmoothScrollSwiper = () => {
  useEffect(() => {
    let isScrolling = false;
    let targetY = window.scrollY;

    const smoothScroll = () => {
      if (Math.abs(targetY - window.scrollY) < 0.5) {
        isScrolling = false;
        return;
      }
      const diff = targetY - window.scrollY;
      window.scrollBy(0, diff * 0.1);
      if (isScrolling) {
        requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetY += e.deltaY;
      targetY = Math.max(
        0,
        Math.min(targetY, document.body.scrollHeight - window.innerHeight)
      );
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
};

export default SmoothScrollSwiper;
