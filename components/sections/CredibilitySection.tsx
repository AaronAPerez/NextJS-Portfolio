'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Code, Users, Zap } from 'lucide-react';

const credibilityMetrics = [
  {
    icon: Code,
    number: "4",
    label: "Production Websites",
    description: "Live sites for real businesses",
    color: "blue"
  },
  {
    icon: Users,
    number: "7+",
    label: "Years IT Experience",
    description: "Technical support & troubleshooting",
    color: "green"
  },
  {
    icon: Zap,
    number: "100%",
    label: "WCAG Compliant",
    description: "All projects meet accessibility standards",
    color: "purple"
  },
  {
    icon: CheckCircle,
    number: "2024",
    label: "CodeStack Graduate",
    description: "Full-stack development certification",
    color: "yellow"
  }
];

export const CredibilitySection = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {credibilityMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-blue-500/50 transition-all"
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 text-${metric.color}-400`} />
                <div className={`text-3xl font-bold text-${metric.color}-400 mb-1`}>
                  {metric.number}
                </div>
                <div className="font-semibold text-white mb-1">{metric.label}</div>
                <div className="text-xs text-gray-400">{metric.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
