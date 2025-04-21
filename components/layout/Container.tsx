import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  }
  
  export function Container({
    children,
    className,
    as: Component = 'div'
  }: ContainerProps) {
    return (
      <Component
        className={cn(
          "w-full mx-auto px-4 sm:px-6 lg:px-8",
          
          className
        )}
      >
        {children}
      </Component>
    );
  }