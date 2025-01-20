import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  }
  
  export const Container = ({
    children,
    className,
    size = 'lg'
  }: ContainerProps) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-5xl',
      lg: 'max-w-7xl',
      xl: 'max-w-[88rem]',
      '2xl': 'max-w-[96rem]'
    };
  
    return (
      <div className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        sizes[size],
        className
      )}>
        {children}
      </div>
    );
  };