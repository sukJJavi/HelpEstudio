"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export type ProjectStatus = "Live" | "Beta" | "In Development";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  image: string;
  className?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  status,
  image,
  className,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative flex flex-col h-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50",
        "hover:border-primary/50 transition-colors",
        className
      )}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent" />
      </div>

      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge status={status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded bg-zinc-800 text-zinc-400 border border-zinc-700",
                "group-hover:border-primary/30 group-hover:text-zinc-300 transition-colors"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Badge({ status }: { status: ProjectStatus }) {
  const styles = {
    Live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Beta: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "In Development": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
      styles[status]
    )}>
      {status}
    </span>
  );
}
