import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// brief §7.1 — a missing `question` or `sources` is a build failure, not a warning.
const chapter = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapter' }),
  schema: z.object({
    title: z.string(),
    part: z.string(),
    order: z.number(),
    subtitle: z.string().optional(),
    question: z.string(),
    readingTime: z.number(),
    difficulty: z.enum(['foundational', 'intermediate', 'advanced']),
    prerequisites: z.array(z.string()).default([]),
    concepts: z.array(z.string()).default([]),
    diagrams: z.array(z.string()).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).min(1),
  }),
});

export const collections = { chapter };
