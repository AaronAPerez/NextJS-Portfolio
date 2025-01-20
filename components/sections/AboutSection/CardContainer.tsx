"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { JSX, MouseEvent, PropsWithChildren, useRef, useState } from "react";

interface CardItemProps {
  as?: keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap;
  children: React.ReactNode;
  className?: string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}
interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: CardContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 100, damping: 10 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 10 });
  const moveX = useMotionValue(0);
  const moveY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width/2) / 25;
    const y = (e.clientY - top - height/2) / 25;
    
    rotateY.set(x);
    rotateX.set(-y);
    moveX.set(x * 2);
    moveY.set(y * 2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    moveX.set(0);
    moveY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        perspective: 1000,
      }}
      className={cn("flex justify-center px-4 my-2", containerClassName)}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn("relative", className)}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const CardBody = ({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div
      className={cn(
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Component = "div",
  children,
  className,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps & Omit<React.HTMLAttributes<HTMLElement>, keyof CardItemProps>) => {
  return (
    <Component
      className={cn(className)}
      style={{
        transform: `perspective(1000px) translate3d(${translateZ}px, 0px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
        transition: "transform 0.3s ease-out",
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
export default CardContainer;