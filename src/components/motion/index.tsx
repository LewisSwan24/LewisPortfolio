"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

// Animation variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Components
interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export const FadeInUp = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      {...props}
    >
      {children}
    </motion.div>
  )
);
FadeInUp.displayName = "FadeInUp";

export const FadeInLeft = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInLeft}
      {...props}
    >
      {children}
    </motion.div>
  )
);
FadeInLeft.displayName = "FadeInLeft";

export const FadeInRight = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInRight}
      {...props}
    >
      {children}
    </motion.div>
  )
);
FadeInRight.displayName = "FadeInRight";

export const ScaleIn = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scaleIn}
      {...props}
    >
      {children}
    </motion.div>
  )
);
ScaleIn.displayName = "ScaleIn";

export const StaggerContainer = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      {...props}
    >
      {children}
    </motion.div>
  )
);
StaggerContainer.displayName = "StaggerContainer";

export const StaggerItem = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => (
    <motion.div ref={ref} variants={fadeInUp} {...props}>
      {children}
    </motion.div>
  )
);
StaggerItem.displayName = "StaggerItem";

// Re-export motion for direct use
export { motion, AnimatePresence } from "framer-motion";
