import { useEffect, useState } from "react";


// Motion and Animation Accessibility
export const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
  
      const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }, []);
  
    return prefersReducedMotion;
  };


  // Usage in components
 export const prefersReducedMotion = useReducedMotion();
  
  export const animation = {
    initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }
  };