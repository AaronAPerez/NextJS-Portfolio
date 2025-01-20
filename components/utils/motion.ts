import { useReducedMotion } from "framer-motion";


// Motion and Animation Accessibility
export const useMotionConfig = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return {
    animation: {
      initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }
    }
  };
};


