'use client';

import { motion } from 'framer-motion';
import { BookOpen, Code, Rocket, Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';

const currentLearning = [
  {
    icon: Code,
    title: "Advanced TypeScript Patterns",
    description: "Deepening TypeScript knowledge with generics, utility types, and design patterns",
    status: "In Progress",
    color: "blue"
  },
  {
    icon: Rocket,
    title: "Testing Best Practices",
    description: "Mastering Jest, React Testing Library, and E2E testing with Playwright",
    status: "Active",
    color: "green"
  },
  {
    icon: BookOpen,
    title: "AWS Certified Developer",
    description: "Studying for AWS Developer Associate certification",
    status: "Planning",
    color: "orange"
  },
  {
    icon: Target,
    title: "System Design",
    description: "Learning to architect scalable applications and make technical decisions",
    status: "Active",
    color: "purple"
  }
];

export const LearningSection = () => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    orange: 'bg-orange-500/20 text-orange-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };

  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Continuous Learning
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            What I&apos;m currently studying to grow as a developer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {currentLearning.map((item, index) => {
            const Icon = item.icon;
            const colorClasses = colorMap[item.color] || colorMap.blue;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" hoverable padding="lg" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${colorClasses}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardHeader className="p-0 mb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${colorClasses}`}>
                            {item.status}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};