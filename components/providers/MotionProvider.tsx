'use client';

import { LazyMotion } from 'framer-motion';

// Features load in a separate chunk after hydration instead of riding along
// in the initial bundle. Hero content doesn't depend on them (it renders
// visible without animation), so this keeps ~15 KB gz off the critical path.
const loadFeatures = () => import('./motionFeatures').then((mod) => mod.default);

/**
 * `strict` makes a stray full `motion.*` component throw in development,
 * so nobody silently re-adds the ~30 KB gz full bundle. Use `m.*` instead.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
