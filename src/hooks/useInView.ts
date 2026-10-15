import { useEffect, useRef, useState } from "react";

/**
 * Returns true once the element enters the viewport.
 * Stays true after first trigger (non-reversible).
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  threshold = 0.15
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}
