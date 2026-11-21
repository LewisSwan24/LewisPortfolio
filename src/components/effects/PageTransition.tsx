"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{
        animationDuration: "0.5s",
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = "" 
}: { 
  children: ReactNode; 
  delay?: number; 
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}

export function SlideUp({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: ReactNode; 
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`motion-safe:animate-slide-up ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({ 
  children, 
  staggerDelay = 0.1,
  className = "" 
}: { 
  children: ReactNode[]; 
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className="motion-safe:animate-fade-in-up"
          style={{
            animationDelay: `${index * staggerDelay}s`,
            animationFillMode: "both",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
