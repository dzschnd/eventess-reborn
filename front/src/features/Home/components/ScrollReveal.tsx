import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FC, ReactNode } from "react";
import clsx from "clsx";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const ScrollReveal: FC<ScrollRevealProps> = ({ children, delay = 0, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let revealTimeout: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        revealTimeout = setTimeout(() => setIsVisible(true), 80);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={clsx(
        "home-scroll-reveal flex w-full justify-center",
        isVisible && "home-scroll-reveal-visible",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
