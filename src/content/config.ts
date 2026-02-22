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

export const collections = { blog };
