import { useEffect, useRef } from "react";

/**
 * Reusable scroll-reveal hook.
 * Attaches to a DOM element and adds `is-visible` class when it enters the viewport.
 * Defaults to firing once (unobserves after reveal).
 *
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (default 0.15)
 * @param {boolean} options.once - Unobserve after revealing (default true)
 * @returns {React.RefObject} - Attach to the element via ref={ref}
 */
export function useReveal(options = {}) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          if (once) observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}