
import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (ref.current) {
      const elements = ref.current.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (ref.current) {
        const elements = ref.current.querySelectorAll('.reveal-on-scroll');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return ref;
}
