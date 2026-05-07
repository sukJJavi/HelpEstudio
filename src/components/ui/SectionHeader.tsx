"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="space-y-4 text-center md:text-left">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-white"
      >
        {title.split(" ").map((word, i) => (
          <span key={i} className={i === 1 || i === 2 ? "text-primary" : ""}>
            {word}{" "}
          </span>
        ))}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
