import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * News posts live in src/content/news as Markdown files.
 * Copy an existing post, change the details at the top, and write below the second "---".
 */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tag: z.enum(['Announcement', 'Explainer', 'Guide', 'Get involved', 'Press release']),
    /** Optional cover photo, e.g. "/images/news/rally.jpg" */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { news };
