import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.enum(['parenting', 'money', 'ai-and-work'])),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date(),
    draft: z.boolean().default(false),
    sections: z.array(z.object({
      id: z.string(),
      title: z.string(),
    })),
  }),
});

export const collections = { blog, guides };
