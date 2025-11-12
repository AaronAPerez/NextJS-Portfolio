'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Briefcase, X } from 'lucide-react';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-2xl p-4 max-w-sm"
        >
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3">
            <Briefcase className="w-6 h-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-1">Looking to Hire?</h3>
              <p className="text-sm text-white/90 mb-3">
                I'm available for full-time, contract, or freelance opportunities
              </p>
              <a
                href="#contact"
                className="inline-block px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-gray-100 transition"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};