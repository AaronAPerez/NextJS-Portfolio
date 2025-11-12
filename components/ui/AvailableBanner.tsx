'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export const AvailableBanner = () => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 text-center"
    >
      <div className="flex items-center justify-center gap-3">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        <span className="font-semibold">Available for Immediate Hire</span>
        <Calendar className="w-4 h-4" />
        <span className="text-sm">| Full-time, Contract, or Freelance</span>
      </div>
    </motion.div>
  );
};