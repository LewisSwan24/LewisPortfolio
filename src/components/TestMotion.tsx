"use client";

import { motion } from "framer-motion";

export function TestMotion() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1>Motion works!</h1>
        </motion.div>
    );
}
