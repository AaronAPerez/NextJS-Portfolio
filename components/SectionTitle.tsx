import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import TextGenerateEffect from './ui/TextGenerateEffect';


interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('text-center mb-16', className)}
    >
      {/* Title with animated text generation effect */}
      <TextGenerateEffect
        words={title}
        className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 dark:from-blue-400 to-violet-500 dark:to-violet-400"
      />
      
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;