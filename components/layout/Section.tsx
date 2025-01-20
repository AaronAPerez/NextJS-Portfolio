import { cn } from "@/lib/utils";

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    fullWidth?: boolean;
  }
  
  export const Section = ({
    id,
    className,
    children,
    fullWidth = false
  }: SectionProps) => {
    return (
      <section
        id={id}
        className={cn(
          "min-h-screen py-20 relative",
          !fullWidth && "px-4 sm:px-6 lg:px-8",
          className
        )}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5 opacity-50" />
          <div className="absolute inset-0 bg-grid-small-white/[0.2]" />
        </div>
  
        {/* Content */}
        <div className={cn(
          "relative z-10",
          !fullWidth && "max-w-7xl mx-auto"
        )}>
          {children}
        </div>
      </section>
    );
  };